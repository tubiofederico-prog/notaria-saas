"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  FileSignature,
  MessageCircle,
  CheckCircle2,
  RefreshCw,
  User,
  Calendar,
  Banknote,
  FileText,
  Paperclip,
  ChevronRight,
} from "lucide-react";
import { Breadcrumbs, PageHeader, StatusBadge, PrioridadBadge, Badge, Progress, EmptyState } from "@/components/ui/Primitives";
import { BackButton } from "@/components/ui/BackButton";
import { TramiteStepper, ActivityTimeline } from "@/components/ui/Timeline";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { getTramite, getCliente, ESTADOS, EstadoTramite } from "@/lib/data";

const DOC_TONE: Record<string, "slate" | "blue" | "violet" | "emerald" | "amber" | "rose"> = {
  Recibido: "slate",
  "OCR en proceso": "blue",
  "Datos detectados": "violet",
  "Validación pendiente": "amber",
  Aprobado: "emerald",
  Observado: "rose",
};

export default function TramiteDetalleClient() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const t = getTramite(id);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estado, setEstado] = useState<EstadoTramite | undefined>(t?.estado);

  if (!t) {
    return (
      <div className="space-y-5">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Trámites", href: "/tramites" }, { label: "No encontrado" }]} />
        <EmptyState title="Trámite no encontrado" subtitle="El expediente solicitado no existe o fue archivado." action={<Link href="/tramites" className="btn-outline">Volver a trámites</Link>} />
      </div>
    );
  }

  const cliente = getCliente(t.clienteId);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <BackButton fallback="/tramites" label="Trámites" />
        <span className="text-slate-300">/</span>
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Trámites", href: "/tramites" }, { label: t.codigo }]} />
      </div>
      <PageHeader
        title={t.cliente}
        subtitle={`${t.codigo} · ${t.tipo}`}
        actions={
          <>
            <Link href="/whatsapp" className="btn-outline"><MessageCircle size={15} /> Notificar</Link>
            <Link href="/contratos" className="btn-outline"><FileSignature size={15} /> Generar contrato</Link>
            <button className="btn-primary" onClick={() => setEstadoModal(true)}><RefreshCw size={15} /> Cambiar estado</button>
          </>
        }
      />

      {/* Estado + stepper */}
      <div className="card p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusBadge estado={estado!} />
            <PrioridadBadge prioridad={t.prioridad} />
            {t.alertas > 0 && <Badge tone="rose">{t.alertas} alertas</Badge>}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            Progreso del expediente
            <span className="font-semibold text-slate-700">{t.progreso}%</span>
          </div>
        </div>
        <div className="mb-5"><Progress value={t.progreso} /></div>
        <TramiteStepper estado={estado!} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Columna izquierda: datos + documentos */}
        <div className="space-y-4 lg:col-span-2">
          {/* Datos cliente */}
          <div className="card p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900"><User size={15} className="text-brand-600" /> Datos de las partes</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Field label="Cliente" value={t.cliente} />
              <Field label="Documento" value={cliente?.documento ?? "—"} />
              {t.contraparte && <Field label="Contraparte" value={t.contraparte} />}
              {t.monto && <Field label="Monto" value={t.monto} icon={<Banknote size={13} />} />}
              <Field label="Responsable" value={t.responsable} />
              <Field label="Creado" value={t.creado} icon={<Calendar size={13} />} />
              <Field label="Actualizado" value={t.actualizado} />
              {cliente && <Field label="Teléfono" value={cliente.telefono} />}
            </div>
            {cliente && (
              <Link href={`/clientes/${cliente.id}`} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700">
                Ver perfil completo del cliente <ChevronRight size={13} />
              </Link>
            )}
          </div>

          {/* Documentos */}
          <div className="card">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Paperclip size={15} className="text-brand-600" /> Documentos asociados</h3>
              <Link href="/documentos" className="text-xs font-medium text-brand-600 hover:text-brand-700">+ Agregar</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {t.documentos.map((d) => (
                <div key={d.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><FileText size={16} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{d.nombre}</p>
                    <p className="text-[11px] text-slate-500">{d.tipo} · {d.paginas} pág · {d.peso}</p>
                  </div>
                  <Badge tone={DOC_TONE[d.estado]}>{d.estado}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: actividad + acciones */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Acciones disponibles</h3>
            <div className="space-y-2">
              <button className="btn-outline w-full justify-start" onClick={() => { toast("Validación aprobada", "success"); }}>
                <CheckCircle2 size={15} className="text-emerald-600" /> Aprobar validación
              </button>
              <Link href="/contratos" className="btn-outline w-full justify-start"><FileSignature size={15} className="text-iris-600" /> Generar contrato con IA</Link>
              <Link href="/whatsapp" className="btn-outline w-full justify-start"><MessageCircle size={15} className="text-aqua-600" /> Enviar notificación</Link>
              <button className="btn-outline w-full justify-start" onClick={() => setEstadoModal(true)}><RefreshCw size={15} className="text-brand-600" /> Cambiar estado</button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Historial de actividad</h3>
            <ActivityTimeline items={t.actividad} />
          </div>
        </div>
      </div>

      {/* Modal cambiar estado */}
      <Modal
        open={estadoModal}
        onClose={() => setEstadoModal(false)}
        title="Cambiar estado del trámite"
        subtitle={t.codigo}
        footer={
          <>
            <button className="btn-outline" onClick={() => setEstadoModal(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setEstadoModal(false); toast(`Estado actualizado a "${estado}"`, "success"); }}>Guardar cambio</button>
          </>
        }
      >
        <p className="mb-3 text-sm text-slate-600">Selecciona el nuevo estado del expediente:</p>
        <div className="space-y-1.5">
          {ESTADOS.map((e) => (
            <button
              key={e}
              onClick={() => setEstado(e)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${
                estado === e ? "border-brand-500/50 bg-brand-500/10 text-slate-900" : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <StatusBadge estado={e} />
              {estado === e && <CheckCircle2 size={16} className="text-brand-600" />}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-800">{icon}{value}</p>
    </div>
  );
}
