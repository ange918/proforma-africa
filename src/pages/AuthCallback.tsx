import { useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "../lib/supabase/client";

export default function AuthCallback() {
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) navigate("/login?error=auth_error");
      else navigate("/dashboard");
    });
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#07191E", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#02F5A1", fontFamily: "Inter, sans-serif", fontSize: 14 }}>Connexion en cours…</p>
    </div>
  );
}
