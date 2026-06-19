const GREEN = "#02F5A1"; const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const ub: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };

const plans = [
  { name: "Gratuit", price: "0", period: "/mois", features: ["5 documents/mois", "1 client", "PDF basique", "Support email"], cta: "Plan actuel", current: true, color: "#6B7280" },
  { name: "Pro", price: "4 900", period: " FCFA/mois", features: ["Documents illimités", "Clients illimités", "PDF professionnel", "Multi-devises", "Support prioritaire"], cta: "Passer au Pro", current: false, color: GREEN },
  { name: "Business", price: "12 900", period: " FCFA/mois", features: ["Tout Pro +", "Multi-utilisateurs", "Signature électronique", "API Access", "Gestionnaire dédié"], cta: "Contacter", current: false, color: "#6366F1" },
];

export default function DashboardAbonnement() {
  return (
    <div style={{ maxWidth: 900 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#6B7280", marginBottom: 32 }}>Choisissez le plan qui correspond à votre activité.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {plans.map(p => (
          <div key={p.name} style={{
            background: "#FFF", borderRadius: 16, padding: 24,
            border: p.current ? "2px solid #E5E7EB" : `2px solid ${p.color}`,
            position: "relative",
          }}>
            {p.name === "Pro" && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: GREEN, color: ONYX, ...inter, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                POPULAIRE
              </div>
            )}
            <p style={{ ...ub, fontWeight: 700, fontSize: 16, color: ONYX, marginBottom: 6 }}>{p.name}</p>
            <div style={{ marginBottom: 16 }}>
              <span style={{ ...ub, fontWeight: 700, fontSize: 28, color: p.color }}>{p.price}</span>
              <span style={{ ...inter, fontSize: 14, color: "#6B7280" }}>{p.period}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={p.color} fillOpacity={0.12}/><path d="M8 12l3 3 5-5" stroke={p.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ ...inter, fontSize: 13, color: "#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{
              width: "100%", ...inter, fontSize: 14, fontWeight: 700, padding: "11px",
              borderRadius: 10, border: "none", cursor: p.current ? "default" : "pointer",
              background: p.current ? "#F3F4F6" : p.color,
              color: p.current ? "#9CA3AF" : ONYX,
            }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
