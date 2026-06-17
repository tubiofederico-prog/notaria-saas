"use client";

import { useState } from "react";
import {
  FileSignature,
  Sparkles,
  Loader2,
  Car,
  Home,
  Building2,
  Users,
  PenLine,
  FileText,
  Download,
  Send,
  RefreshCw,
  Check,
} from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

const PLANTILLAS = [
  { id: "veh", nombre: "Compraventa de vehículo", icon: Car },
  { id: "inm", nombre: "Compraventa de inmueble", icon: Home },
  { id: "emp", nombre: "Constitución de empresa", icon: Building2 },
  { id: "soc", nombre: "Constitución de sociedad", icon: Users },
  { id: "fir", nombre: "Legalización de firma", icon: PenLine },
  { id: "per", nombre: "Contrato personalizado", icon: FileText },
];

const CONTRATO_TEXTO = `MINUTA DE COMPRAVENTA DE VEHÍCULO

Conste por el presente documento la compraventa de vehículo automotor que celebran:

DE UNA PARTE: AUTOMAX PERÚ S.A.C., con RUC N° 20512369874, debidamente representada por su gerente general, a quien en adelante se denominará EL VENDEDOR.

DE LA OTRA PARTE: ROBERTO SALINAS VEGA, identificado con DNI N° 41258963, con domicilio en Av. Javier Prado 1234, San Isidro, Lima, a quien en adelante se denominará EL COMPRADOR.

PRIMERA: ANTECEDENTES
EL VENDEDOR es legítimo propietario del vehículo de placa ABC-123, marca Toyota, modelo Yaris, año 2022, con número de motor 2NZ-X123456.

SEGUNDA: OBJETO
Por el presente contrato, EL VENDEDOR transfiere en venta real y enajenación perpetua a favor de EL COMPRADOR la propiedad del vehículo descrito en la cláusula precedente.

TERCERA: PRECIO Y FORMA DE PAGO
El precio pactado de la compraventa asciende a la suma de S/ 48,500.00 (cuarenta y ocho mil quinientos con 00/100 soles), que EL COMPRADOR cancela al contado a la firma del presente documento.

CUARTA: ENTREGA
EL VENDEDOR hace entrega del vehículo en este acto, con todos sus documentos en regla, libre de gravámenes y cargas.

QUINTA: GASTOS NOTARIALES
Los gastos notariales y de transferencia serán asumidos por EL COMPRADOR.

En señal de conformidad, las partes suscriben el presente documento en la ciudad de Lima, a los 17 días del mes de junio de 2026.`;

type Stage = "select" | "form" | "generating" | "editor";

