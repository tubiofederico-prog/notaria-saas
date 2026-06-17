"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, Search, Download, ArrowRight, Lock } from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";
import { AUDITORIA } from "@/lib/data";

const USUARIOS = Array.from(new Set(AUDITORIA.map((a) => a.usuario)));
const ACCIONES = Array.from(new Set(AUDITORIA.map((a) => a.accion)));

export default function AuditoriaPage() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [user, setUser] = useState("");
  const [accion, setAccion] = useState("");

  const rows = useMemo(
    () =>
      AUDITORIA.filter(
        (a) =>
          (!q || a.documento.toLowerCase().includes(q.toLowerCase())) &&
          (!user || a.usuario === user) &&
          (!accion || a.accion === accion),
      ),
    [q, user, accion],
  );

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Auditoría" }]} />
      <PageHeader
        title="Auditoría y trazabilidad"
        subtitle="Registro inmutable de todas las acciones del sistema"
        actions={<button className="btn-outline" onClick={() => toast("Exportando log de auditoría…", "success")}><Download size={15} /> Exportar log</button>}
      />

      {/* Banner cumplimiento */}
      <div className="card flex items-center gap-4 border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400"><ShieldCheck size={22} /></div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Sistema en cumplimiento</p>
          <p className="text-xs text-slate-400">Trazabilidad completa · Cifrado AES-256 · Conforme a la Ley del Notariado y protección de datos personales.</p>
        </div>
        <Badge tone="emerald"><Lock size={11} /> Registro sellado</Badge>
      </div>

      {/* Filtros */}
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por documento o expediente…" className="input pl-9" />
        </div>
        <select value={user} onChange={(e) => setUser(e.target.value)} className="input lg:w-52"><option value="">Todos los usuarios</option>{USUARIOS.map((u) => <option key={u}>{u}</option>)}</select>
        <select value={accion} onChange={(e) => setAccion(e.target.value)} className="input lg:w-52"><option value="">Todas las acciones</option>{ACCIONES.map((a) => <option key={a}>{a}</option>)}</select>
        <input type="date" className="input lg:w-40" />
      </div>

      {/* Tabla de logs */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-ink-900/40 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 text-left font-medium">Fecha / hora</th>
                <th className="px-4 py-3 text-left font-medium">Usuario</th>
                <th className="px-4 py-3 text-left font-medium">Acción</th>
                <th className="px-4 py-3 text-left font-medium">Documento afectado</th>
                <th className="px-4 py-3 text-left font-medium">Cambio de estado</th>
                <th className="px-4 py-3 text-left font-medium">IP / origen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{a.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={a.usuario === "Motor IA" || a.usuario === "Sistema" ? "text-iris-400" : "text-slate-200"}>{a.usuario}</span>
                  </td>
                  <td className="px-4 py-3"><Badge tone="blue">{a.accion}</Badge></td>
                  <td className="px-4 py-3 text-slate-300">{a.documento}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="rounded bg-ink-800 px-1.5 py-0.5">{a.estadoAnterior}</span>
                      <ArrowRight size={12} className="text-slate-600" />
                      <span className="rounded bg-brand-500/15 px-1.5 py-0.5 text-brand-300">{a.estadoNuevo}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{a.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center text-xs text-slate-600">Mostrando {rows.length} de {AUDITORIA.length} eventos · Los registros de auditoría no pueden ser editados ni eliminados.</p>
    </div>
  );
}
