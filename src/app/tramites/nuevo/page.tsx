"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Car,
  Home,
  Building2,
  FileText,
  PenLine,
  MoreHorizontal,
  Check,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";
import { TIPOS_TRAMITE } from "@/lib/data";

const TIPO_ICON: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  "Compraventa de vehículo": Car,
  "Compraventa de inmueble": Home,
  "Constitución de empresa": Building2,
  "Contrato privado": FileText,
  "Legalización de firma": PenLine,
  Otros: MoreHorizontal,
};

const STEPS = ["Tipo de trámite", "Datos de las partes", "Documentos", "Asignación"];

export default function NuevoTramite() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => {
    toast("Trámite creado correctamente", "success");
    router.push("/tramites/t1");
  };

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Trámites", href: "/tramites" }, { label: "Nuevo trámite" }]} />
      <PageHeader title="Nuevo trámite" subtitle="Crea un nuevo expediente notarial en 4 pasos" />

      {/* Stepper */}
      <div className="card p-5">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                  i < step ? "border-brand-500 bg-brand-600 text-white" : i === step ? "border-brand-400 bg-brand-500/20 text-brand-700 shadow-glow" : "border-slate-200 bg-slate-100 text-slate-500"
                }`}>
                  {i < step ? <Check size={15} /> : i + 1}
                </div>
                <span className={`hidden text-sm sm:block ${i === step ? "font-medium text-slate-900" : "text-slate-500"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`mx-3 h-0.5 flex-1 rounded ${i < step ? "bg-brand-500" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        {/* Paso 1 */}
        {step === 0 && (
          <div>
            <h3 className="mb-1 text-base font-semibold text-slate-900">¿Qué tipo de trámite deseas iniciar?</h3>
            <p className="mb-5 text-sm text-slate-600">Selecciona una categoría para precargar la plantilla legal correspondiente.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TIPOS_TRAMITE.map((t) => {
                const Icon = TIPO_ICON[t];
                const active = tipo === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      active ? "border-brand-500/50 bg-brand-500/10 shadow-glow" : "border-slate-200 bg-white/40 hover:border-slate-300"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                      <Icon size={19} />
                    </div>
                    <span className={`text-sm font-medium ${active ? "text-slate-900" : "text-slate-700"}`}>{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Paso 2 */}
        {step === 1 && (
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">Datos de las partes involucradas</h3>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-700">Comprador / Parte 1</p>
                <div className="space-y-3">
                  <div><label className="label">Nombres y apellidos</label><input className="input" placeholder="Ej. Roberto Salinas Vega" /></div>
                  <div><label className="label">DNI / RUC</label><input className="input" placeholder="41258963" /></div>
                  <div><label className="label">Teléfono</label><input className="input" placeholder="+51 987 654 321" /></div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-iris-600">Vendedor / Parte 2</p>
                <div className="space-y-3">
                  <div><label className="label">Nombres y apellidos / Razón social</label><input className="input" placeholder="Ej. AutoMax Perú S.A.C." /></div>
                  <div><label className="label">DNI / RUC</label><input className="input" placeholder="20512369874" /></div>
                  <div><label className="label">Teléfono</label><input className="input" placeholder="+51 1 712 3400" /></div>
                </div>
              </div>
              <div className="md:col-span-2"><label className="label">Descripción del bien / objeto</label><textarea className="input min-h-[80px]" placeholder="Ej. Vehículo Toyota Yaris 2022, placa ABC-123…" /></div>
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {step === 2 && (
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">Carga de documentos</h3>
            <button
              onClick={() => setFiles((f) => [...f, ["DNI escaneado.pdf", "Tarjeta de propiedad.jpg", "SOAT 2026.pdf", "Minuta.pdf"][f.length % 4]])}
              className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/50 px-6 py-10 text-center transition hover:border-brand-500/40"
            >
              <Upload size={28} className="mb-3 text-brand-600" />
              <p className="text-sm font-medium text-slate-800">Arrastra o haz clic para subir documentos</p>
              <p className="mt-1 text-xs text-slate-500">DNI, contratos, títulos, poderes · PDF, JPG, PNG (máx. 20MB)</p>
            </button>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/40 px-3 py-2.5">
                    <FileText size={16} className="text-brand-600" />
                    <span className="flex-1 text-sm text-slate-800">{f}</span>
                    <span className="chip border border-emerald-400/25 bg-emerald-500/15 text-emerald-700"><Check size={12} /> Cargado</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Paso 4 */}
        {step === 3 && (
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">Asignación y prioridad</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><label className="label">Responsable interno</label>
                <select className="input">
                  <option>Dra. Carla Mendoza</option><option>Dr. Luis Paredes</option><option>Asist. Rosa Quispe</option><option>Dra. María Fernández</option>
                </select>
              </div>
              <div><label className="label">Prioridad</label>
                <select className="input"><option>Media</option><option>Alta</option><option>Baja</option></select>
              </div>
              <div className="md:col-span-2"><label className="label">Notas internas (opcional)</label><textarea className="input min-h-[80px]" placeholder="Observaciones para el equipo…" /></div>
            </div>
            <div className="mt-5 rounded-lg border border-brand-500/20 bg-brand-500/5 p-4">
              <p className="text-sm font-medium text-slate-900">Resumen del trámite</p>
              <p className="mt-1 text-sm text-slate-600">Tipo: <span className="text-slate-800">{tipo || "—"}</span> · Documentos: <span className="text-slate-800">{files.length}</span></p>
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
          <button onClick={back} disabled={step === 0} className="btn-outline"><ArrowLeft size={15} /> Atrás</button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} disabled={step === 0 && !tipo} className="btn-primary">Continuar <ArrowRight size={15} /></button>
          ) : (
            <button onClick={submit} className="btn-primary"><Check size={15} /> Crear trámite</button>
          )}
        </div>
      </div>
    </div>
  );
}
