"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Building2, User, UserPlus } from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { CLIENTES } from "@/lib/data";

export default function ClientesPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const rows = CLIENTES.filter((c) => !q || c.nombre.toLowerCase().includes(q.toLowerCase()) || c.documento.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Clientes" }]} />
      <PageHeader title="Seguimiento de clientes" subtitle={`${CLIENTES.length} clientes registrados`} actions={<button className="btn-primary"><UserPlus size={16} /> Nuevo cliente</button>} />

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o documento…" className="input pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <button key={c.id} onClick={() => router.push(`/clientes/${c.id}`)} className="card card-hover p-5 text-left">
            <div className="flex items-start gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${c.tipo === "Persona jurídica" ? "bg-iris-500/10 text-iris-400" : "bg-brand-500/10 text-brand-400"}`}>
                {c.tipo === "Persona jurídica" ? <Building2 size={20} /> : <User size={20} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{c.nombre}</p>
                <p className="text-xs text-slate-500">{c.documento}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <span className="text-xs text-slate-400">Cliente desde {c.desde}</span>
              {c.tramitesActivos > 0 ? <Badge tone="blue">{c.tramitesActivos} activo(s)</Badge> : <Badge tone="slate">Sin activos</Badge>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
