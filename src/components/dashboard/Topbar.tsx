import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/factures": "Factures",
  "/dashboard/devis": "Devis",
  "/dashboard/proformas": "Proformas",
  "/dashboard/clients": "Clients",
  "/dashboard/services": "Services",
  "/dashboard/parametres": "Paramètres",
  "/dashboard/abonnement": "Abonnement",
};

interface TopbarProps { onMenuClick: () => void; }

export function Topbar({ onMenuClick }: TopbarProps) {
  const [location, navigate] = useLocation();
  const { user, signOut } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const title = PAGE_TITLES[location] || "Dashboard";
  const fullName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "U";
  const initials = fullName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header style={{
      height: 64, background: "#FFFFFF", borderBottom: "1px solid #E5E7EB",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Burger - mobile only via CSS class */}
        <button
          className="db-burger"
          onClick={onMenuClick}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 6, borderRadius: 6, color: "#374151",
          }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="db-topbar-title" style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 17, color: "#0A0F0D" }}>
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div style={{ position: "relative" }} ref={dropRef}>
        <button onClick={() => setDropOpen(p => !p)} style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "#07191E", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: "#02F5A1",
        }}>
          {initials}
        </button>

        {dropOpen && (
          <div style={{
            position: "absolute", right: 0, top: 46, width: 220,
            background: "#FFFFFF", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid #E5E7EB", overflow: "hidden", zIndex: 100,
          }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: "#0A0F0D", marginBottom: 2 }}>{fullName}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>{user?.email}</p>
            </div>
            <div style={{ padding: "6px" }}>
              <Link href="/dashboard/parametres">
                <div onClick={() => setDropOpen(false)} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
                  borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif",
                  fontSize: 14, color: "#374151",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Paramètres
                </div>
              </Link>
              <div style={{ height: 1, background: "#E5E7EB", margin: "4px 0" }} />
              <button onClick={handleSignOut} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
                borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif",
                fontSize: 14, color: "#EF4444", background: "none", border: "none", textAlign: "left",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FEF2F2"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
