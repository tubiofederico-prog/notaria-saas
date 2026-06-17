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
    brand: "text-brand-400 bg-brand-500/10",
    violet: "text-iris-400 bg-iris-500/10",
    cyan: "text-aqua-400 bg-aqua-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
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
              down ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
