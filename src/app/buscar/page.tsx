"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Grid3x3, List, FileText } from "lucide-react";
import { Breadcrumbs, PageHeader, StatusBadge, PrioridadBadge, EmptyState } from "@/components/ui/Primitives";
import { ESTADOS, TIPOS_TRAMITE, TRAMITES } from "@/lib/data";

function BuscarInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const results = useMemo(
    () =>
      TRAMITES.filter(
        (t) =>
          (!q ||
            [t.cliente, t.codigo, t.tipo, t.responsable].some((f) => f.toLowerCase().includes(q.toLowerCase()))) &&
          (!estado || t.estado === estado) &&
          (!tipo || t.tipo === tipo),
      ),
    [q, estado, tipo],
  );

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Búsqueda de expedientes" }]} />
      <PageHeader title="Búsqueda de expedientes" subtitle="Busca por DNI, nombre, número de expediente, tipo, fecha o estado" />

      <div className="card p-5">
        <div className="relative mb-4">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder="DNI, nombre, EXP-2026-…, tipo de contrato…"
            className="input !py-3 pl-11 text-base"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-500" />
          <select value={estado} onChange={(e) => setEstado(e.target.value)} className="input w-auto !py-1.5 text-sm">
            <option value="">Estado</option>
            {ESTADOS.map((e) => <option key={e}>{e}</option>)}
          </select>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="input w-auto !py-1.5 text-sm">
            <option value="">Tipo de contrato</option>
            {TIPOS_TRAMITE.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input type="date" className="input w-auto !py-1.5 text-sm" />
          <div className="ml-auto flex rounded-lg border border-slate-200 p-0.5">
            <button onClick={() => setView("grid")} className={`rounded px-2 py-1.5 ${view === "grid" ? "bg-brand-600 text-white" : "text-slate-600"}`}><Grid3x3 size={15} /></button>
            <button onClick={() => setView("list")} className={`rounded px-2 py-1.5 ${view === "list" ? "bg-brand-600 text-white" : "text-slate-600"}`}><List size={15} /></button>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">{results.length} resultado(s){q && <> para “<span className="text-slate-800">{q}</span>”</>}</p>

      {results.length === 0 ? (
        <EmptyState icon={Search} title="Sin resultados" subtitle="Prueba con otro término o ajusta los filtros." />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <button key={t.id} onClick={() => router.push(`/tramites/${t.id}`)} className="card card-hover p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-brand-700">{t.codigo}</span>
                <PrioridadBadge prioridad={t.prioridad} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{t.cliente}</p>
              <p className="text-xs text-slate-500">{t.tipo}</p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-xs text-slate-500">{t.creado}</span>
                <StatusBadge estado={t.estado} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="card divide-y divide-slate-100">
          {results.map((t) => (
            <button key={t.id} onClick={() => router.push(`/tramites/${t.id}`)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50">
              <FileText size={18} className="text-brand-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{t.cliente}</p>
                <p className="font-mono text-[11px] text-slate-500">{t.codigo} · {t.tipo}</p>
              </div>
              <StatusBadge estado={t.estado} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-slate-500">Cargando búsqueda…</div>}>
      <BuscarInner />
    </Suspense>
  );
}
