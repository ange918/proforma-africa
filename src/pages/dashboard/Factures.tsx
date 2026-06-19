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
  payé:      { bg: "rgba(2,245,161,0.12)", color: "#059669", label: "Payé" },
  en_retard: { bg: "#FEF2F2", color: "#EF4444", label: "En retard" },
};
const FILTERS = ["Tous", "brouillon", "envoyé", "payé", "en_retard"];

interface Facture { id: string; numero: string; type_document: string; nom_client: string; montant_total: number; devise: string; statut: string; created_at: string; }

export default function DashboardFactures() {
  const { user } = useAuth();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER = 10;

  useEffect(() => {
    if (!user) return;
    supabase.from("factures").select("*").eq("user_id", user.id).eq("type_document", "Facture")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setFactures(data || []); setLoading(false); });
  }, [user]);

  const filtered = factures.filter(f => {
    const matchFilter = filter === "Tous" || f.statut === filter;
    const matchSearch = !search || f.numero.toLowerCase().includes(search.toLowerCase()) || f.nom_client.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((page - 1) * PER, page * PER);
  const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  const paid = factures.filter(f => f.statut === "payé");
  const pending = factures.filter(f => f.statut === "envoyé");
  const caPaid = paid.reduce((s, f) => s + (f.montant_total || 0), 0);
  const caPending = pending.reduce((s, f) => s + (f.montant_total || 0), 0);

  const deleteFacture = async (id: string) => {
    if (!confirm("Supprimer cette facture ?")) return;
    await supabase.from("factures").delete().eq("id", id);
    setFactures(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total factures", val: String(factures.length), color: "#6366F1" },
          { label: "Montant payé", val: `${fmt(caPaid)} FCFA`, color: GREEN },
          { label: "En attente", val: `${fmt(caPending)} FCFA`, color: "#F59E0B" },
        ].map(s => (
          <div key={s.label} style={{ background: "#FFF", borderRadius: 12, padding: "16px 20px", border: "1px solid #E5E7EB" }}>
            <p style={{ ...inter, fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{s.label}</p>
            <p style={{ ...ub, fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }} style={{
              ...inter, fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 20, cursor: "pointer",
              background: filter === f ? GREEN : "#F3F4F6",
              color: filter === f ? ONYX : "#374151",
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
          <Link href="/formulaire?type=Facture">
            <button style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
              Nouvelle Facture
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        {loading ? <div style={{ padding: 32, textAlign: "center", ...inter, color: "#9CA3AF" }}>Chargement…</div>
          : paged.length === 0 ? <div style={{ padding: 40, textAlign: "center", ...inter, color: "#9CA3AF", fontSize: 14 }}>Aucune facture trouvée.</div>
          : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    {["Date", "Numéro", "Client", "Montant", "Statut", "Actions"].map(h => (
                      <th key={h} style={{ ...inter, fontSize: 12, fontWeight: 600, color: "#6B7280", padding: "10px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map(f => {
                    const st = STATUS[f.statut] || STATUS.brouillon;
                    return (
                      <tr key={f.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAFAFA"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                        <td style={{ ...inter, fontSize: 13, color: "#6B7280", padding: "12px 16px" }}>{fmtDate(f.created_at)}</td>
                        <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{f.numero}</td>
                        <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{f.nom_client}</td>
                        <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{fmt(f.montant_total)} {f.devise}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ ...inter, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color, padding: "3px 10px", borderRadius: 20 }}>{st.label}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button style={{ ...inter, fontSize: 12, color: "#374151", background: "#F3F4F6", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>Modifier</button>
                            <button style={{ ...inter, fontSize: 12, color: "#374151", background: "#F3F4F6", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>Dupliquer</button>
                            <button onClick={() => deleteFacture(f.id)} style={{ ...inter, fontSize: 12, color: "#EF4444", background: "#FEF2F2", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>Supprimer</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div style={{ padding: "12px 16px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...inter, fontSize: 13, color: "#6B7280" }}>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    style={{ ...inter, fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer", color: page === 1 ? "#D1D5DB" : "#374151" }}>←</button>
                  <span style={{ ...inter, fontSize: 13, padding: "6px 12px", color: "#374151" }}>{page} / {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    style={{ ...inter, fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer", color: page === totalPages ? "#D1D5DB" : "#374151" }}>→</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
