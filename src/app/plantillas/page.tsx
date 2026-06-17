"use client";

import { useState } from "react";
import { LayoutTemplate, Plus, Edit3, Copy, FileText } from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { PLANTILLAS, Plantilla } from "@/lib/data";

const CATS = Array.from(new Set(PLANTILLAS.map((p) => p.categoria)));

export default function PlantillasPage() {
  const toast = useToast();
  const [cat, setCat] = useState("");
  const [edit, setEdit] = useState<Plantilla | null>(null);
  const [crear, setCrear] = useState(false);

  const rows = PLANTILLAS.filter((p) => !cat || p.categoria === cat);

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Plantillas legales" }]} />
      <PageHeader
        title="Gestión de plantillas legales"
        subtitle={`${PLANTILLAS.length} plantillas · ${CATS.length} categorías`}
        actions={<button className="btn-primary" onClick={() => setCrear(true)}><Plus size={16} /> Nueva plantilla</button>}
      />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCat("")} className={`chip border ${!cat ? "border-brand-400/40 bg-brand-500/15 text-brand-700" : "border-slate-200 text-slate-600 hover:text-slate-800"}`}>Todas</button>
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`chip border ${cat === c ? "border-brand-400/40 bg-brand-500/15 text-brand-700" : "border-slate-200 text-slate-600 hover:text-slate-800"}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((p) => (
          <div key={p.id} className="card card-hover flex flex-col p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600"><LayoutTemplate size={19} /></div>
              <Badge tone={p.activa ? "emerald" : "slate"}>{p.activa ? "Activa" : "Inactiva"}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{p.nombre}</h3>
            <p className="mt-0.5 text-xs text-slate-500">{p.categoria} · {p.usos} usos · {p.actualizada}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.variables.slice(0, 3).map((v) => (
                <span key={v} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-iris-600">{v}</span>
              ))}
              {p.variables.length > 3 && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">+{p.variables.length - 3}</span>}
            </div>
            <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
              <button className="btn-outline flex-1 !py-1.5 text-xs" onClick={() => setEdit(p)}><Edit3 size={13} /> Editar</button>
              <button className="btn-ghost !px-2" onClick={() => toast("Plantilla duplicada", "success")}><Copy size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal edición */}
      <Modal
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.nombre ?? ""}
        subtitle="Edición visual de plantilla"
        size="lg"
        footer={
          <>
            <button className="btn-outline" onClick={() => setEdit(null)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setEdit(null); toast("Plantilla guardada", "success"); }}>Guardar cambios</button>
          </>
        }
      >
        {edit && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Nombre</label><input className="input" defaultValue={edit.nombre} /></div>
              <div><label className="label">Categoría</label>
                <select className="input" defaultValue={edit.categoria}>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
            </div>
            <div>
              <label className="label">Variables dinámicas</label>
              <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-white/40 p-3">
                {edit.variables.map((v) => (
                  <span key={v} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-iris-600">{v}</span>
                ))}
                <button className="rounded-md border border-dashed border-slate-300 px-2 py-1 text-[11px] text-slate-500 hover:text-slate-700"><Plus size={11} className="inline" /> variable</button>
              </div>
            </div>
            <div>
              <label className="label">Contenido de la plantilla</label>
              <textarea className="input min-h-[200px] font-mono text-xs" defaultValue={`Conste por el presente documento el contrato que celebran ${edit.variables[0] ?? "{{parte_1}}"}, identificado con ${edit.variables[1] ?? "{{dni}}"}...\n\nPRIMERA: OBJETO\n...\n\nFecha: ${"{{fecha}}"}`} />
            </div>
          </div>
        )}
      </Modal>

      {/* Modal crear */}
      <Modal
        open={crear}
        onClose={() => setCrear(false)}
        title="Nueva plantilla legal"
        subtitle="Crea una plantilla reutilizable con variables dinámicas"
        footer={
          <>
            <button className="btn-outline" onClick={() => setCrear(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setCrear(false); toast("Plantilla creada", "success"); }}><FileText size={15} /> Crear plantilla</button>
          </>
        }
      >
        <div className="space-y-4">
          <div><label className="label">Nombre de la plantilla</label><input className="input" placeholder="Ej. Contrato de mutuo" /></div>
          <div><label className="label">Categoría</label>
            <select className="input"><option>Selecciona…</option>{CATS.map((c) => <option key={c}>{c}</option>)}<option>Nueva categoría…</option></select>
          </div>
          <div><label className="label">Contenido inicial</label><textarea className="input min-h-[140px] font-mono text-xs" placeholder="Escribe el texto base. Usa {{variable}} para campos dinámicos." /></div>
        </div>
      </Modal>
    </div>
  );
}
