import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#07191E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#02F5A1", fontFamily: "Inter, sans-serif", fontSize: 14 }}>Chargement…</div>
      </div>
    );
  }

  if (!session) return <Redirect to="/login" />;
  return <>{children}</>;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#07191E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#02F5A1", fontFamily: "Inter, sans-serif", fontSize: 14 }}>Chargement…</div>
      </div>
    );
  }

  if (session) return <Redirect to="/dashboard" />;
  return <>{children}</>;
}
