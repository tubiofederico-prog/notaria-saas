"use client";

import {
  Archive,
  Bot,
  Fingerprint,
  Landmark,
  ShieldAlert,
  Receipt,
  Globe,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";

const MODULOS = [
  { icon: Archive, titulo: "Búsqueda avanzada en archivos históricos", desc: "Indexación y búsqueda semántica sobre archivos notariales digitalizados de años anteriores.", estado: "En desarrollo", q: "Q3 2026", tone: "blue" as const },
  { icon: Bot, titulo: "Bot cotizador de servicios notariales", desc: "Asistente conversacional que cotiza trámites automáticamente según aranceles vigentes.", estado: "Planeado", q: "Q4 2026", tone: "violet" as const },
  { icon: Fingerprint, titulo: "Verificación avanzada de firmas", desc: "Análisis biométrico y comparación de firmas mediante visión por computadora.", estado: "Investigación", q: "Q4 2026", tone: "amber" as const },
  { icon: Landmark, titulo: "Integración con registros públicos", desc: "Conexión directa con SUNARP, RENIEC y SUNAT para validación en tiempo real.", estado: "Planeado", q: "Q1 2027", tone: "violet" as const },
  { icon: ShieldAlert, titulo: "Investigación por lavado de activos", desc: "Módulo de prevención (PLAFT) con listas restrictivas y scoring de riesgo de clientes.", estado: "Planeado", q: "Q1 2027", tone: "violet" as const },
  { icon: Receipt, titulo: "Emisión de facturas electrónicas", desc: "Facturación SUNAT integrada al cierre de cada trámite notarial.", estado: "En desarrollo", q: "Q3 2026", tone: "blue" as const },
  { icon: Globe, titulo: "Portal cliente externo", desc: "Espacio web para que los clientes consulten el estado de sus trámites y firmen en línea.", estado: "En diseño", q: "Q2 2026", tone: "cyan" as const },
];

export default function RoadmapPage() {
  const toast = useToast();
  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Roadmap" }]} />
      <PageHeader title="Roadmap de producto" subtitle="Próximas funcionalidades en construcción para Lexnota" />

      <div className="card flex flex-col items-start gap-4 overflow-hidden bg-gradient-to-br from-brand-600/15 to-iris-600/10 p-6 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-iris-600 shadow-glow"><Sparkles size={24} className="text-white" /></div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">El futuro de la notaría digital</h3>
          <p className="mt-1 text-sm text-slate-300">Estamos construyendo la suite notarial más completa del Perú. Vota por las funcionalidades que más te interesan.</p>
        </div>
        <button className="btn-primary" onClick={() => toast("¡Gracias! Registramos tu interés.", "success")}>Sugerir funcionalidad</button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MODULOS.map((m) => (
          <div key={m.titulo} className="card card-hover flex flex-col p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-800 text-brand-400"><m.icon size={21} /></div>
              <Badge tone={m.tone}>{m.estado}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-white">{m.titulo}</h3>
            <p className="mt-1.5 flex-1 text-sm text-slate-400">{m.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <span className="text-xs text-slate-500">Estimado · {m.q}</span>
              <button onClick={() => toast("Te avisaremos cuando esté disponible", "info")} className="text-xs font-medium text-brand-400 hover:text-brand-300">Notificarme →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
