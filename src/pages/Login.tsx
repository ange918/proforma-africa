import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "../lib/supabase/client";
import { SplitAuthLayout } from "../components/SplitAuthLayout";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect."
        : error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14,
    border: `1.5px solid ${focused === name ? GREEN : "#E5E7EB"}`,
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    fontFamily: "Inter, sans-serif", color: "#0A0F0D", background: "#FFFFFF",
  });

  return (
    <SplitAuthLayout>
      <h1 style={{ ...inter, fontSize: 22, fontWeight: 700, color: "#0A0F0D", textAlign: "center", marginBottom: 6 }}>
        Connectez-vous
      </h1>
      <p style={{ ...inter, fontSize: 14, color: "#6B7280", textAlign: "center", marginBottom: 24 }}>
        Content de vous revoir 👋
      </p>

      <button onClick={handleGoogle} style={{
        width: "100%", padding: "11px", borderRadius: 10, border: "1.5px solid #E5E7EB",
        background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10, fontSize: 14, fontWeight: 600,
        color: "#0A0F0D", marginBottom: 20, ...inter, transition: "background 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; }}>
        <GoogleIcon /> Continuer avec Google
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
        <span style={{ ...inter, fontSize: 12, color: "#9CA3AF" }}>ou</span>
        <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
      </div>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
            Email
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="vous@exemple.com" required style={inputStyle("email")}
            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151" }}>Mot de passe</label>
            <a href="/reset-password" style={{ ...inter, fontSize: 12, color: GREEN, textDecoration: "none" }}>
              Mot de passe oublié ?
            </a>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••" required style={inputStyle("password")}
            onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
        </div>

        {error && (
          <p style={{ ...inter, fontSize: 13, color: "#EF4444", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{
          width: "100%", padding: "13px", borderRadius: 10, border: "none",
          background: loading ? "#94A3B8" : GREEN, color: ONYX,
          fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
          ...inter, transition: "opacity 0.2s", marginTop: 4,
        }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>

      <p style={{ ...inter, fontSize: 13, color: "#6B7280", textAlign: "center", marginTop: 20 }}>
        Pas de compte ?{" "}
        <a href="/register" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>S'inscrire</a>
      </p>
    </SplitAuthLayout>
  );
}
