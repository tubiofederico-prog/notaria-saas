"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FolderKanban,
  FileWarning,
  FileSignature,
  MessageCircle,
  Clock,
  FilePlus2,
  Upload,
  Search,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { EstadoBarChart, TramitesAreaChart } from "@/components/ui/Charts";
import { StatusBadge, PrioridadBadge, PageHeader } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { METRICAS, TRAMITES, TRAMITES_POR_ESTADO, TRAMITES_POR_MES, ALERTAS_DOCS } from "@/lib/data";

export default function Dashboard() {
  const router = useRouter();
  const toast = useToast();
  const [uploadOpen, setUploadOpen] = useState(false);

  const quickActions = [
    { label: "Nuevo trámite", icon: FilePlus2, tone: "from-brand-500 to-brand-700", onClick: () => router.push("/tramites/nuevo") },
    { label: "Subir documento", icon: Upload, tone: "from-iris-500 to-iris-600", onClick: () => setUploadOpen(true) },
    { label: "Generar contrato", icon: FileSignature, tone: "from-aqua-500 to-aqua-600", onClick: () => router.push("/contratos") },
    { label: "Buscar expediente", icon: Search, tone: "from-emerald-500 to-emerald-600", onClick: () => router.push("/buscar") },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard general"
        subtitle="Vista consolidada de la operación notarial · Notaría Lexnota — Lima Centro"
        actions={
          <Link href="/tramites/nuevo" className="btn-primary">
            <FilePlus2 size={16} /> Nuevo trámite
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Trámites activos" value={METRICAS.tramitesActivos} delta={METRICAS.tramitesActivosDelta} icon={FolderKanban} tone="brand" />
        <MetricCard label="Docs. pendientes de revisión" value={METRICAS.docsPendientes} delta={METRICAS.docsPendientesDelta} icon={FileWarning} tone="amber" />
        <MetricCard label="Contratos generados por IA" value={METRICAS.contratosIA} delta={METRICAS.contratosIADelta} icon={FileSignature} tone="violet" />
        <MetricCard label="Clientes notificados (WhatsApp)" value={METRICAS.clientesNotificados} delta={METRICAS.clientesNotificadosDelta} icon={MessageCircle} tone="cyan" />
        <MetricCard label="Tiempo prom. de procesamiento" value={METRICAS.tiempoPromedio} delta={METRICAS.tiempoPromedioDelta} icon={Clock} tone="emerald" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickActions.map((a) => (
          <button key={a.label} onClick={a.onClick} className="card card-hover group flex items-center gap-3 p-4 text-left">
            <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${a.tone} shadow-glow`}>
              <a.icon size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{a.label}</p>
              <p className="text-xs text-slate-500">Acción rápida</p>
            </div>
            <ArrowRight size={16} className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-400" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="card p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Evolución de trámites</h3>
              <p className="text-xs text-slate-500">Trámites recibidos vs. contratos generados</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-brand-500" />Trámites</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-iris-500" />Contratos</span>
            </div>
          </div>
          <TramitesAreaChart data={TRAMITES_POR_MES} />
        </div>
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-1 text-sm font-semibold text-white">Trámites por estado</h3>
          <p className="mb-4 text-xs text-slate-500">Distribución actual del pipeline</p>
          <EstadoBarChart data={TRAMITES_POR_ESTADO} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Últimos expedientes</h3>
            <Link href="/tramites" className="text-xs font-medium text-brand-400 hover:text-brand-300">Ver todos →</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {TRAMITES.slice(0, 6).map((t) => (
              <Link key={t.id} href={`/tramites/${t.id}`} className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/[0.03]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-200">{t.cliente}</p>
                  <p className="truncate text-xs text-slate-500">{t.codigo} · {t.tipo}</p>
                </div>
                <PrioridadBadge prioridad={t.prioridad} />
                <StatusBadge estado={t.estado} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <AlertTriangle size={15} className="text-amber-400" /> Documentos incompletos
            </h3>
            <span className="chip border border-amber-400/25 bg-amber-500/15 text-amber-300">{ALERTAS_DOCS.length}</span>
          </div>
          <div className="space-y-2 p-3">
            {ALERTAS_DOCS.map((a) => (
              <Link
                key={a.id}
                href="/motor-ia"
                className={`block rounded-lg border p-3 transition hover:bg-white/[0.03] ${
                  a.nivel === "alto" ? "border-rose-500/20 bg-rose-500/5" : "border-amber-500/20 bg-amber-500/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-200">{a.expediente}</p>
                  <span className={`h-1.5 w-1.5 rounded-full ${a.nivel === "alto" ? "bg-rose-400" : "bg-amber-400"}`} />
                </div>
                <p className="mt-1 text-xs text-slate-400">{a.motivo}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Subir documento rápido"
        subtitle="Arrastra un archivo para iniciar la digitalización con OCR"
        footer={
          <>
            <button className="btn-outline" onClick={() => setUploadOpen(false)}>Cancelar</button>
            <button
              className="btn-primary"
              onClick={() => { setUploadOpen(false); toast("Documento enviado al motor OCR", "success"); router.push("/documentos"); }}
            >
              Iniciar digitalización
            </button>
          </>
        }
      >
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-ink-900/50 px-6 py-10 text-center">
          <Upload size={28} className="mb-3 text-brand-400" />
          <p className="text-sm font-medium text-slate-200">Arrastra documentos aquí</p>
          <p className="mt-1 text-xs text-slate-500">DNI, contratos, escrituras, títulos, poderes · PDF, JPG, PNG</p>
          <button className="btn-outline mt-4">Seleccionar archivos</button>
        </div>
      </Modal>
    </div>
  );
}
