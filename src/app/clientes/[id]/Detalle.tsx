"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  MessageCircle,
  FileText,
  Copy,
} from "lucide-react";
import { Breadcrumbs, PageHeader, StatusBadge, EmptyState } from "@/components/ui/Primitives";
import { BackButton } from "@/components/ui/BackButton";
import { useToast } from "@/components/ui/Toast";
import { getCliente, TRAMITES } from "@/lib/data";

export default function ClienteDetalleClient() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const c = getCliente(id);

  if (!c) {
    return (
      <div className="space-y-5">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Clientes", href: "/clientes" }, { label: "No encontrado" }]} />
        <EmptyState title="Cliente no encontrado" action={<Link href="/clientes" className="btn-outline">Volver</Link>} />
      </div>
    );
  }

  const tramites = TRAMITES.filter((t) => t.clienteId === c.id);
  const notificaciones = [
    { id: "1", canal: "WhatsApp", texto: "Documento recibido para EXP-839", fecha: "16 jun", estado: "leído" },
    { id: "2", canal: "WhatsApp", texto: "Contrato listo para firma", fecha: "16 jun", estado: "entregado" },
    { id: "3", canal: "Correo", texto: "Resumen de trámite mensual", fecha: "10 jun", estado: "enviado" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <BackButton fallback="/clientes" label="Clientes" />
        <span className="text-slate-700">/</span>
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Clientes", href: "/clientes" }, { label: c.nombre }]} />
      </div>
      <PageHeader
        title={c.nombre}
        subtitle={c.tipo}
        actions={<Link href="/whatsapp" className="btn-primary"><MessageCircle size={16} /> Notificar por WhatsApp</Link>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Perfil */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.tipo === "Persona jurídica" ? "bg-iris-500/10 text-iris-400" : "bg-brand-500/10 text-brand-400"}`}>
                {c.tipo === "Persona jurídica" ? <Building2 size={22} /> : <User size={22} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{c.documento}</p>
                <p className="text-xs text-slate-500">Cliente desde {c.desde}</p>
              </div>
            </div>
            <div className="space-y-3 border-t border-white/[0.06] pt-4">
              <Row icon={<Mail size={14} />} text={c.email} />
              <Row icon={<Phone size={14} />} text={c.telefono} />
              <Row icon={<MapPin size={14} />} text={c.direccion} />
            </div>
          </div>

          {/* Código seguimiento */}
          <div className="card p-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"><Hash size={15} className="text-aqua-400" /> Código de seguimiento</h4>
            <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-ink-900/40 px-3 py-2.5">
              <span className="font-mono text-base font-semibold text-aqua-400">{c.codigoSeguimiento}</span>
              <button onClick={() => toast("Código copiado", "success")} className="btn-ghost !px-2"><Copy size={15} /></button>
            </div>
            <p className="mt-2 text-xs text-slate-500">El cliente puede consultar el estado de su trámite con este código.</p>
          </div>

          {/* Notificaciones */}
          <div className="card p-5">
            <h4 className="mb-3 text-sm font-semibold text-white">Notificaciones enviadas</h4>
            <div className="space-y-2.5">
              {notificaciones.map((n) => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-ink-800 text-slate-400">
                    {n.canal === "WhatsApp" ? <MessageCircle size={13} /> : <Mail size={13} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-200">{n.texto}</p>
                    <p className="text-[10px] text-slate-500">{n.canal} · {n.fecha} · {n.estado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trámites */}
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Trámites activos" value={c.tramitesActivos} />
            <Stat label="Total histórico" value={c.tramitesTotal} />
            <Stat label="Documentos" value={c.tramitesTotal * 3} />
          </div>

          <div className="card">
            <div className="border-b border-white/[0.06] px-5 py-4"><h3 className="text-sm font-semibold text-white">Trámites asociados</h3></div>
            {tramites.length === 0 ? (
              <div className="p-5"><EmptyState title="Sin trámites" subtitle="Este cliente aún no tiene expedientes registrados." /></div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {tramites.map((t) => (
                  <Link key={t.id} href={`/tramites/${t.id}`} className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/[0.03]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 text-slate-400"><FileText size={16} /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">{t.tipo}</p>
                      <p className="font-mono text-[11px] text-slate-500">{t.codigo}</p>
                    </div>
                    <StatusBadge estado={t.estado} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-2.5 text-sm text-slate-300"><span className="text-slate-500">{icon}</span>{text}</div>;
}
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}
