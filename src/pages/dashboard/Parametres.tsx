import { useEffect, useState } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const GREEN = "#02F5A1"; const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const ub: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };

const COLORS = ["#02F5A1", "#1A6B3C", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"];
const FONTS = ["Inter", "Unbounded", "Poppins", "Montserrat"];
const PAYS_AFRIQUE = ["Bénin", "Côte d'Ivoire", "Sénégal", "Mali", "Cameroun", "Togo", "Burkina Faso", "Guinée", "Niger", "Congo", "Ghana", "Nigeria", "Kenya", "Maroc", "Autre"];
const DEVISES = ["FCFA", "GHS", "KES", "NGN", "MAD", "USD", "EUR"];
const PAIEMENTS = ["Virement bancaire", "Mobile Money", "Espèces", "Chèque", "Carte bancaire"];

type Tab = "entreprise" | "apparence" | "compte";

interface Config {
  id?: string; nom?: string; email?: string; telephone?: string;
  ifu?: string; rccm?: string; adresse?: string; ville?: string; pays?: string;
  mode_paiement_defaut?: string; devise_defaut?: string;
}

export default function DashboardParametres() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("entreprise");
  const [config, setConfig] = useState<Config>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [accentColor, setAccentColor] = useState("#02F5A1");
  const [font, setFont] = useState("Inter");

  useEffect(() => {
    if (!user) return;
    supabase.from("entreprise_config").select("*").eq("user_id", user.id).single()
      .then(({ data }) => { if (data) setConfig(data); });
  }, [user]);

  const upConfig = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setConfig(c => ({ ...c, [k]: e.target.value }));

  const saveConfig = async () => {
    setSaving(true);
    const payload = { ...config, user_id: user!.id };
    if (config.id) {
      await supabase.from("entreprise_config").update(payload).eq("id", config.id);
    } else {
      const { data } = await supabase.from("entreprise_config").insert(payload).select().single();
      if (data) setConfig(data);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const iStyle: React.CSSProperties = { ...inter, fontSize: 14, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", outline: "none", width: "100%", boxSizing: "border-box", background: "#FFF" };
  const labelStyle: React.CSSProperties = { ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 };
  const field = (label: string, key: string, type = "text", placeholder = "") => (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={(config as Record<string, string>)[key] || ""} onChange={upConfig(key)} placeholder={placeholder} style={iStyle} />
    </div>
  );

  const TABS: { key: Tab; label: string }[] = [
    { key: "entreprise", label: "Entreprise" },
    { key: "apparence", label: "Apparence" },
    { key: "compte", label: "Compte" },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#F3F4F6", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            ...inter, fontSize: 14, fontWeight: tab === t.key ? 700 : 500,
            padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
            background: tab === t.key ? "#FFF" : "transparent",
            color: tab === t.key ? "#0A0F0D" : "#6B7280",
            boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ENTREPRISE */}
      {tab === "entreprise" && (
        <div style={{ background: "#FFF", borderRadius: 14, padding: 28, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {field("Nom de l'entreprise", "nom", "text", "Mon Entreprise")}
            {field("Email", "email", "email", "contact@entreprise.com")}
          </div>
          {field("Téléphone", "telephone", "tel")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {field("IFU", "ifu")}
            {field("RCCM", "rccm")}
          </div>
          {field("Adresse", "adresse")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {field("Ville", "ville")}
            <div>
              <label style={labelStyle}>Pays</label>
              <select value={config.pays || ""} onChange={upConfig("pays")} style={{ ...iStyle }}>
                <option value="">Sélectionner…</option>
                {PAYS_AFRIQUE.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Mode paiement défaut</label>
              <select value={config.mode_paiement_defaut || ""} onChange={upConfig("mode_paiement_defaut")} style={{ ...iStyle }}>
                <option value="">Sélectionner…</option>
                {PAIEMENTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Devise défaut</label>
              <select value={config.devise_defaut || ""} onChange={upConfig("devise_defaut")} style={{ ...iStyle }}>
                {DEVISES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <button onClick={saveConfig} disabled={saving} style={{ ...inter, fontSize: 14, fontWeight: 700, padding: "11px 24px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>
              {saving ? "Enregistrement…" : "Sauvegarder"}
            </button>
            {saved && <span style={{ ...inter, fontSize: 13, color: "#059669", fontWeight: 600 }}>✓ Sauvegardé</span>}
          </div>
        </div>
      )}

      {/* APPARENCE */}
      {tab === "apparence" && (
        <div style={{ background: "#FFF", borderRadius: 14, padding: 28, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ ...inter, fontWeight: 700, fontSize: 14, color: "#0A0F0D", marginBottom: 12 }}>Couleur principale</p>
            <div style={{ display: "flex", gap: 10 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setAccentColor(c)} style={{
                  width: 36, height: 36, borderRadius: "50%", background: c, border: "none", cursor: "pointer",
                  outline: accentColor === c ? `3px solid ${c}` : "none",
                  outlineOffset: 3, transform: accentColor === c ? "scale(1.15)" : "none", transition: "all 0.15s",
                }} />
              ))}
            </div>
          </div>
          <div>
            <p style={{ ...inter, fontWeight: 700, fontSize: 14, color: "#0A0F0D", marginBottom: 12 }}>Police</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {FONTS.map(f => (
                <button key={f} onClick={() => setFont(f)} style={{
                  ...inter, fontSize: 13, padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                  background: font === f ? accentColor : "#F3F4F6",
                  color: font === f ? ONYX : "#374151",
                  border: `1.5px solid ${font === f ? accentColor : "transparent"}`,
                  fontFamily: f,
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Mini preview */}
          <div>
            <p style={{ ...inter, fontWeight: 700, fontSize: 14, color: "#0A0F0D", marginBottom: 12 }}>Aperçu</p>
            <div style={{ border: `2px solid ${accentColor}`, borderRadius: 10, padding: 16, fontFamily: font }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontFamily: font, fontWeight: 700, fontSize: 16, color: ONYX }}>Proforma<span style={{ color: accentColor }}>Africa</span></span>
                <span style={{ fontFamily: font, fontSize: 13, color: "#6B7280" }}>Facture #001</span>
              </div>
              <div style={{ height: 1, background: "#E5E7EB", marginBottom: 12 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: font, fontSize: 13, color: "#374151" }}>Service de design</span>
                <span style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: ONYX }}>150 000 FCFA</span>
              </div>
              <div style={{ marginTop: 12, padding: "8px 12px", background: accentColor, borderRadius: 6, display: "inline-block" }}>
                <span style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: ONYX }}>Payé</span>
              </div>
            </div>
          </div>
          <button style={{ ...inter, fontSize: 14, fontWeight: 700, padding: "11px 24px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
            Sauvegarder
          </button>
        </div>
      )}

      {/* COMPTE */}
      {tab === "compte" && (
        <div style={{ background: "#FFF", borderRadius: 14, padding: 28, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <label style={labelStyle}>Email actuel</label>
            <input readOnly value={user?.email || ""} style={{ ...iStyle, background: "#F9FAFB", color: "#6B7280" }} />
          </div>
          <Link href="/update-password">
            <button style={{ ...inter, fontSize: 14, fontWeight: 600, padding: "10px 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FFF", cursor: "pointer", color: "#374151" }}>
              Changer le mot de passe →
            </button>
          </Link>
          <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 20 }}>
            <p style={{ ...inter, fontWeight: 700, fontSize: 14, color: "#EF4444", marginBottom: 8 }}>Zone de danger</p>
            <p style={{ ...inter, fontSize: 13, color: "#6B7280", marginBottom: 12 }}>Cette action est irréversible. Toutes vos données seront supprimées.</p>
            <button style={{ ...inter, fontSize: 14, fontWeight: 600, padding: "10px 20px", borderRadius: 8, border: "1.5px solid #FCA5A5", background: "#FEF2F2", cursor: "pointer", color: "#EF4444" }}
              onClick={() => confirm("Êtes-vous sûr de vouloir supprimer votre compte ?") && alert("Contactez le support pour supprimer votre compte.")}>
              Supprimer mon compte
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
