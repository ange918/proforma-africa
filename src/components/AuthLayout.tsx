const unbounded = { fontFamily: "'Unbounded', sans-serif" } as React.CSSProperties;

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#07191E",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", fontFamily: "Inter, sans-serif",
    }}>
      <div style={{
        background: "#FFFFFF", borderRadius: 20, padding: "40px",
        width: "100%", maxWidth: 440,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 22, color: "#FFFFFF", background: "#07191E", padding: "6px 12px", borderRadius: 8 }}>
            Proforma<span style={{ color: "#02F5A1" }}>Africa</span>
          </span>
        </a>
        {children}
      </div>
    </div>
  );
}
