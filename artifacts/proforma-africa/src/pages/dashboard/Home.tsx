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

interface Facture { id: string; numero: string; type_document: string; nom_client: string; montant_total: number; devise: string; statut: string; created_at: string; }

function KPI({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div style={{ background: "#FFF", borderRadius: 14, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
      <p style={{ ...inter, fontSize: 13, color: "#6B7280", marginBottom: 8 }}>{label}</p>
      <p style={{ ...ub, fontSize: 22, fontWeight: 700, color, marginBottom: sub ? 4 : 0 }}>{value}</p>
      {sub && <p style={{ ...inter, fontSize: 12, color: "#9CA3AF" }}>{sub}</p>}
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("factures").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setFactures(data || []); setLoading(false); });
  }, [user]);

  const paid = factures.filter(f => f.statut === "payé");
  const sent = factures.filter(f => f.statut === "envoyé");
  const now = new Date();
  const thisMonth = factures.filter(f => { const d = new Date(f.created_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
  const ca = paid.reduce((s, f) => s + (f.montant_total || 0), 0);
  const pending = sent.reduce((s, f) => s + (f.montant_total || 0), 0);
  const taux = factures.length ? Math.round(paid.length / factures.length * 100) : 0;
  const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <KPI label="Chiffre d'affaires" value={`${fmt(ca)} FCFA`} color={GREEN} sub="Factures payées" />
        <KPI label="En attente" value={`${fmt(pending)} FCFA`} color="#F59E0B" sub="Factures envoyées" />
        <KPI label="Documents ce mois" value={String(thisMonth.length)} color="#6366F1" sub="Tous types" />
        <KPI label="Taux recouvrement" value={`${taux}%`} color={GREEN} sub={`${paid.length} / ${factures.length} payées`} />
      </div>

      {/* CTA */}
      <Link href="/formulaire">
        <button style={{
          background: GREEN, color: ONYX, border: "none", borderRadius: 10,
          padding: "13px 24px", ...inter, fontWeight: 700, fontSize: 14,
          cursor: "pointer", marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Créer un nouveau document
        </button>
      </Link>

      {/* Recent documents */}
      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ ...ub, fontSize: 14, fontWeight: 700, color: "#0A0F0D" }}>Documents récents</h2>
          <Link href="/dashboard/factures"><span style={{ ...inter, fontSize: 13, color: GREEN, cursor: "pointer", fontWeight: 600 }}>Voir tous →</span></Link>
        </div>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", ...inter, color: "#9CA3AF", fontSize: 14 }}>Chargement…</div>
        ) : factures.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <p style={{ ...inter, color: "#9CA3AF", fontSize: 14 }}>Aucun document pour l'instant.</p>
            <Link href="/formulaire"><span style={{ ...inter, fontSize: 13, color: GREEN, cursor: "pointer", fontWeight: 600 }}>Créer votre premier document →</span></Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB" }}>
                  {["Date", "Numéro", "Type", "Client", "Montant", "Statut", ""].map(h => (
                    <th key={h} style={{ ...inter, fontSize: 12, fontWeight: 600, color: "#6B7280", padding: "10px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {factures.slice(0, 5).map(f => {
                  const st = STATUS[f.statut] || STATUS.brouillon;
                  return (
                    <tr key={f.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAFAFA"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                      <td style={{ ...inter, fontSize: 13, color: "#6B7280", padding: "12px 16px" }}>{fmtDate(f.created_at)}</td>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{f.numero}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{f.type_document}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{f.nom_client}</td>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{fmt(f.montant_total)} {f.devise}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ ...inter, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color, padding: "3px 10px", borderRadius: 20 }}>{st.label}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button style={{ ...inter, fontSize: 12, color: GREEN, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Modifier</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
