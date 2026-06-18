import { useState } from "react";
import {
  BoltIcon,
  SwatchIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

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
    ...inter, color: "#CBD5E1", textDecoration: "none",
    fontSize: 14, fontWeight: 500, transition: "color 0.2s",
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: ONYX, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 20, color: "#FFFFFF", letterSpacing: "-0.5px" }}>Proforma</span>
          <span style={{ ...unbounded, fontWeight: 700, fontSize: 20, color: GREEN, letterSpacing: "-0.5px" }}>Africa</span>
        </a>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
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

        <div className="desktop-nav" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/login" style={{ ...inter, fontSize: 14, fontWeight: 600, color: GREEN, border: `1.5px solid ${GREEN}`, borderRadius: 8, padding: "8px 18px", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(2,245,161,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Se connecter
          </a>
          <a href="/register" style={{ ...inter, fontSize: 14, fontWeight: 700, color: ONYX, background: GREEN, borderRadius: 8, padding: "8px 18px", textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            S'inscrire
          </a>
        </div>

        <button onClick={() => setMenuOpen(o => !o)} className="burger-btn"
          style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          {menuOpen
            ? <XMarkIcon style={{ width: 24, height: 24 }} />
            : <Bars3Icon style={{ width: 24, height: 24 }} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: ONYX, padding: "16px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 16 }}>
          {["Fonctionnalités", "Tarifs", "Comment ça marche", "FAQ"].map((item, i) => {
            const hrefs = ["#fonctionnalites", "#tarifs", "#comment", "#faq"];
            return <a key={item} href={hrefs[i]} onClick={() => setMenuOpen(false)} style={{ ...navLink, fontSize: 15 }}>{item}</a>;
          })}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a href="/login" style={{ ...inter, fontSize: 14, fontWeight: 600, color: GREEN, border: `1.5px solid ${GREEN}`, borderRadius: 8, padding: "9px 18px", textDecoration: "none", flex: 1, textAlign: "center" }}>Se connecter</a>
            <a href="/register" style={{ ...inter, fontSize: 14, fontWeight: 700, color: ONYX, background: GREEN, borderRadius: 8, padding: "9px 18px", textDecoration: "none", flex: 1, textAlign: "center" }}>S'inscrire</a>
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,245,161,0.1)", border: "1px solid rgba(2,245,161,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <RocketLaunchIcon style={{ width: 16, height: 16, color: GREEN }} />
          <span style={{ ...inter, color: GREEN, fontSize: 13, fontWeight: 600 }}>Conçu pour l'Afrique</span>
        </div>

        <h1 style={{ ...unbounded, fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-1px" }}>
          Créez vos <span style={{ color: GREEN }}>factures</span> et devis<br />en moins de 3 minutes
        </h1>

        <p style={{ ...inter, color: "#94A3B8", fontSize: 18, lineHeight: 1.6, maxWidth: 580, margin: "0 auto 36px" }}>
          L'outil de facturation pensé pour les freelances et entrepreneurs africains. Mobile Money, multi-devises, templates professionnels.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          <a href="/register" style={{ ...inter, fontWeight: 700, fontSize: 16, color: ONYX, background: GREEN, borderRadius: 10, padding: "14px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            Créer mon compte gratuitement
            <ArrowRightIcon style={{ width: 18, height: 18 }} />
          </a>
          <a href="#comment" style={{ ...inter, fontWeight: 600, fontSize: 16, color: GREEN, border: `1.5px solid ${GREEN}`, borderRadius: 10, padding: "14px 28px", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(2,245,161,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Voir une démo
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {["Gratuit", "Sans carte bancaire", "Prêt en 30 secondes"].map(text => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckIcon style={{ width: 14, height: 14, color: GREEN }} />
              <span style={{ ...inter, color: "#64748B", fontSize: 13 }}>{text}</span>
            </div>
          ))}
        </div>
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
      <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {stats.map(s => (
          <div key={s.value} style={{ textAlign: "center" }}>
            <div style={{ ...unbounded, color: GREEN, fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 6 }}>{s.value}</div>
            <div style={{ ...inter, color: "#94A3B8", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

type HeroIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const features: { Icon: HeroIconComponent; title: string; desc: string }[] = [
  { Icon: BoltIcon, title: "Rapide", desc: "Générez un document professionnel en moins de 3 minutes chrono" },
  { Icon: SwatchIcon, title: "Personnalisable", desc: "8 templates, palettes de couleurs, votre logo et signature" },
  { Icon: BanknotesIcon, title: "Multi-devises", desc: "XOF, XAF, EUR, USD, MAD — toutes les devises africaines" },
  { Icon: DevicePhoneMobileIcon, title: "Mobile Money", desc: "MTN, Moov, Orange Money, Wave intégrés dans vos documents" },
  { Icon: CloudArrowUpIcon, title: "Sauvegarde auto", desc: "Tous vos documents sauvegardés et accessibles depuis votre dashboard" },
  { Icon: EnvelopeIcon, title: "Envoi par email", desc: "Envoyez vos documents directement à vos clients par email" },
];

function FeatureCard({ Icon, title, desc }: { Icon: HeroIconComponent; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: CARD, borderRadius: 16, border: `1px solid ${hovered ? GREEN : BORDER}`, boxShadow: hovered ? "0 4px 24px rgba(2,245,161,0.12)" : "none", padding: "28px 24px", transition: "border-color 0.2s, box-shadow 0.2s" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(2,245,161,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon style={{ width: 24, height: 24, color: GREEN }} />
      </div>
      <h3 style={{ ...unbounded, fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 8 }}>{title}</h3>
      <p style={{ ...inter, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="fonctionnalites" style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)", color: TEXT, marginBottom: 12 }}>Tout ce dont vous avez besoin</h2>
          <p style={{ ...inter, color: MUTED, fontSize: 16 }}>Une suite complète pour gérer votre facturation</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
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
        <h2 style={{ ...unbounded, fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(22px, 3.5vw, 34px)", textAlign: "center", marginBottom: 56 }}>
          Simple comme bonjour
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
                <div style={{ ...unbounded, color: GREEN, fontWeight: 900, fontSize: 42, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                <h3 style={{ ...unbounded, fontWeight: 700, color: "#FFFFFF", fontSize: 15, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ ...inter, color: "#94A3B8", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="step-arrow" style={{ color: GREEN, alignSelf: "flex-start", marginTop: 14, flexShrink: 0 }}>
                  <ArrowRightIcon style={{ width: 22, height: 22 }} />
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

function PricingCard({ plan, price, subtitle, features, cta, ctaHref, dark, popular }: {
  plan: string; price: string; subtitle: string;
  features: { ok: boolean; text: string }[];
  cta: string; ctaHref: string; dark?: boolean; popular?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ background: dark ? ONYX : CARD, border: dark ? "1.5px solid rgba(2,245,161,0.3)" : `1px solid ${BORDER}`, borderRadius: 20, padding: "36px 32px", flex: 1, minWidth: 280, maxWidth: 400, position: "relative", boxShadow: dark ? "0 0 40px rgba(2,245,161,0.08)" : "none" }}>
      {popular && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: GREEN, color: ONYX, ...inter, fontWeight: 700, fontSize: 12, borderRadius: 100, padding: "4px 14px" }}>
          Populaire
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <div style={{ ...unbounded, fontWeight: 700, fontSize: 15, color: dark ? "#FFFFFF" : TEXT, marginBottom: 8 }}>{plan}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ ...unbounded, fontWeight: 900, fontSize: 36, color: dark ? GREEN : TEXT }}>{price}</span>
          <span style={{ ...inter, color: dark ? "#94A3B8" : MUTED, fontSize: 14 }}>XOF/mois</span>
        </div>
        <p style={{ ...inter, color: dark ? "#94A3B8" : MUTED, fontSize: 13, marginTop: 4 }}>{subtitle}</p>
      </div>
      <div style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : BORDER}`, paddingTop: 20, marginBottom: 28 }}>
        {features.map(f => (
          <div key={f.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            {f.ok
              ? <CheckCircleIcon style={{ width: 18, height: 18, color: GREEN, flexShrink: 0, marginTop: 1 }} />
              : <XCircleIcon style={{ width: 18, height: 18, color: "#64748B", flexShrink: 0, marginTop: 1 }} />
            }
            <span style={{ ...inter, fontSize: 14, color: dark ? (f.ok ? "#E2E8F0" : "#64748B") : (f.ok ? TEXT : MUTED) }}>{f.text}</span>
          </div>
        ))}
      </div>
      <a href={ctaHref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ display: "block", textAlign: "center", textDecoration: "none", borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 15, transition: "all 0.2s", ...inter, ...(dark ? { background: hovered ? "rgba(2,245,161,0.88)" : GREEN, color: ONYX } : { border: `1.5px solid ${GREEN}`, color: GREEN, background: hovered ? "rgba(2,245,161,0.08)" : "transparent" }) }}>
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
          <h2 style={{ ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)", color: TEXT, marginBottom: 12 }}>Des tarifs pensés pour l'Afrique</h2>
          <p style={{ ...inter, color: MUTED, fontSize: 16 }}>Commencez gratuitement, passez au Pro quand vous êtes prêt</p>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
          <PricingCard plan="Gratuit" price="0" subtitle="Pour démarrer votre activité"
            features={[
              { ok: true, text: "3 documents par mois" }, { ok: true, text: "1 template classique" },
              { ok: true, text: "Export PDF" }, { ok: true, text: "Toutes les devises africaines" },
              { ok: false, text: "Config entreprise pré-remplie" }, { ok: false, text: "Carnet de clients" },
              { ok: false, text: "Envoi par email" },
            ]}
            cta="Commencer gratuitement" ctaHref="/register" />
          <PricingCard plan="Pro" price="4 900" subtitle="Pour les professionnels actifs"
            features={[
              { ok: true, text: "Documents illimités" }, { ok: true, text: "8 templates professionnels" },
              { ok: true, text: "Config entreprise pré-remplie" }, { ok: true, text: "Carnet de clients illimité" },
              { ok: true, text: "Envoi par email" }, { ok: true, text: "Sauvegarde automatique" },
              { ok: true, text: "Support prioritaire" },
            ]}
            cta="Passer au Pro" ctaHref="/register" dark popular />
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

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < count ? GREEN : "#D1D5DB"} style={{ width: 16, height: 16 }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section style={{ background: BG, padding: "80px 24px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ ...unbounded, fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 34px)", color: TEXT, textAlign: "center", marginBottom: 52 }}>
          Ils nous font confiance
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: CARD, borderRadius: 12, padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: ONYX, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ ...unbounded, color: GREEN, fontWeight: 700, fontSize: 13 }}>
                    {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <div style={{ ...inter, fontWeight: 600, fontSize: 14, color: TEXT }}>{t.name}</div>
                  <div style={{ ...inter, fontSize: 12, color: MUTED }}>{t.role}</div>
                </div>
              </div>
              <StarRating count={t.stars} />
              <p style={{ ...inter, fontSize: 14, color: "#374151", fontStyle: "italic", lineHeight: 1.65 }}>"{t.text}"</p>
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
        <h2 style={{ ...unbounded, fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(22px, 3.5vw, 34px)", textAlign: "center", marginBottom: 48 }}>
          Questions fréquentes
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", borderLeft: isOpen ? `3px solid ${GREEN}` : "3px solid transparent", transition: "border-color 0.2s" }}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...inter, fontWeight: 600, fontSize: 15, color: "#FFFFFF" }}>{item.q}</span>
                  {isOpen
                    ? <ChevronUpIcon style={{ width: 20, height: 20, color: GREEN, flexShrink: 0, marginLeft: 16 }} />
                    : <ChevronDownIcon style={{ width: 20, height: 20, color: GREEN, flexShrink: 0, marginLeft: 16 }} />
                  }
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
      <h2 style={{ ...unbounded, fontWeight: 700, color: ONYX, fontSize: "clamp(20px, 3.5vw, 32px)", maxWidth: 600, margin: "0 auto 28px" }}>
        Prêt à professionnaliser votre facturation ?
      </h2>
      <a href="/register" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ ...inter, fontWeight: 700, fontSize: 16, color: GREEN, background: hovered ? "#0f2730" : ONYX, borderRadius: 10, padding: "14px 32px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}>
        Créer mon compte gratuitement
        <ArrowRightIcon style={{ width: 18, height: 18 }} />
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
            <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>La facturation pensée pour l'Afrique</p>
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
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>Fait avec fierté au Bénin 🇧🇯</p>
          <p style={{ ...inter, color: "#64748B", fontSize: 13 }}>© 2026 ProformaAfrica</p>
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
