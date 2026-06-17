import Link from "next/link";
import { ESTADO_META, EstadoTramite } from "@/lib/data";
import { ChevronRight, Inbox, Home } from "lucide-react";

// ---------- Badge de estado de trámite ----------
export function StatusBadge({ estado }: { estado: EstadoTramite }) {
  const m = ESTADO_META[estado];
  return (
    <span className={`chip border ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {estado}
    </span>
  );
}

// ---------- Badge genérico ----------
export function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "blue" | "violet" | "cyan" | "emerald" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-brand-50 text-brand-700 border-brand-200",
    violet: "bg-indigo-50 text-indigo-700 border-indigo-200",
    cyan: "bg-sky-50 text-sky-700 border-sky-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return <span className={`chip border ${tones[tone]}`}>{children}</span>;
}

export function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const map: Record<string, "rose" | "amber" | "slate"> = { Alta: "rose", Media: "amber", Baja: "slate" };
  return <Badge tone={map[prioridad]}>{prioridad}</Badge>;
}

// ---------- Breadcrumbs ----------
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((it, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {it.href && !isLast ? (
              <Link
                href={it.href}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {isFirst && <Home size={14} />}
                {it.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-1.5 py-1 font-medium text-slate-900">
                {isFirst && <Home size={14} />}
                {it.label}
              </span>
            )}
            {!isLast && <ChevronRight size={14} className="text-slate-400" />}
          </span>
        );
      })}
    </nav>
  );
}

// ---------- Page header ----------
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// ---------- Empty state ----------
export function EmptyState({
  icon: Icon = Inbox,
  title,
  subtitle,
  action,
}: {
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/40 px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon size={22} />
      </div>
      <h3 className="text-sm font-medium text-slate-800">{title}</h3>
      {subtitle && <p className="mt-1 max-w-sm text-sm text-slate-500">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ---------- Skeleton loader ----------
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-slate-100 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

// ---------- Spinner ----------
export function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-slate-200 border-t-brand-600"
      style={{ width: size, height: size }}
    />
  );
}

// ---------- Progress bar ----------
export function Progress({ value, tone = "brand" }: { value: number; tone?: "brand" | "emerald" | "amber" }) {
  const colors = { brand: "from-brand-500 to-iris-500", emerald: "from-emerald-500 to-aqua-500", amber: "from-amber-500 to-orange-500" };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full rounded-full bg-gradient-to-r ${colors[tone]} transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}
