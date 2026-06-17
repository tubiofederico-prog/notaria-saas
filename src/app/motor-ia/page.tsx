"use client";

import { useState } from "react";
import {
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

interface DocAnalisis {
  id: string;
  doc: string;
  expediente: string;
  tipo: string;
  score: number;
  alertas: { tipo: string; nivel: "alto" | "medio" | "bajo" }[];
  comparacion: { campo: string; extraido: string; manual: string; match: boolean }[];
}

const DOCS: DocAnalisis[] = [
  {
    id: "1",
    doc: "DNI Vendedor",
    expediente: "EXP-2026-00841",
    tipo: "DNI",
    score: 72,
    alertas: [
      { tipo: "Nombre no coincide con el registrado manualmente", nivel: "alto" },
      { tipo: "Firma pendiente de validación", nivel: "medio" },
    ],
    comparacion: [
      { campo: "Nombre", extraido: "Maria Lopez Garcia", manual: "María López G.", match: false },
      { campo: "DNI", extraido: "09887654", manual: "09887654", match: true },
      { campo: "Fecha emisión", extraido: "05/01/2020", manual: "05/01/2020", match: true },
    ],
  },
  {
    id: "2",
    doc: "Vigencia de poder",
    expediente: "EXP-2026-00828",
    tipo: "Documento",
    score: 41,
    alertas: [
      { tipo: "Documento vencido", nivel: "alto" },
      { tipo: "Campo requerido faltante: representante legal", nivel: "alto" },
    ],
    comparacion: [
      { campo: "Vigencia hasta", extraido: "10/05/2026", manual: "—", match: false },
      { campo: "Razón social", extraido: "Constructora del Sur SAC", manual: "Constructora del Sur S.A.C.", match: true },
    ],
  },
  {
    id: "3",
    doc: "Estatuto",
    expediente: "EXP-2026-00835",
    tipo: "Contrato",
    score: 86,
    alertas: [{ tipo: "Firma del titular pendiente", nivel: "medio" }],
    comparacion: [
      { campo: "Razón social", extraido: "Tech Innova EIRL", manual: "Tech Innova E.I.R.L.", match: true },
      { campo: "Capital social", extraido: "S/ 12,000", manual: "S/ 12,000", match: true },
    ],
  },
  {
    id: "4",
    doc: "DNI Comprador",
    expediente: "EXP-2026-00841",
    tipo: "DNI",
    score: 99,
    alertas: [],
    comparacion: [
      { campo: "Nombre", extraido: "Roberto Salinas Vega", manual: "Roberto Salinas Vega", match: true },
      { campo: "DNI", extraido: "41258963", manual: "41258963", match: true },
    ],
  },
];

const NIVEL_TONE = { alto: "rose", medio: "amber", bajo: "slate" } as const;

export default function MotorIA() {
  const toast = useToast();
  const [sel, setSel] = useState<DocAnalisis>(DOCS[0]);
  const [revisionModal, setRevisionModal] = useState(false);

  const scoreTone = (s: number) => (s >= 85 ? "text-emerald-600" : s >= 60 ? "text-amber-600" : "text-rose-600");
  const totalAlertas = DOCS.reduce((a, d) => a + d.alertas.length, 0);

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Motor IA" }]} />
      <PageHeader
        title="Centro de inteligencia documental"
        subtitle="Validación automática y comparación de datos mediante IA"
        actions={<Badge tone="rose"><AlertTriangle size={12} /> {totalAlertas} alertas activas</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Lista de docs analizados */}
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-900">Documentos analizados</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {DOCS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSel(d)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${sel.id === d.id ? "bg-brand-500/10" : "hover:bg-slate-50"}`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${d.score >= 85 ? "bg-emerald-500/15 text-emerald-600" : d.score >= 60 ? "bg-amber-500/15 text-amber-600" : "bg-rose-500/15 text-rose-600"}`}>
                  <BrainCircuit size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{d.doc}</p>
                  <p className="truncate text-[11px] text-slate-500">{d.expediente}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${scoreTone(d.score)}`}>{d.score}%</p>
                  {d.alertas.length > 0 && <p className="text-[10px] text-rose-600">{d.alertas.length} alerta(s)</p>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detalle del análisis */}
        <div className="space-y-4 lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{sel.doc}</h3>
                <p className="text-sm text-slate-600">{sel.expediente} · {sel.tipo}</p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${scoreTone(sel.score)}`}>{sel.score}%</p>
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Confianza IA</p>
              </div>
            </div>
          </div>

          {/* Alertas */}
          {sel.alertas.length > 0 ? (
            <div className="card p-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><AlertTriangle size={15} className="text-amber-600" /> Alertas detectadas</h4>
              <div className="space-y-2">
                {sel.alertas.map((a, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-lg border p-3 ${a.nivel === "alto" ? "border-rose-500/20 bg-rose-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
                    <AlertTriangle size={15} className={a.nivel === "alto" ? "text-rose-600" : "text-amber-600"} />
                    <span className="flex-1 text-sm text-slate-800">{a.tipo}</span>
                    <Badge tone={NIVEL_TONE[a.nivel]}>{a.nivel}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card flex items-center gap-3 p-5">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <p className="text-sm text-slate-800">Sin alertas. El documento pasó todas las validaciones automáticas.</p>
            </div>
          )}

          {/* Comparación */}
          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-3.5">
              <h4 className="text-sm font-semibold text-slate-900">Comparación: IA vs. datos ingresados</h4>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-white/40 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2.5 text-left font-medium">Campo</th>
                  <th className="px-5 py-2.5 text-left font-medium">Extraído por IA</th>
                  <th className="px-5 py-2.5 text-left font-medium">Ingresado manual</th>
                  <th className="px-5 py-2.5 text-center font-medium">Match</th>
                </tr>
              </thead>
              <tbody>
                {sel.comparacion.map((c, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-3 text-slate-600">{c.campo}</td>
                    <td className="px-5 py-3 text-slate-800">{c.extraido}</td>
                    <td className="px-5 py-3 text-slate-800">{c.manual}</td>
                    <td className="px-5 py-3 text-center">
                      {c.match ? <CheckCircle2 size={16} className="mx-auto text-emerald-600" /> : <XCircle size={16} className="mx-auto text-rose-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary" onClick={() => toast("Validación aprobada", "success")}><CheckCircle2 size={16} /> Aprobar validación</button>
            <button className="btn-outline" onClick={() => toast("Solicitud de corrección enviada al cliente", "info")}><AlertTriangle size={15} /> Solicitar corrección</button>
            <button className="btn-outline" onClick={() => setRevisionModal(true)}><UserCheck size={15} /> Enviar a revisión humana</button>
          </div>
        </div>
      </div>

      <Modal
        open={revisionModal}
        onClose={() => setRevisionModal(false)}
        title="Enviar a revisión humana"
        subtitle={`${sel.doc} · ${sel.expediente}`}
        footer={
          <>
            <button className="btn-outline" onClick={() => setRevisionModal(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setRevisionModal(false); toast("Documento asignado a revisión humana", "success"); }}>Asignar revisor</button>
          </>
        }
      >
        <label className="label">Asignar a</label>
        <select className="input mb-4"><option>Jorge Salazar — Revisor documental</option><option>Dr. Luis Paredes — Abogado</option></select>
        <label className="label">Comentario</label>
        <textarea className="input min-h-[90px]" placeholder="Indica el motivo de la revisión manual…" defaultValue="La IA detectó discrepancia en el nombre. Requiere validación humana." />
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><ArrowRight size={13} /> Se notificará al revisor por correo interno.</div>
      </Modal>
    </div>
  );
}
