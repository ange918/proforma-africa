import { useAuth } from "../contexts/AuthContext";
import { ArrowRightOnRectangleIcon, DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const unbounded: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Utilisateur";

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFB", ...inter }}>
      {/* Navbar */}
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
            <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ ...unbounded, fontWeight: 700, fontSize: 26, color: "#0A0F0D", marginBottom: 8 }}>
            Bonjour, {name} 👋
          </h1>
          <p style={{ color: "#6B7280", fontSize: 15 }}>Bienvenue sur votre dashboard ProformaAfrica.</p>
        </div>

        {/* CTA card */}
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
            <PlusIcon style={{ width: 18, height: 18 }} />
            Nouveau document
          </button>
        </div>

        {/* Empty state */}
        <div style={{
          background: "#FFFFFF", borderRadius: 16, padding: "48px 24px",
          textAlign: "center", border: "1px solid #E5E7EB",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "rgba(2,245,161,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          }}>
            <DocumentTextIcon style={{ width: 32, height: 32, color: GREEN }} />
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
