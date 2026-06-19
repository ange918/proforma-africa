import "./SplitAuthLayout.css";

const GREEN = "#02F5A1";

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Factures & devis pro",
    desc: "Créez des documents professionnels en moins de 3 minutes.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Multi-devises africaines",
    desc: "FCFA, GHS, KES, NGN, MAD et plus — adapté à votre marché.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Suivi des paiements",
    desc: "Sachez en temps réel qui vous a payé et qui vous doit encore.",
  },
];

const testimonial = {
  text: "ProformaAfrica m'a permis de paraître 10× plus professionnel face à mes clients. Je génère mes factures en 2 minutes.",
  author: "Kofi A.",
  role: "Designer freelance · Accra",
};

export function SplitAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="split-auth-root">
      {/* LEFT — branding panel */}
      <div className="split-auth-left">
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -120, left: -80,
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,245,161,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, right: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,245,161,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div>
          <a href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 22, color: "#FFFFFF" }}>
              Proforma<span style={{ color: GREEN }}>Africa</span>
            </span>
          </a>

          {/* Headline */}
          <div style={{ marginTop: 56 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: GREEN, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              Pour les freelances africains
            </p>
            <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 28, color: "#FFFFFF", lineHeight: 1.35, marginBottom: 16 }}>
              La facturation simple,<br />rapide et professionnelle.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#94A3B8", lineHeight: 1.7 }}>
              Rejoignez des milliers de freelances qui font confiance à ProformaAfrica pour gérer leurs paiements.
            </p>
          </div>

          {/* Features */}
          <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                  background: "rgba(2,245,161,0.1)", display: "flex",
                  alignItems: "center", justifyContent: "center", color: GREEN,
                }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#FFFFFF", marginBottom: 4 }}>{f.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div style={{
          borderLeft: `3px solid ${GREEN}`, paddingLeft: 20,
          marginTop: 48,
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: 14, color: "#CBD5E1", lineHeight: 1.7, marginBottom: 12 }}>
            "{testimonial.text}"
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>
            {testimonial.author} <span style={{ color: "#64748B", fontWeight: 400 }}>— {testimonial.role}</span>
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="split-auth-right">
        <div className="split-auth-card">
          {/* Mobile-only logo */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }} className="mobile-logo">
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 20, color: "#FFFFFF", background: "#07191E", padding: "6px 12px", borderRadius: 8 }}>
              Proforma<span style={{ color: GREEN }}>Africa</span>
            </span>
          </a>
          {children}
        </div>
      </div>
    </div>
  );
}
