import { useAuth } from "@/contexts/AuthContext";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const unbounded: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Utilisateur";

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFB", ...inter }}>
      <nav style={{ background: ONYX, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 18, color: "#FFFFFF" }}>Proforma</span>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 18, color: GREEN }}>Africa</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#94A3B8" }}>{user?.email}</span>
          <button onClick={signOut} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8,
            color: "#94A3B8", cursor: "pointer", padding: "6px 12px", display: "flex",
            alignItems: "center", gap: 6, fontSize: 13, ...inter,
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ ...unbounded, fontWeight: 700, fontSize: 26, color: "#0A0F0D", marginBottom: 8 }}>
            Bonjour, {name} 👋
          </h1>
          <p style={{ color: "#6B7280", fontSize: 15 }}>Bienvenue sur votre dashboard ProformaAfrica.</p>
        </div>

        <div style={{
          background: ONYX, borderRadius: 16, padding: "32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20, marginBottom: 32,
        }}>
          <div>
            <h2 style={{ ...unbounded, color: "#FFFFFF", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              Créez votre premier document
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>Facture, devis ou proforma en moins de 3 minutes.</p>
          </div>
          <button style={{
            background: GREEN, color: ONYX, border: "none", borderRadius: 10,
            padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, ...inter,
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau document
          </button>
        </div>

        <div style={{
          background: "#FFFFFF", borderRadius: 16, padding: "48px 24px",
          textAlign: "center", border: "1px solid #E5E7EB",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "rgba(2,245,161,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 style={{ ...unbounded, fontSize: 16, fontWeight: 700, color: "#0A0F0D", marginBottom: 8 }}>
            Aucun document pour l'instant
          </h3>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Vos factures et devis apparaîtront ici.</p>
        </div>
      </div>
    </div>
  );
}
