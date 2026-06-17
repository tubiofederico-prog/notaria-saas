"use client";

import { useState } from "react";
import {
  Folder,
  FileText,
  Search,
  Eye,
  Download,
  Link2,
  Archive,
  CheckCircle2,
  ChevronRight,
  Grid3x3,
  List,
} from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

const CARPETAS = [
  { id: "f1", nombre: "Compraventa vehículos", docs: 142, color: "text-brand-400" },
  { id: "f2", nombre: "Compraventa inmuebles", docs: 98, color: "text-iris-400" },
  { id: "f3", nombre: "Constitución empresas", docs: 67, color: "text-aqua-400" },
  { id: "f4", nombre: "Legalizaciones", docs: 410, color: "text-emerald-400" },
  { id: "f5", nombre: "Poderes y cartas", docs: 53, color: "text-amber-400" },
  { id: "f6", nombre: "Archivados", docs: 1240, color: "text-slate-400" },
];

const DOCS = [
  { id: "d1", nombre: "DNI_RobertoSalinas.pdf", tipo: "DNI", cliente: "Roberto Salinas Vega", exp: "EXP-2026-00841", fecha: "12 jun 2026", verificado: true },
  { id: "d2", nombre: "Minuta_compraventa.pdf", tipo: "Contrato", cliente: "Inmobiliaria Andina S.A.", exp: "EXP-2026-00839", fecha: "10 jun 2026", verificado: true },
  { id: "d3", nombre: "Partida_registral.pdf", tipo: "Título", cliente: "Inmobiliaria Andina S.A.", exp: "EXP-2026-00839", fecha: "10 jun 2026", verificado: true },
  { id: "d4", nombre: "Estatuto_TechInnova.pdf", tipo: "Contrato", cliente: "Tech Innova E.I.R.L.", exp: "EXP-2026-00835", fecha: "08 jun 2026", verificado: false },
  { id: "d5", nombre: "Vigencia_poder.pdf", tipo: "Documento", cliente: "Constructora del Sur S.A.C.", exp: "EXP-2026-00828", fecha: "05 jun 2026", verificado: false },
  { id: "d6", nombre: "Carta_poder.pdf", tipo: "Poder", cliente: "Carmen Rojas Delgado", exp: "EXP-2026-00830", fecha: "06 jun 2026", verificado: true },
];

export default function RepositorioPage() {
  const toast = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [preview, setPreview] = useState<(typeof DOCS)[number] | null>(null);

  const rows = DOCS.filter((d) => !q || d.nombre.toLowerCase().includes(q.toLowerCase()) || d.cliente.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Repositorio digital" }]} />
      <PageHeader title="Repositorio digital" subtitle="Biblioteca centralizada de documentos y expedientes" />

      {/* Carpetas */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Carpetas</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CARPETAS.map((f) => (
            <button key={f.id} className="card card-hover flex flex-col items-start gap-2 p-4 text-left">
              <Folder size={26} className={f.color} />
              <div>
                <p className="text-sm font-medium text-slate-200">{f.nombre}</p>
                <p className="text-xs text-slate-500">{f.docs} documentos</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar documentos…" className="input pl-9" />
        </div>
        <div className="flex gap-2">
          <select className="input sm:w-40"><option>Todos los tipos</option><option>DNI</option><option>Contrato</option><option>Título</option><option>Poder</option></select>
          <select className="input sm:w-36"><option>Todos</option><option>Verificados</option><option>Pendientes</option></select>
          <div className="flex rounded-lg border border-white/10 p-0.5">
            <button onClick={() => setView("grid")} className={`rounded px-2 py-1.5 ${view === "grid" ? "bg-brand-600 text-white" : "text-slate-400"}`}><Grid3x3 size={15} /></button>
            <button onClick={() => setView("list")} className={`rounded px-2 py-1.5 ${view === "list" ? "bg-brand-600 text-white" : "text-slate-400"}`}><List size={15} /></button>
          </div>
        </div>
      </div>

      {/* Documentos */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((d) => (
            <div key={d.id} className="card card-hover p-4">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400"><FileText size={19} /></div>
                {d.verificado ? <Badge tone="emerald"><CheckCircle2 size={11} /> Verificado</Badge> : <Badge tone="amber">Pendiente</Badge>}
              </div>
              <p className="mt-3 truncate text-sm font-medium text-slate-200">{d.nombre}</p>
              <p className="text-xs text-slate-500">{d.tipo} · {d.cliente}</p>
              <p className="mt-1 font-mono text-[11px] text-slate-600">{d.exp}</p>
              <div className="mt-3 flex gap-1.5 border-t border-white/[0.06] pt-3">
                <button onClick={() => setPreview(d)} className="btn-outline flex-1 !py-1.5 text-xs"><Eye size={13} /> Ver</button>
                <button onClick={() => toast("Descargando…", "success")} className="btn-ghost !px-2"><Download size={14} /></button>
                <button onClick={() => toast("Documento archivado", "info")} className="btn-ghost !px-2"><Archive size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card divide-y divide-white/[0.04]">
          {rows.map((d) => (
            <div key={d.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03]">
              <FileText size={18} className="text-brand-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">{d.nombre}</p>
                <p className="text-xs text-slate-500">{d.tipo} · {d.cliente} · {d.exp}</p>
              </div>
              <span className="hidden text-xs text-slate-500 sm:block">{d.fecha}</span>
              {d.verificado ? <Badge tone="emerald">Verificado</Badge> : <Badge tone="amber">Pendiente</Badge>}
              <button onClick={() => setPreview(d)} className="btn-ghost !px-2"><Eye size={15} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.nombre ?? ""}
        subtitle={preview ? `${preview.tipo} · ${preview.exp}` : ""}
        size="lg"
        footer={
          <>
            <button className="btn-outline" onClick={() => { toast("Asociado a trámite", "success"); setPreview(null); }}><Link2 size={15} /> Asociar a trámite</button>
            <button className="btn-outline" onClick={() => { toast("Marcado como verificado", "success"); setPreview(null); }}><CheckCircle2 size={15} /> Verificar</button>
            <button className="btn-primary" onClick={() => toast("Descargando…", "success")}><Download size={15} /> Descargar</button>
          </>
        }
      >
        <div className="flex aspect-[1.4/1] items-center justify-center rounded-lg border border-white/[0.06] bg-gradient-to-br from-ink-800 to-ink-900">
          <div className="w-[70%] space-y-3 rounded-lg border border-white/10 bg-ink-850 p-6 shadow-card">
            <div className="h-3 w-1/2 rounded bg-ink-700" />
            <div className="space-y-2">
              {[90, 80, 95, 70, 85, 60].map((w, i) => <div key={i} className="h-2 rounded bg-ink-700" style={{ width: `${w}%` }} />)}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><ChevronRight size={13} /> Vista previa simulada del documento.</div>
      </Modal>
    </div>
  );
}
