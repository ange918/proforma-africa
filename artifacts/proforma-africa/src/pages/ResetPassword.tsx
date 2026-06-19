import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { AuthLayout } from "@/components/AuthLayout";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/update-password",
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <AuthLayout>
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(2,245,161,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#02F5A1" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 style={{ ...inter, fontSize: 20, fontWeight: 700, color: "#0A0F0D", marginBottom: 10 }}>Email envoyé !</h2>
          <p style={{ ...inter, fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
            Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
          </p>
          <a href="/login" style={{ ...inter, display: "inline-block", marginTop: 24, color: GREEN, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            ← Retour à la connexion
          </a>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 style={{ ...inter, fontSize: 22, fontWeight: 700, color: "#0A0F0D", textAlign: "center", marginBottom: 6 }}>
        Mot de passe oublié ?
      </h1>
      <p style={{ ...inter, fontSize: 14, color: "#6B7280", textAlign: "center", marginBottom: 28 }}>
        Entrez votre email pour recevoir un lien de réinitialisation.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="vous@exemple.com" required
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, border: `1.5px solid ${focused ? GREEN : "#E5E7EB"}`, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", fontFamily: "Inter, sans-serif", color: "#0A0F0D" }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        </div>

        {error && (
          <p style={{ ...inter, fontSize: 13, color: "#EF4444", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{
          width: "100%", padding: "13px", borderRadius: 10, border: "none",
          background: loading ? "#94A3B8" : GREEN, color: ONYX,
          fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", ...inter,
        }}>
          {loading ? "Envoi…" : "Envoyer le lien"}
        </button>
      </form>

      <p style={{ ...inter, fontSize: 13, color: "#6B7280", textAlign: "center", marginTop: 20 }}>
        <a href="/login" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>← Retour à la connexion</a>
      </p>
    </AuthLayout>
  );
}
