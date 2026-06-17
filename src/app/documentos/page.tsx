"use client";

import { useState } from "react";
import {
  Upload,
  FileText,
  ScanText,
  Check,
  Loader2,
  Eye,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";

const PIPELINE = [
  { key: "recibido", label: "Documento recibido", icon: FileText },
  { key: "ocr", label: "OCR en proceso", icon: ScanText },
  { key: "datos", label: "Datos detectados", icon: Sparkles },
  { key: "validacion", label: "Validación pendiente", icon: Eye },
  { key: "aprobado", label: "Documento aprobado", icon: CheckCircle2 },
];

const EXTRAIDO = [
  { campo: "Nombre completo", valor: "Roberto Salinas Vega", conf: 99 },
  { campo: "DNI", valor: "41258963", conf: 98 },
  { campo: "Fecha de emisión", valor: "12/03/2021", conf: 95 },
  { campo: "Fecha de caducidad", valor: "12/03/2031", conf: 96 },
  { campo: "Dirección", valor: "Av. Javier Prado 1234, San Isidro", conf: 88 },
  { campo: "Número de documento", valor: "DOC-2026-00841-A", conf: 100 },
];

const VEHICULO = [
  { campo: "Placa", valor: "ABC-123", conf: 97 },
  { campo: "Marca / Modelo", valor: "Toyota Yaris", conf: 94 },
  { campo: "Año", valor: "2022", conf: 99 },
  { campo: "N° de motor", valor: "2NZ-X123456", conf: 91 },
];

export default function DocumentosPage() {
  const toast = useToast();
  const [stage, setStage] = useState(0); // índice en PIPELINE
  const [processing, setProcessing] = useState(false);
  const [hasDoc, setHasDoc] = useState(true);

  const runOCR = () => {
    setProcessing(true);
    setStage(0);
    let i = 0;
    const tick = () => {
      i++;
      setStage(i);
      if (i < PIPELINE.length - 1) setTimeout(tick, 900);
      else { setProcessing(false); toast("Documento procesado y datos extraídos", "success"); }
    };
    setTimeout(tick, 800);
  };

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Carga & Digitalización" }]} />
      <PageHeader
        title="Carga y digitalización de documentos"
        subtitle="Sube documentos y deja que el motor OCR extraiga los datos automáticamente"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Drag & drop + pipeline + preview */}
        <div className="space-y-4 lg:col-span-2">
          <div
            onClick={() => { setHasDoc(true); runOCR(); }}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-brand-400 hover:bg-brand-50"
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10"><Upload size={26} className="text-brand-600" /></div>
            <p className="text-sm font-medium text-slate-800">Arrastra documentos o haz clic para cargar</p>
            <p className="mt-1 text-xs text-slate-500">DNI · contratos · escrituras · títulos · poderes · documentos vehiculares</p>
            <button className="btn-primary mt-4"><Upload size={15} /> Seleccionar archivos</button>
          </div>

          {hasDoc && (
            <>
              {/* Pipeline OCR */}
              <div className="card p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Proceso de digitalización</h3>
                  <button onClick={runOCR} disabled={processing} className="btn-outline !py-1.5 text-xs">
                    {processing ? <><Loader2 size={13} className="animate-spin" /> Procesando…</> : <><ScanText size={13} /> Re-procesar</>}
                  </button>
                </div>
                <div className="space-y-3">
                  {PIPELINE.map((p, i) => {
                    const done = i < stage;
                    const current = i === stage;
                    return (
                      <div key={p.key} className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                          done ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600" : current ? "border-brand-400 bg-brand-500/15 text-brand-700" : "border-slate-200 bg-slate-100 text-slate-500"
                        }`}>
                          {done ? <Check size={16} /> : processing && current ? <Loader2 size={16} className="animate-spin" /> : <p.icon size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${done || current ? "text-slate-800" : "text-slate-500"}`}>{p.label}</p>
                        </div>
                        {done && <Badge tone="emerald">Completado</Badge>}
                        {current && processing && <Badge tone="blue">En curso</Badge>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preview documental */}
              <div className="card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Eye size={15} className="text-brand-600" /> Vista previa</h3>
                  <span className="text-xs text-slate-500">DNI_RobertoSalinas.pdf · 1 pág</span>
                </div>
                <div className="flex aspect-[1.6/1] items-center justify-center rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50">
                  <div className="w-[80%] rounded-lg border border-slate-200 bg-white p-5 shadow-card">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">República del Perú</p>
                        <p className="text-sm font-semibold text-slate-800">Documento Nacional de Identidad</p>
                      </div>
                      <div className="h-12 w-10 rounded bg-slate-200" />
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="h-2 w-2/3 rounded bg-slate-200" />
                      <div className="h-2 w-1/2 rounded bg-slate-200" />
                      <div className="h-2 w-3/4 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Panel lateral: datos extraídos */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900"><Sparkles size={15} className="text-iris-600" /> Datos extraídos por IA</h3>
            <p className="mb-4 text-xs text-slate-500">Campos detectados automáticamente del documento.</p>
            <div className="space-y-3">
              {EXTRAIDO.map((d) => (
                <ExtractRow key={d.campo} {...d} />
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Datos del vehículo</h3>
            <div className="space-y-3">
              {VEHICULO.map((d) => (
                <ExtractRow key={d.campo} {...d} />
              ))}
            </div>
          </div>

          <button className="btn-primary w-full" onClick={() => toast("Documento aprobado y asociado al expediente", "success")}>
            <CheckCircle2 size={16} /> Aprobar y asociar a trámite
          </button>
        </div>
      </div>
    </div>
  );
}

function ExtractRow({ campo, valor, conf }: { campo: string; valor: string; conf: number }) {
  const tone = conf >= 95 ? "text-emerald-600" : conf >= 88 ? "text-amber-600" : "text-rose-600";
  return (
    <div className="rounded-lg border border-slate-200 bg-white/40 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{campo}</p>
        <span className={`text-[10px] font-semibold ${tone}`}>{conf}%</span>
      </div>
      <p className="mt-1 text-sm text-slate-800">{valor}</p>
    </div>
  );
}
