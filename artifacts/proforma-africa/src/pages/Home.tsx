import { useState } from "react";

const GREEN = "#02F5A1";
const ONYX = "#07191E";
const BG = "#F8FAFB";
const TEXT = "#0A0F0D";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const CARD = "#FFFFFF";

const unbounded: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink: React.CSSProperties = {
    ...inter,
    color: "#CBD5E1",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    transition: "color 0.2s",
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: ONYX, borderBottom: `1px solid rgba(255,255,255,0.08)`,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 20, color: "#FFFFFF", letterSpacing: "-0.5px" }}>
            Proforma
          </span>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 20, color: GREEN, letterSpacing: "-0.5px" }}>
            Africa
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, "@media(maxWidth:768px)": { display: "none" } as any }}
          className="desktop-nav">
          {["Fonctionnalités", "Tarifs", "Comment ça marche", "FAQ"].map((item, i) => {
            const hrefs = ["#fonctionnalites", "#tarifs", "#comment", "#faq"];
            return (
              <a key={item} href={hrefs[i]} style={navLink}
                onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={e => (e.currentTarget.style.color = "#CBD5E1")}>
                {item}
              </a>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="desktop-nav">
          <a href="/login" style={{
            ...inter, fontSize: 14, fontWeight: 600, color: GREEN,
            border: `1.5px solid ${GREEN}`, borderRadius: 8,
            padding: "8px 18px", textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(2,245,161,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Se connecter
          </a>
          <a href="/register" style={{
            ...inter, fontSize: 14, fontWeight: 700, color: ONYX,
            background: GREEN, borderRadius: 8, padding: "8px 18px",
            textDecoration: "none", border: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            S'inscrire
          </a>
        </div>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="burger-btn"
          style={{
            background: "none", border: "none", color: "#FFFFFF",
            fontSize: 22, cursor: "pointer", padding: 4,
          }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: ONYX, padding: "16px 24px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {["Fonctionnalités", "Tarifs", "Comment ça marche", "FAQ"].map((item, i) => {
            const hrefs = ["#fonctionnalites", "#tarifs", "#comment", "#faq"];
            return (
              <a key={item} href={hrefs[i]} onClick={() => setMenuOpen(false)}
                style={{ ...navLink, fontSize: 15 }}>
                {item}
              </a>
            );
          })}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a href="/login" style={{
              ...inter, fontSize: 14, fontWeight: 600, color: GREEN,
              border: `1.5px solid ${GREEN}`, borderRadius: 8,
              padding: "9px 18px", textDecoration: "none", flex: 1, textAlign: "center",
            }}>Se connecter</a>
            <a href="/register" style={{
              ...inter, fontSize: 14, fontWeight: 700, color: ONYX,
              background: GREEN, borderRadius: 8, padding: "9px 18px",
              textDecoration: "none", flex: 1, textAlign: "center",
            }}>S'inscrire</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ background: ONYX, padding: "80px 24px 64px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(2,245,161,0.1)", border: "1px solid rgba(2,245,161,0.3)",
          borderRadius: 100, padding: "6px 16px", marginBottom: 28,
        }}>
          <span style={{ fontSize: 16 }}>🚀</span>
          <span style={{ ...inter, color: GREEN, fontSize: 13, fontWeight: 600 }}>
            Conçu pour l'Afrique
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          ...unbounded, fontWeight: 700, color: "#FFFFFF",
          fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.15,
          marginBottom: 20, letterSpacing: "-1px",
        }}>
          Créez vos <span style={{ color: GREEN }}>factures</span> et devis
          <br />en moins de 3 minutes
        </h1>

        {/* Subtitle */}
        <p style={{
          ...inter, color: "#94A3B8", fontSize: 18, lineHeight: 1.6,
          maxWidth: 580, margin: "0 auto 36px",
        }}>
          L'outil de facturation pensé pour les freelances et entrepreneurs africains.
          Mobile Money, multi-devises, templates professionnels.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a href="/register" style={{
            ...inter, fontWeight: 700, fontSize: 16, color: ONYX,
            background: GREEN, borderRadius: 10, padding: "14px 28px",
            textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            Créer mon compte gratuitement
          </a>
          <a href="#comment" style={{
            ...inter, fontWeight: 600, fontSize: 16, color: GREEN,
            border: `1.5px solid ${GREEN}`, borderRadius: 10, padding: "14px 28px",
            textDecoration: "none", transition: "background 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(2,245,161,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Voir une démo
          </a>
        </div>

        {/* Trust badge */}
        <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>
          ✓ Gratuit &nbsp;·&nbsp; ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Prêt en 30 secondes
        </p>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const stats = [
    { value: "3 min", label: "Temps moyen de création" },
    { value: "8+", label: "Templates professionnels" },
    { value: "100%", label: "Gratuit pour commencer" },
  ];

  return (
    <section style={{ background: ONYX, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "40px 24px 72px" }}>
      <div style={{
        maxWidth: 760, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
      }}>
        {stats.map(s => (
          <div key={s.value} style={{ textAlign: "center" }}>
            <div style={{
              ...unbounded, color: GREEN, fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 6,
            }}>
              {s.value}
            </div>
            <div style={{ ...inter, color: "#94A3B8", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

const features = [
  { icon: "⚡", title: "Rapide", desc: "Générez un document professionnel en moins de 3 minutes chrono" },
  { icon: "🎨", title: "Personnalisable", desc: "8 templates, palettes de couleurs, votre logo et signature" },
  { icon: "💰", title: "Multi-devises", desc: "XOF, XAF, EUR, USD, MAD — toutes les devises africaines" },
  { icon: "📱", title: "Mobile Money", desc: "MTN, Moov, Orange Money, Wave intégrés dans vos documents" },
  { icon: "💾", title: "Sauvegarde auto", desc: "Tous vos documents sauvegardés et accessibles depuis votre dashboard" },
  { icon: "📧", title: "Envoi par email", desc: "Envoyez vos documents directement à vos clients par email" },
];

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD, borderRadius: 16,
        border: `1px solid ${hovered ? GREEN : BORDER}`,
        boxShadow: hovered ? `0 4px 24px rgba(2,245,161,0.12)` : "none",
        padding: "28px 24px",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "rgba(2,245,161,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 16,
      }}>
        {icon}
      </div>
      <h3 style={{ ...unbounded, fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ ...inter, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="fonctionnalites" style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)", color: TEXT, marginBottom: 12 }}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={{ ...inter, color: MUTED, fontSize: 16 }}>Une suite complète pour gérer votre facturation</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {features.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

const steps = [
  { num: "01", title: "Créez votre compte", desc: "Inscription gratuite en 30 secondes, aucune carte bancaire requise" },
  { num: "02", title: "Configurez votre entreprise", desc: "Logo, IFU, signature — rempli une fois, utilisé partout" },
  { num: "03", title: "Générez et envoyez", desc: "PDF professionnel prêt en quelques secondes" },
];

function HowItWorks() {
  return (
    <section id="comment" style={{ background: ONYX, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{
          ...unbounded, fontWeight: 700, color: "#FFFFFF",
          fontSize: "clamp(22px, 3.5vw, 34px)", textAlign: "center", marginBottom: 56,
        }}>
          Simple comme bonjour
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 0, position: "relative",
        }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
                <div style={{
                  ...unbounded, color: GREEN, fontWeight: 900,
                  fontSize: 42, lineHeight: 1, marginBottom: 12,
                }}>
                  {step.num}
                </div>
                <h3 style={{ ...unbounded, fontWeight: 700, color: "#FFFFFF", fontSize: 15, marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ ...inter, color: "#94A3B8", fontSize: 14, lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  color: GREEN, fontSize: 28, alignSelf: "flex-start",
                  marginTop: 12, flexShrink: 0, display: "flex", alignItems: "center",
                }} className="step-arrow">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────

function PricingCard({
  plan, price, subtitle, features, cta, ctaHref, dark, popular,
}: {
  plan: string; price: string; subtitle: string; features: { ok: boolean; text: string }[];
  cta: string; ctaHref: string; dark?: boolean; popular?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      background: dark ? ONYX : CARD,
      border: dark ? `1.5px solid rgba(2,245,161,0.3)` : `1px solid ${BORDER}`,
      borderRadius: 20, padding: "36px 32px",
      flex: 1, minWidth: 280, maxWidth: 400,
      position: "relative",
      boxShadow: dark ? `0 0 40px rgba(2,245,161,0.08)` : "none",
    }}>
      {popular && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: GREEN, color: ONYX, ...inter, fontWeight: 700,
          fontSize: 12, borderRadius: 100, padding: "4px 14px",
        }}>
          Populaire
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <div style={{ ...unbounded, fontWeight: 700, fontSize: 15, color: dark ? "#FFFFFF" : TEXT, marginBottom: 8 }}>
          {plan}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ ...unbounded, fontWeight: 900, fontSize: 36, color: dark ? GREEN : TEXT }}>
            {price}
          </span>
          <span style={{ ...inter, color: dark ? "#94A3B8" : MUTED, fontSize: 14 }}>XOF/mois</span>
        </div>
        <p style={{ ...inter, color: dark ? "#94A3B8" : MUTED, fontSize: 13, marginTop: 4 }}>{subtitle}</p>
      </div>

      <div style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : BORDER}`, paddingTop: 20, marginBottom: 28 }}>
        {features.map(f => (
          <div key={f.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{f.ok ? "✅" : "❌"}</span>
            <span style={{ ...inter, fontSize: 14, color: dark ? (f.ok ? "#E2E8F0" : "#64748B") : (f.ok ? TEXT : MUTED) }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      <a href={ctaHref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block", textAlign: "center", textDecoration: "none",
          borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 15,
          transition: "all 0.2s", ...inter,
          ...(dark
            ? { background: hovered ? "rgba(2,245,161,0.88)" : GREEN, color: ONYX }
            : { border: `1.5px solid ${GREEN}`, color: GREEN, background: hovered ? "rgba(2,245,161,0.08)" : "transparent" }),
        }}>
        {cta}
      </a>
    </div>
  );
}

function Pricing() {
  return (
    <section id="tarifs" style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)", color: TEXT, marginBottom: 12 }}>
            Des tarifs pensés pour l'Afrique
          </h2>
          <p style={{ ...inter, color: MUTED, fontSize: 16 }}>Commencez gratuitement, passez au Pro quand vous êtes prêt</p>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
          <PricingCard
            plan="Gratuit"
            price="0"
            subtitle="Pour démarrer votre activité"
            features={[
              { ok: true, text: "3 documents par mois" },
              { ok: true, text: "1 template classique" },
              { ok: true, text: "Export PDF" },
              { ok: true, text: "Toutes les devises africaines" },
              { ok: false, text: "Config entreprise pré-remplie" },
              { ok: false, text: "Carnet de clients" },
              { ok: false, text: "Envoi par email" },
            ]}
            cta="Commencer gratuitement"
            ctaHref="/register"
          />
          <PricingCard
            plan="Pro"
            price="4 900"
            subtitle="Pour les professionnels actifs"
            features={[
              { ok: true, text: "Documents illimités" },
              { ok: true, text: "8 templates professionnels" },
              { ok: true, text: "Config entreprise pré-remplie" },
              { ok: true, text: "Carnet de clients illimité" },
              { ok: true, text: "Envoi par email" },
              { ok: true, text: "Sauvegarde automatique" },
              { ok: true, text: "Support prioritaire" },
            ]}
            cta="Passer au Pro"
            ctaHref="/register"
            dark
            popular
          />
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = [
  { name: "Elton Bill", role: "Entrepreneur, Cotonou", stars: 4, text: "ProformaAfrica m'a sauvé un temps précieux. En moins de 2 minutes, j'envoie des devis professionnels." },
  { name: "Ben Ephraïm", role: "Freelance, Cotonou", stars: 4, text: "Enfin un outil fait pour nous. Le Mobile Money intégré dans les documents, c'est exactement ce dont j'avais besoin." },
  { name: "Africa Fashion Awards", role: "Organisation", stars: 5, text: "Les templates sont professionnels et reflètent parfaitement notre image de marque." },
  { name: "Honorat Dariel", role: "Designer, Bénin", stars: 4, text: "Mes clients sont impressionnés par la qualité de mes devis. Je recommande." },
  { name: "Hermann Matiano", role: "Chef de projet, Cotonou", stars: 4, text: "La fonctionnalité de pré-remplissage automatique est géniale. Une seule configuration et c'est parti." },
  { name: "Models Academy Management", role: "Agence, Cotonou", stars: 5, text: "Nous gérons des dizaines de contrats chaque mois. ProformaAfrica professionnalise notre image." },
  { name: "JRC Digit", role: "Agence digitale, Bénin", stars: 4, text: "Un outil indispensable. Nos clients reçoivent des devis clairs et professionnels." },
];

function Testimonials() {
  return (
    <section style={{ background: BG, padding: "80px 24px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{
          ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)",
          color: TEXT, textAlign: "center", marginBottom: 52,
        }}>
          Ils nous font confiance
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20,
        }}>
          {testimonials.map(t => (
            <div key={t.name} style={{
              background: CARD, borderRadius: 12, padding: "24px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: ONYX, display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ ...unbounded, color: GREEN, fontWeight: 700, fontSize: 13 }}>
                    {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <div style={{ ...inter, fontWeight: 600, fontSize: 14, color: TEXT }}>{t.name}</div>
                  <div style={{ ...inter, fontSize: 12, color: MUTED }}>{t.role}</div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < t.stars ? GREEN : "#D1D5DB", fontSize: 14 }}>★</span>
                ))}
              </div>
              <p style={{ ...inter, fontSize: 14, color: "#374151", fontStyle: "italic", lineHeight: 1.65 }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqItems = [
  { q: "Est-ce vraiment gratuit ?", a: "Oui, le plan gratuit donne accès à 3 documents par mois sans carte bancaire." },
  { q: "Quels modes de paiement puis-je afficher ?", a: "MTN Mobile Money, Moov Money, Orange Money, Wave, virement bancaire, chèque et espèces." },
  { q: "Mes données sont-elles sécurisées ?", a: "Vos données sont stockées sur Supabase avec chiffrement et politiques RLS strictes." },
  { q: "Puis-je personnaliser avec mon logo ?", a: "Oui, dans Paramètres vous uploadez votre logo, signature et choisissez vos couleurs." },
  { q: "Comment passer au plan Pro ?", a: "Dans votre dashboard, section Abonnement, choisissez votre plan." },
  { q: "Quelles devises sont supportées ?", a: "XOF, XAF, EUR, USD, MAD et d'autres devises africaines et internationales." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ background: ONYX, padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{
          ...unbounded, fontWeight: 700, color: "#FFFFFF",
          fontSize: "clamp(22px, 3.5vw, 34px)", textAlign: "center", marginBottom: 48,
        }}>
          Questions fréquentes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                borderBottom: `1px solid rgba(255,255,255,0.1)`,
                borderLeft: isOpen ? `3px solid ${GREEN}` : "3px solid transparent",
                transition: "border-color 0.2s",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    padding: "20px 16px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                  <span style={{ ...inter, fontWeight: 600, fontSize: 15, color: "#FFFFFF" }}>
                    {item.q}
                  </span>
                  <span style={{
                    color: GREEN, fontSize: 20, flexShrink: 0, marginLeft: 16,
                    transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 16px 20px" }}>
                    <p style={{ ...inter, color: "#94A3B8", fontSize: 14, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────

function CTAFinal() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{ background: GREEN, padding: "72px 24px", textAlign: "center" }}>
      <h2 style={{
        ...unbounded, fontWeight: 700, color: ONYX,
        fontSize: "clamp(20px, 3.5vw, 32px)", marginBottom: 28, maxWidth: 600, margin: "0 auto 28px",
      }}>
        Prêt à professionnaliser votre facturation ?
      </h2>
      <a href="/register"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...inter, fontWeight: 700, fontSize: 16, color: GREEN,
          background: hovered ? "#0f2730" : ONYX,
          borderRadius: 10, padding: "14px 32px",
          textDecoration: "none", display: "inline-block", transition: "background 0.2s",
        }}>
        Créer mon compte gratuitement
      </a>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: ONYX, padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <span style={{ ...unbounded, fontWeight: 700, fontSize: 18, color: "#FFFFFF" }}>Proforma</span>
              <span style={{ ...unbounded, fontWeight: 700, fontSize: 18, color: GREEN }}>Africa</span>
            </div>
            <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>
              La facturation pensée pour l'Afrique
            </p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Mentions légales", "Confidentialité", "CGU"].map(link => (
              <a key={link} href="#" style={{ ...inter, color: "#94A3B8", fontSize: 13, textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.color = GREEN; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#94A3B8"; }}>
                {link}
              </a>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>
            Fait avec fierté au Bénin 🇧🇯
          </p>
          <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>
            © 2026 ProformaAfrica
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", ...inter }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: #F8FAFB; color: #0A0F0D; }
        .desktop-nav { display: flex !important; }
        .burger-btn { display: none !important; }
        .step-arrow { display: flex !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
          .step-arrow { display: none !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
