import { useEffect, useState } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const GREEN = "#02F5A1"; const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const ub: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  brouillon: { bg: "#F3F4F6", color: "#6B7280", label: "Brouillon" },
  envoyé:    { bg: "#EFF6FF", color: "#3B82F6", label: "Envoyé" },
  accepté:   { bg: "rgba(2,245,161,0.12)", color: "#059669", label: "Accepté" },
  refusé:    { bg: "#FEF2F2", color: "#EF4444", label: "Refusé" },
};
const FILTERS = ["Tous", "brouillon", "envoyé", "accepté", "refusé"];

interface Doc { id: string; numero: string; nom_client: string; montant_total: number; devise: string; statut: string; created_at: string; }

export default function DashboardDevis() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER = 10;

  useEffect(() => {
    if (!user) return;
    supabase.from("factures").select("*").eq("user_id", user.id).eq("type_document", "Devis")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setDocs(data || []); setLoading(false); });
  }, [user]);

  const filtered = docs.filter(d => {
    const mf = filter === "Tous" || d.statut === filter;
    const ms = !search || d.numero.toLowerCase().includes(search.toLowerCase()) || d.nom_client.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  const totalPages = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((page - 1) * PER, page * PER);
  const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  const accepted = docs.filter(d => d.statut === "accepté");
  const total = docs.reduce((s, d) => s + (d.montant_total || 0), 0);
  const taux = docs.length ? Math.round(accepted.length / docs.length * 100) : 0;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total devis", val: String(docs.length), color: "#6366F1" },
          { label: "Montant total", val: `${fmt(total)} FCFA`, color: "#0A0F0D" },
          { label: "Taux d'acceptation", val: `${taux}%`, color: GREEN },
        ].map(s => (
          <div key={s.label} style={{ background: "#FFF", borderRadius: 12, padding: "16px 20px", border: "1px solid #E5E7EB" }}>
            <p style={{ ...inter, fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{s.label}</p>
            <p style={{ ...ub, fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }} style={{
              ...inter, fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 20, cursor: "pointer",
              background: filter === f ? GREEN : "#F3F4F6", color: filter === f ? ONYX : "#374151",
              border: `1.5px solid ${filter === f ? GREEN : "transparent"}`,
            }}>{f === "Tous" ? "Tous" : (STATUS[f]?.label || f)}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
              style={{ ...inter, fontSize: 13, padding: "8px 12px 8px 32px", borderRadius: 8, border: "1.5px solid #E5E7EB", outline: "none", background: "#FFF" }} />
          </div>
          <Link href="/formulaire?type=Devis">
            <button style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>+ Nouveau Devis</button>
          </Link>
        </div>
      </div>

      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        {loading ? <div style={{ padding: 32, textAlign: "center", ...inter, color: "#9CA3AF" }}>Chargement…</div>
          : paged.length === 0 ? <div style={{ padding: 40, textAlign: "center", ...inter, color: "#9CA3AF", fontSize: 14 }}>Aucun devis trouvé.</div>
          : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#F9FAFB" }}>
                {["Date", "Numéro", "Client", "Montant", "Statut", "Actions"].map(h => (
                  <th key={h} style={{ ...inter, fontSize: 12, fontWeight: 600, color: "#6B7280", padding: "10px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {paged.map(d => {
                  const st = STATUS[d.statut] || STATUS.brouillon;
                  return (
                    <tr key={d.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAFAFA"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                      <td style={{ ...inter, fontSize: 13, color: "#6B7280", padding: "12px 16px" }}>{fmtDate(d.created_at)}</td>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{d.numero}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{d.nom_client}</td>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{fmt(d.montant_total)} {d.devise}</td>
                      <td style={{ padding: "12px 16px" }}><span style={{ ...inter, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color, padding: "3px 10px", borderRadius: 20 }}>{st.label}</span></td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button style={{ ...inter, fontSize: 12, color: "#374151", background: "#F3F4F6", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Modifier</button>
                          <button style={{ ...inter, fontSize: 12, color: "#EF4444", background: "#FEF2F2", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div style={{ padding: "12px 16px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...inter, fontSize: 13, color: "#6B7280" }}>{filtered.length} résultats</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ ...inter, fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer" }}>←</button>
                  <span style={{ ...inter, fontSize: 13, padding: "6px 12px" }}>{page} / {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ ...inter, fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer" }}>→</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
