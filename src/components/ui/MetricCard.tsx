import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "brand",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  tone?: "brand" | "violet" | "cyan" | "emerald" | "amber";
}) {
  const tones: Record<string, string> = {
    brand: "text-brand-600 bg-brand-50",
    violet: "text-indigo-600 bg-indigo-50",
    cyan: "text-sky-600 bg-sky-50",
    emerald: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50",
  };
  const down = delta?.startsWith("-") && !delta.includes("-0");
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon size={20} />
        </div>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              down ? "text-rose-600" : "text-emerald-600"
            }`}
          >
            {down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}
