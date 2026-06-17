"use client";

import { useState } from "react";
import { Users, Shield, Building2, ListChecks, Tag, Plus, Check, X, Edit3 } from "lucide-react";
import { Breadcrumbs, PageHeader, Badge } from "@/components/ui/Primitives";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { USUARIOS, Usuario, ROLES, MODULOS, PERMISOS_MATRIZ, ESTADOS, TIPOS_TRAMITE } from "@/lib/data";

const TABS = [
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "permisos", label: "Roles y permisos", icon: Shield },
  { id: "notaria", label: "Configuración", icon: Building2 },
  { id: "estados", label: "Estados", icon: ListChecks },
  { id: "tipos", label: "Tipos de trámite", icon: Tag },
];

export default function AdminPage() {
  const toast = useToast();
  const [tab, setTab] = useState("usuarios");
  const [nuevoUsuario, setNuevoUsuario] = useState(false);

  const cols: Column<Usuario>[] = [
    {
      key: "nombre",
      header: "Usuario",
      render: (u) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-iris-600 text-[10px] font-semibold text-white">
            {u.nombre.split(" ").slice(0, 2).map((x) => x[0]).join("")}
          </div>
          <div><p className="font-medium text-slate-200">{u.nombre}</p><p className="text-[11px] text-slate-500">{u.email}</p></div>
        </div>
      ),
    },
    { key: "rol", header: "Rol", render: (u) => <Badge tone="blue">{u.rol}</Badge> },
    { key: "estado", header: "Estado", render: (u) => <Badge tone={u.estado === "Activo" ? "emerald" : "slate"}>{u.estado}</Badge> },
    { key: "ultimoAcceso", header: "Último acceso", render: (u) => <span className="text-slate-400">{u.ultimoAcceso}</span> },
    { key: "acc", header: "", render: () => <button className="btn-ghost !px-2"><Edit3 size={14} /></button> },
  ];

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Administración" }]} />
      <PageHeader title="Panel administrativo" subtitle="Gestión de usuarios, roles y configuración de la notaría" />

      <div className="flex flex-wrap gap-1.5 border-b border-white/[0.06]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-medium transition ${tab === t.id ? "border-brand-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {/* Usuarios */}
      {tab === "usuarios" && (
        <div className="space-y-4">
          <div className="flex justify-end"><button className="btn-primary" onClick={() => setNuevoUsuario(true)}><Plus size={16} /> Nuevo usuario</button></div>
          <DataTable columns={cols} rows={USUARIOS} />
        </div>
      )}

      {/* Permisos */}
      {tab === "permisos" && (
        <div className="card overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Matriz de permisos por rol</h3>
            <p className="text-xs text-slate-500">Define el acceso de cada rol a los módulos del sistema.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-ink-900/40">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Módulo</th>
                  {ROLES.map((r) => <th key={r} className="px-3 py-3 text-center text-[11px] font-medium text-slate-400">{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {MODULOS.map((m) => (
                  <tr key={m} className="border-b border-white/[0.04] last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-300">{m}</td>
                    {ROLES.map((r) => (
                      <td key={r} className="px-3 py-3 text-center">
                        {PERMISOS_MATRIZ[r][m] ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-500/15 text-emerald-400"><Check size={13} /></span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-ink-800 text-slate-600"><X size={13} /></span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Configuración notaría */}
      {tab === "notaria" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Datos de la notaría</h3>
            <div className="space-y-3">
              <div><label className="label">Razón social</label><input className="input" defaultValue="Notaría Lexnota — Lima Centro" /></div>
              <div><label className="label">Notario titular</label><input className="input" defaultValue="Dra. Carla Mendoza Ríos" /></div>
              <div><label className="label">RUC</label><input className="input" defaultValue="20512300011" /></div>
              <div><label className="label">Dirección</label><input className="input" defaultValue="Jr. de la Unión 350, Cercado de Lima" /></div>
            </div>
            <button className="btn-primary mt-4" onClick={() => toast("Configuración guardada", "success")}>Guardar</button>
          </div>
          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Preferencias del sistema</h3>
            <div className="space-y-3">
              {[
                ["Validación automática con IA", true],
                ["Notificaciones por WhatsApp", true],
                ["OCR automático al cargar documentos", true],
                ["Requerir revisión humana en montos > S/ 100k", true],
                ["Archivado automático tras finalizar", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-ink-900/40 px-3 py-2.5">
                  <span className="text-sm text-slate-300">{label}</span>
                  <Toggle defaultOn={on as boolean} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estados */}
      {tab === "estados" && (
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Estados de trámite</h3>
            <button className="btn-outline !py-1.5 text-xs" onClick={() => toast("Estado agregado", "success")}><Plus size={13} /> Agregar estado</button>
          </div>
          <div className="space-y-2">
            {ESTADOS.map((e, i) => (
              <div key={e} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-900/40 px-3 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-ink-800 text-xs font-semibold text-slate-400">{i + 1}</span>
                <span className="flex-1 text-sm text-slate-200">{e}</span>
                <Badge tone="blue">Activo</Badge>
                <button className="btn-ghost !px-2"><Edit3 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tipos */}
      {tab === "tipos" && (
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Tipos de trámite</h3>
            <button className="btn-outline !py-1.5 text-xs" onClick={() => toast("Tipo agregado", "success")}><Plus size={13} /> Agregar tipo</button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TIPOS_TRAMITE.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-900/40 px-3 py-2.5">
                <Tag size={15} className="text-brand-400" />
                <span className="flex-1 text-sm text-slate-200">{t}</span>
                <button className="btn-ghost !px-2"><Edit3 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={nuevoUsuario}
        onClose={() => setNuevoUsuario(false)}
        title="Nuevo usuario interno"
        footer={
          <>
            <button className="btn-outline" onClick={() => setNuevoUsuario(false)}>Cancelar</button>
            <button className="btn-primary" onClick={() => { setNuevoUsuario(false); toast("Usuario creado e invitado", "success"); }}>Crear usuario</button>
          </>
        }
      >
        <div className="space-y-4">
          <div><label className="label">Nombre completo</label><input className="input" placeholder="Ej. Ana Torres" /></div>
          <div><label className="label">Correo</label><input className="input" placeholder="atorres@lexnota.pe" /></div>
          <div><label className="label">Rol</label><select className="input">{ROLES.map((r) => <option key={r}>{r}</option>)}</select></div>
        </div>
      </Modal>
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn((v) => !v)} className={`relative h-5 w-9 rounded-full transition ${on ? "bg-brand-600" : "bg-ink-700"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${on ? "left-4" : "left-0.5"}`} />
    </button>
  );
}
