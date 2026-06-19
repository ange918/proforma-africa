import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const GREEN = "#02F5A1"; const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const ub: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };

interface Client { id: string; nom: string; entreprise: string; email: string; telephone: string; ville: string; pays: string; }
interface ModalProps { onClose: () => void; onSaved: (c: Client) => void; initial?: Client | null; }

function ClientModal({ onClose, onSaved, initial }: ModalProps) {
  const { user } = useAuth();
  const [form, setForm] = useState({ nom: initial?.nom || "", entreprise: initial?.entreprise || "", email: initial?.email || "", telephone: initial?.telephone || "", ville: initial?.ville || "", pays: initial?.pays || "" });
  const [saving, setSaving] = useState(false);
  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (initial) {
      const { data } = await supabase.from("clients").update(form).eq("id", initial.id).select().single();
      if (data) onSaved(data);
    } else {
      const { data } = await supabase.from("clients").insert({ ...form, user_id: user!.id }).select().single();
      if (data) onSaved(data);
    }
    setSaving(false);
    onClose();
  };

  const iStyle: React.CSSProperties = { ...inter, fontSize: 14, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 28, width: "100%", maxWidth: 480 }}>
        <h2 style={{ ...ub, fontSize: 16, fontWeight: 700, color: "#0A0F0D", marginBottom: 20 }}>{initial ? "Modifier" : "Nouveau"} client</h2>
        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Nom *</label><input required value={form.nom} onChange={up("nom")} style={iStyle} /></div>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Entreprise</label><input value={form.entreprise} onChange={up("entreprise")} style={iStyle} /></div>
          </div>
          <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Email</label><input type="email" value={form.email} onChange={up("email")} style={iStyle} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Téléphone</label><input value={form.telephone} onChange={up("telephone")} style={iStyle} /></div>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Ville</label><input value={form.ville} onChange={up("ville")} style={iStyle} /></div>
          </div>
          <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Pays</label><input value={form.pays} onChange={up("pays")} style={iStyle} /></div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{ ...inter, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer", color: "#374151" }}>Annuler</button>
            <button type="submit" disabled={saving} style={{ ...inter, fontSize: 14, fontWeight: 700, padding: "10px 20px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>{saving ? "Enregistrement…" : "Enregistrer"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardClients() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"new" | Client | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("clients").select("*").eq("user_id", user.id).order("nom")
      .then(({ data }) => { setClients(data || []); setLoading(false); });
  }, [user]);

  const filtered = clients.filter(c => !search || c.nom.toLowerCase().includes(search.toLowerCase()) || (c.entreprise || "").toLowerCase().includes(search.toLowerCase()));

  const handleSaved = (saved: Client) => {
    setClients(prev => {
      const idx = prev.findIndex(c => c.id === saved.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
  };

  const deleteClient = async (id: string) => {
    if (!confirm("Supprimer ce client ?")) return;
    await supabase.from("clients").delete().eq("id", id);
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const initials = (nom: string) => nom.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total clients", val: String(clients.length), color: "#6366F1" },
          { label: "Villes différentes", val: String(new Set(clients.map(c => c.ville).filter(Boolean)).size), color: "#F59E0B" },
          { label: "Pays différents", val: String(new Set(clients.map(c => c.pays).filter(Boolean)).size), color: GREEN },
        ].map(s => (
          <div key={s.label} style={{ background: "#FFF", borderRadius: 12, padding: "16px 20px", border: "1px solid #E5E7EB" }}>
            <p style={{ ...inter, fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{s.label}</p>
            <p style={{ ...ub, fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client…"
            style={{ ...inter, fontSize: 13, padding: "8px 12px 8px 32px", borderRadius: 8, border: "1.5px solid #E5E7EB", outline: "none", background: "#FFF", width: 220 }} />
        </div>
        <button onClick={() => setModal("new")} style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
          Nouveau Client
        </button>
      </div>

      {loading ? <div style={{ padding: 40, textAlign: "center", ...inter, color: "#9CA3AF" }}>Chargement…</div>
        : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB" }}>
            <p style={{ ...inter, color: "#9CA3AF", fontSize: 14, marginBottom: 12 }}>Aucun client trouvé.</p>
            <button onClick={() => setModal("new")} style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>+ Ajouter un client</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map(c => (
              <div key={c.id} style={{ background: "#FFF", borderRadius: 14, padding: 20, border: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: ONYX, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...ub, fontSize: 14, fontWeight: 700, color: GREEN }}>
                    {initials(c.nom)}
                  </div>
                  <div>
                    <p style={{ ...inter, fontWeight: 700, fontSize: 15, color: "#0A0F0D", marginBottom: 2 }}>{c.nom}</p>
                    {c.entreprise && <p style={{ ...inter, fontSize: 12, color: "#6B7280" }}>{c.entreprise}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                  {c.email && <p style={{ ...inter, fontSize: 13, color: "#374151" }}>✉ {c.email}</p>}
                  {c.telephone && <p style={{ ...inter, fontSize: 13, color: "#374151" }}>📱 {c.telephone}</p>}
                  {(c.ville || c.pays) && <p style={{ ...inter, fontSize: 13, color: "#374151" }}>📍 {[c.ville, c.pays].filter(Boolean).join(", ")}</p>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal(c)} style={{ ...inter, fontSize: 12, flex: 1, padding: "7px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", color: "#374151", fontWeight: 500 }}>Modifier</button>
                  <button onClick={() => deleteClient(c.id)} style={{ ...inter, fontSize: 12, padding: "7px 12px", borderRadius: 8, border: "1px solid #FEE2E2", background: "#FEF2F2", cursor: "pointer", color: "#EF4444" }}>Suppr.</button>
                </div>
              </div>
            ))}
          </div>
        )}

      {modal && (
        <ClientModal
          onClose={() => setModal(null)}
          onSaved={handleSaved}
          initial={modal === "new" ? null : modal as Client}
        />
      )}
    </div>
  );
}