export default function ContratosPage() {
  const toast = useToast();
  const [stage, setStage] = useState<Stage>("select");
  const [plantilla, setPlantilla] = useState(PLANTILLAS[0]);
  const [texto, setTexto] = useState(CONTRATO_TEXTO);
  const [sendModal, setSendModal] = useState(false);

  const generate = () => {
    setStage("generating");
    setTimeout(() => { setStage("editor"); toast("Contrato generado con IA", "success"); }, 2200);
  };

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Generar contrato" }]} />
      <PageHeader
        title="Generación automática de contratos"
        subtitle="Crea contratos con IA a partir de plantillas y datos extraídos"
        actions={stage !== "select" && <button onClick={() => setStage("select")} className="btn-outline">Cambiar plantilla</button>}
      />

      {/* Paso 1: seleccionar plantilla */}
      {stage === "select" && (
        <div className="card p-6">
          <h3 className="mb-1 text-base font-semibold text-white">Selecciona una plantilla</h3>
          <p className="mb-5 text-sm text-slate-400">El contrato se generará con los datos del expediente vinculado.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLANTILLAS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPlantilla(p); setStage("form"); }}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-900/40 p-4 text-left transition hover:border-brand-500/40 hover:bg-ink-800"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-800 text-slate-400 group-hover:bg-brand-600 group-hover:text-white">
                  <p.icon size={19} />
                </div>
                <span className="text-sm font-medium text-slate-200">{p.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 2: formulario precargado */}
      {stage === "form" && (
        <div className="card p-6">
          <div className="mb-5 flex items-center gap-2">
            <plantilla.icon size={18} className="text-brand-400" />
            <h3 className="text-base font-semibold text-white">{plantilla.nombre}</h3>
            <Badge tone="violet"><Sparkles size={11} /> Datos precargados</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Nombre del comprador", "Roberto Salinas Vega"],
              ["DNI del comprador", "41258963"],
              ["Nombre del vendedor", "AutoMax Perú S.A.C."],
              ["RUC del vendedor", "20512369874"],
              ["Descripción del bien", "Toyota Yaris 2022, placa ABC-123"],
              ["Monto (S/)", "48,500.00"],
            ].map(([label, val]) => (
              <div key={label}>
                <label className="label">{label}</label>
                <input className="input" defaultValue={val} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-white/[0.06] pt-5">
            <button className="btn-outline" onClick={() => setStage("select")}>Atrás</button>
            <button className="btn-primary" onClick={generate}><Sparkles size={16} /> Generar contrato con IA</button>
          </div>
        </div>
      )}

      {/* Generando */}
      {stage === "generating" && (
        <div className="card flex flex-col items-center justify-center py-20">
          <div className="relative mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-iris-600 shadow-glow">
              <Sparkles size={28} className="text-white" />
            </div>
            <Loader2 size={84} className="absolute -inset-2.5 animate-spin text-brand-500/30" />
          </div>
          <p className="text-base font-semibold text-white">Generando contrato con IA…</p>
          <p className="mt-1 text-sm text-slate-400">Redactando cláusulas y validando datos del expediente</p>
        </div>
      )}

      {/* Paso 3: editor visual */}
      {stage === "editor" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="card overflow-hidden lg:col-span-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileSignature size={16} className="text-brand-400" />
                <h3 className="text-sm font-semibold text-white">Editor de contrato</h3>
                <Badge tone="emerald"><Check size={11} /> Generado</Badge>
              </div>
              <span className="text-xs text-slate-500">{texto.length} caracteres</span>
            </div>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="h-[560px] w-full resize-none bg-ink-900/40 p-6 font-mono text-[13px] leading-relaxed text-slate-200 outline-none"
            />
          </div>

          <div className="space-y-4">
            <div className="card p-4">
              <h4 className="mb-3 text-sm font-semibold text-white">Acciones IA</h4>
              <div className="space-y-2">
                <button className="btn-outline w-full justify-start" onClick={() => toast("Cláusula regenerada por IA", "success")}><RefreshCw size={14} className="text-iris-400" /> Regenerar cláusula</button>
                <button className="btn-outline w-full justify-start" onClick={() => toast("Datos reemplazados desde el expediente", "info")}><Sparkles size={14} className="text-brand-400" /> Reemplazar datos</button>
              </div>
            </div>
            <div className="card p-4">
              <h4 className="mb-3 text-sm font-semibold text-white">Documento</h4>
              <div className="space-y-2">
                <button className="btn-outline w-full justify-start" onClick={() => toast("Descargando contrato.pdf…", "success")}><Download size={14} /> Descargar PDF</button>
                <button className="btn-primary w-full justify-start" onClick={() => setSendModal(true)}><Send size={14} /> Enviar a firma</button>
              </div>
            </div>
            <div className="card p-4">
              <h4 className="mb-3 text-sm font-semibold text-white">Variables detectadas</h4>
              <div className="flex flex-wrap gap-1.5">
                {["{{nombre_comprador}}", "{{dni_comprador}}", "{{nombre_vendedor}}", "{{datos_bien}}", "{{monto}}", "{{fecha}}"].map((v) => (
                  <span key={v} className="rounded-md bg-ink-800 px-2 py-1 font-mono text-[10px] text-iris-400">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={sendModal}
        onClose={() => setSendModal(false)}
        title="Enviar contrato a firma"
        subtitle="El cliente recibirá un enlace de firma digital"
        footer={
          <>
            <button className="btn-outline" onClick={() => setSendModal(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setSendModal(false); toast("Contrato enviado a firma digital", "success"); }}><Send size={15} /> Enviar</button>
          </>
        }
      >
        <label className="label">Firmantes</label>
        <div className="mb-4 space-y-2">
          {["Roberto Salinas Vega — rsalinas@gmail.com", "AutoMax Perú S.A.C. — legal@automax.pe"].map((f) => (
            <div key={f} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-ink-900/40 px-3 py-2.5 text-sm text-slate-200">
              <PenLine size={14} className="text-brand-400" /> {f}
            </div>
          ))}
        </div>
        <label className="label">Canal de envío</label>
        <select className="input"><option>WhatsApp + Correo electrónico</option><option>Solo correo</option><option>Solo WhatsApp</option></select>
      </Modal>
    </div>
  );
}
