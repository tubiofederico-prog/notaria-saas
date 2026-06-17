import { ESTADOS, EstadoTramite, ESTADO_META } from "@/lib/data";
import { Check } from "lucide-react";

// Timeline de pasos del trámite (horizontal stepper de estados)
export function TramiteStepper({ estado }: { estado: EstadoTramite }) {
  const current = ESTADO_META[estado].step;
  return (
    <div className="flex items-center">
      {ESTADOS.map((e, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={e} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition ${
                  done
                    ? "border-brand-500 bg-brand-600 text-white"
                    : active
                    ? "border-brand-400 bg-brand-500/20 text-brand-300 shadow-glow"
                    : "border-white/10 bg-ink-800 text-slate-500"
                }`}
              >
                {done ? <Check size={14} /> : step}
              </div>
              <span className={`mt-2 max-w-[72px] text-center text-[10px] leading-tight ${active ? "text-brand-300" : "text-slate-500"}`}>
                {e}
              </span>
            </div>
            {step < ESTADOS.length && (
              <div className={`mx-1 h-0.5 flex-1 rounded ${done ? "bg-brand-500" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Timeline vertical de actividad
export function ActivityTimeline({
  items,
}: {
  items: { id: string; usuario: string; accion: string; detalle: string; fecha: string }[];
}) {
  return (
    <ol className="relative space-y-5 border-l border-white/[0.08] pl-5">
      {items.map((it) => (
        <li key={it.id} className="relative">
          <span className="absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full border-2 border-ink-850 bg-brand-500" />
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-200">{it.accion}</p>
            <span className="shrink-0 text-xs text-slate-500">{it.fecha}</span>
          </div>
          <p className="text-sm text-slate-400">{it.detalle}</p>
          <p className="mt-0.5 text-xs text-slate-500">por {it.usuario}</p>
        </li>
      ))}
    </ol>
  );
}
