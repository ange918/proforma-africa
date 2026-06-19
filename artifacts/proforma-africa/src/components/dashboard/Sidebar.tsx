import { useLocation, Link } from "wouter";

const GREEN = "#02F5A1";

interface SidebarProps { open: boolean; onClose: () => void; }

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ICONS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  doc: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  clip: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  file: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  wrench: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  card: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
};

const GROUPS = [
  { label: "GÉNÉRAL", items: [{ icon: ICONS.home, label: "Tableau de bord", href: "/dashboard" }] },
  { label: "DOCUMENTS", items: [
    { icon: ICONS.doc, label: "Factures", href: "/dashboard/factures" },
    { icon: ICONS.clip, label: "Devis", href: "/dashboard/devis" },
    { icon: ICONS.file, label: "Proformas", href: "/dashboard/proformas" },
  ]},
  { label: "GESTION", items: [
    { icon: ICONS.users, label: "Clients", href: "/dashboard/clients" },
    { icon: ICONS.wrench, label: "Services", href: "/dashboard/services" },
  ]},
];

const BOTTOM = [
  { icon: ICONS.cog, label: "Paramètres", href: "/dashboard/parametres" },
  { icon: ICONS.card, label: "Abonnement", href: "/dashboard/abonnement" },
];

function NavItem({ icon, label, href, active }: { icon: string; label: string; href: string; active: boolean }) {
  return (
    <Link href={href}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "9px 16px", borderRadius: 8, cursor: "pointer",
        marginBottom: 2, transition: "all 0.15s",
        color: active ? GREEN : "#94A3B8",
        background: active ? "rgba(2,245,161,0.1)" : "transparent",
        borderLeft: `3px solid ${active ? GREEN : "transparent"}`,
        fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: active ? 600 : 400,
      }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
        <Icon d={icon} />
        {label}
      </div>
    </Link>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      <div className={`db-sidebar-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`db-sidebar ${open ? "open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "24px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <Link href="/">
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>
              <span style={{ color: "#FFFFFF" }}>Proforma</span>
              <span style={{ color: GREEN }}>Africa</span>
            </span>
          </Link>
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
          {GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#4B5563", letterSpacing: "0.08em", padding: "0 16px", marginBottom: 4 }}>
                {group.label}
              </p>
              {group.items.map(item => (
                <NavItem key={item.href} {...item} active={location === item.href} />
              ))}
            </div>
          ))}
        </nav>

        {/* Bottom items */}
        <div style={{ padding: "8px 10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {BOTTOM.map(item => (
            <NavItem key={item.href} {...item} active={location === item.href} />
          ))}
        </div>
      </aside>
    </>
  );
}
