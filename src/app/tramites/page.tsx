"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FilePlus2, Search, SlidersHorizontal } from "lucide-react";
import { Breadcrumbs, PageHeader, StatusBadge, PrioridadBadge, EmptyState } from "@/components/ui/Primitives";
import { DataTable, Column } from "@/components/ui/DataTable";
import { ESTADOS, TIPOS_TRAMITE, TRAMITES, Tramite } from "@/lib/data";

const RESP = Array.from(new Set(TRAMITES.map((t) => t.responsable)));

export default function TramitesPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [resp, setResp] = useState("");

  const rows = useMemo(
    () =>
      TRAMITES.filter(
        (t) =>
          (!q || t.cliente.toLowerCase().includes(q.toLowerCase()) || t.codigo.toLowerCase().includes(q.toLowerCase())) &&
          (!estado || t.estado === estado) &&
          (!tipo || t.tipo === tipo) &&
          (!resp || t.responsable === resp),
      ),
    [q, estado, tipo, resp],
  );

  const cols: Column<Tramite>[] = [
    {
      key: "codigo",
      header: "Expediente",
      render: (t) => (
        <div>
          <p className="font-mono text-xs text-brand-700">{t.codigo}</p>
          <p className="text-[11px] text-slate-500">{t.creado}</p>
        </div>
      ),
    },
    {
      key: "cliente",
      header: "Cliente",
      render: (t) => (
        <div>
          <p className="font-medium text-slate-800">{t.cliente}</p>
          {t.contraparte && <p className="text-[11px] text-slate-500">↔ {t.contraparte}</p>}
        </div>
      ),
    },
    { key: "tipo", header: "Tipo", render: (t) => <span className="text-slate-700">{t.tipo}</span> },
    { key: "responsable", header: "Responsable", render: (t) => <span className="text-slate-600">{t.responsable}</span> },
    { key: "prioridad", header: "Prioridad", render: (t) => <PrioridadBadge prioridad={t.prioridad} /> },
    { key: "estado", header: "Estado", render: (t) => <StatusBadge estado={t.estado} /> },
  ];

  const clear = () => { setQ(""); setEstado(""); setTipo(""); setResp(""); };

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Trámites" }]} />
      <PageHeader
        title="Gestión de trámites"
        subtitle={`${rows.length} de ${TRAMITES.length} expedientes`}
        actions={
          <Link href="/tramites/nuevo" className="btn-primary">
            <FilePlus2 size={16} /> Nuevo trámite
          </Link>
        }
      />

      {/* Filtros */}
      <div className="card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por cliente o código…" className="input pl-9" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
            <select value={estado} onChange={(e) => setEstado(e.target.value)} className="input lg:w-44">
              <option value="">Todos los estados</option>
              {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="input lg:w-48">
              <option value="">Todos los tipos</option>
              {TIPOS_TRAMITE.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={resp} onChange={(e) => setResp(e.target.value)} className="input lg:w-48">
              <option value="">Todos los responsables</option>
              {RESP.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={clear} className="btn-outline">
              <SlidersHorizontal size={15} /> Limpiar
            </button>
          </div>
        </div>
      </div>

      <DataTable
        columns={cols}
        rows={rows}
        onRowClick={(t) => router.push(`/tramites/${t.id}`)}
        empty={<EmptyState title="Sin resultados" subtitle="No hay trámites que coincidan con los filtros aplicados." action={<button onClick={clear} className="btn-outline">Limpiar filtros</button>} />}
      />
    </div>
  );
}
