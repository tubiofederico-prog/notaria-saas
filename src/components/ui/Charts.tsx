"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  fontSize: 12,
  color: "#0f172a",
  boxShadow: "0 8px 24px -8px rgba(15,23,42,0.15)",
};

export function EstadoBarChart({ data }: { data: { estado: string; cantidad: number }[] }) {
  const colors = ["#94a3b8", "#2563eb", "#f59e0b", "#6366f1", "#0ea5e9", "#10b981", "#059669"];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis dataKey="estado" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} angle={0} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(37,99,235,0.05)" }} />
        <Bar dataKey="cantidad" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TramitesAreaChart({ data }: { data: { mes: string; tramites: number; contratos: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
        <XAxis dataKey="mes" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#cbd5e1" }} />
        <Area type="monotone" dataKey="tramites" stroke="#2563eb" strokeWidth={2.5} fill="url(#g1)" />
        <Area type="monotone" dataKey="contratos" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#g2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MiniLine({ data }: { data: { v: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke="#4f6fff" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
