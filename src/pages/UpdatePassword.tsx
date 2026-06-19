import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "../lib/supabase/client";
import { AuthLayout } from "../components/AuthLayout";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

export default function UpdatePassword() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else navigate("/login");
    setLoading(false);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14,
    border: `1.5px solid ${focused === name ? GREEN : "#E5E7EB"}`,
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    fontFamily: "Inter, sans-serif", color: "#0A0F0D", background: "#FFFFFF",
  });

  return (
    <AuthLayout>
      <h1 style={{ ...inter, fontSize: 22, fontWeight: 700, color: "#0A0F0D", textAlign: "center", marginBottom: 6 }}>
        Nouveau mot de passe
      </h1>
      <p style={{ ...inter, fontSize: 14, color: "#6B7280", textAlign: "center", marginBottom: 28 }}>
        Choisissez un mot de passe sécurisé.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Nouveau mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 caractères" required style={inputStyle("password")} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
        </div>
        <div>
          <label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Confirmer le mot de passe</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required style={inputStyle("confirm")} onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)} />
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
          {loading ? "Mise à jour…" : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </AuthLayout>
  );
}
