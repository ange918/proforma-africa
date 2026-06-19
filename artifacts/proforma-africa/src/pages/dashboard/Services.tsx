import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const GREEN = "#02F5A1"; const ONYX = "#07191E";
const inter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const ub: React.CSSProperties = { fontFamily: "'Unbounded', sans-serif" };

interface Service { id: string; nom: string; description: string; prix: number; unite: string; tva: number; }
interface ModalProps { onClose: () => void; onSaved: (s: Service) => void; initial?: Service | null; }

function ServiceModal({ onClose, onSaved, initial }: ModalProps) {
  const { user } = useAuth();
  const [form, setForm] = useState({ nom: initial?.nom || "", description: initial?.description || "", prix: String(initial?.prix || ""), unite: initial?.unite || "heure", tva: String(initial?.tva || "0") });
  const [saving, setSaving] = useState(false);
  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const iStyle: React.CSSProperties = { ...inter, fontSize: 14, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", outline: "none", width: "100%", boxSizing: "border-box" };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, prix: parseFloat(form.prix) || 0, tva: parseFloat(form.tva) || 0 };
    if (initial) {
      const { data } = await supabase.from("services").update(payload).eq("id", initial.id).select().single();
      if (data) onSaved(data);
    } else {
      const { data } = await supabase.from("services").insert({ ...payload, user_id: user!.id }).select().single();
      if (data) onSaved(data);
    }
    setSaving(false);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#FFF", borderRadius: 16, padding: 28, width: "100%", maxWidth: 460 }}>
        <h2 style={{ ...ub, fontSize: 16, fontWeight: 700, color: "#0A0F0D", marginBottom: 20 }}>{initial ? "Modifier" : "Nouveau"} service</h2>
        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Nom *</label><input required value={form.nom} onChange={up("nom")} style={iStyle} /></div>
          <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Description</label><textarea value={form.description} onChange={up("description")} rows={2} style={{ ...iStyle, resize: "vertical" as const }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Prix *</label><input required type="number" step="0.01" value={form.prix} onChange={up("prix")} style={iStyle} /></div>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Unité</label>
              <select value={form.unite} onChange={up("unite")} style={{ ...iStyle }}>
                {["heure", "jour", "forfait", "unité", "mois"].map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div><label style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>TVA %</label><input type="number" step="0.1" value={form.tva} onChange={up("tva")} style={iStyle} /></div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{ ...inter, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", cursor: "pointer", color: "#374151" }}>Annuler</button>
            <button type="submit" disabled={saving} style={{ ...inter, fontSize: 14, fontWeight: 700, padding: "10px 20px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>{saving ? "Enreg…" : "Enregistrer"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardServices() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"new" | Service | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("services").select("*").eq("user_id", user.id).order("nom")
      .then(({ data }) => { setServices(data || []); setLoading(false); });
  }, [user]);

  const handleSaved = (saved: Service) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === saved.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
  };

  const deleteService = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    await supabase.from("services").delete().eq("id", id);
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button onClick={() => setModal("new")} style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
          Nouveau Service
        </button>
      </div>

      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        {loading ? <div style={{ padding: 32, textAlign: "center", ...inter, color: "#9CA3AF" }}>Chargement…</div>
          : services.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <p style={{ ...inter, color: "#9CA3AF", fontSize: 14, marginBottom: 12 }}>Aucun service enregistré.</p>
              <button onClick={() => setModal("new")} style={{ ...inter, fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8, background: GREEN, color: ONYX, border: "none", cursor: "pointer" }}>+ Ajouter un service</button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#F9FAFB" }}>
                  {["Nom", "Description", "Prix", "Unité", "TVA", "Actions"].map(h => (
                    <th key={h} style={{ ...inter, fontSize: 12, fontWeight: 600, color: "#6B7280", padding: "10px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAFAFA"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{s.nom}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#6B7280", padding: "12px 16px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.description}</td>
                      <td style={{ ...inter, fontSize: 13, fontWeight: 600, color: "#0A0F0D", padding: "12px 16px" }}>{fmt(s.prix)}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{s.unite}</td>
                      <td style={{ ...inter, fontSize: 13, color: "#374151", padding: "12px 16px" }}>{s.tva}%</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setModal(s)} style={{ ...inter, fontSize: 12, color: "#374151", background: "#F3F4F6", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Modifier</button>
                          <button onClick={() => deleteService(s.id)} style={{ ...inter, fontSize: 12, color: "#EF4444", background: "#FEF2F2", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {modal && (
        <ServiceModal
          onClose={() => setModal(null)}
          onSaved={handleSaved}
          initial={modal === "new" ? null : modal as Service}
        />
      )}
    </div>
  );
}
