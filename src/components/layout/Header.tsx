"use client";

import { useState } from "react";
import { Bell, ChevronDown, Menu, Search, Check, Building2, LogOut, User, Settings } from "lucide-react";
import { NOTARIAS, NOTIFICACIONES } from "@/lib/data";
import { useCommandPalette } from "./CommandPalette";

export function Header({ onMenu }: { onMenu: () => void }) {
  const openCmd = useCommandPalette();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notariaOpen, setNotariaOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notaria, setNotaria] = useState(NOTARIAS[0]);

  const dotColor = (t: string) =>
    t === "warn" ? "bg-amber-400" : t === "ok" ? "bg-emerald-400" : "bg-brand-400";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl">
      <button onClick={onMenu} className="btn-ghost !px-2 lg:hidden">
        <Menu size={20} />
      </button>

      {/* Buscador global → abre paleta de comandos */}
      <button
        onClick={openCmd}
        className="group relative hidden w-full max-w-md flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3 py-2 text-left text-sm text-slate-500 transition hover:border-brand-500/40 hover:bg-slate-100 sm:flex"
      >
        <Search size={16} className="text-slate-500 group-hover:text-brand-600" />
        <span className="flex-1">Buscar expedientes, clientes, DNI…</span>
        <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">⌘K</kbd>
      </button>

      {/* Botón búsqueda móvil */}
      <button onClick={openCmd} className="btn-ghost !px-2 sm:hidden">
        <Search size={19} />
      </button>

      <div className="flex flex-1 items-center justify-end gap-1.5 sm:flex-none">
        {/* Selector notaría */}
        <div className="relative">
          <button
            onClick={() => { setNotariaOpen((v) => !v); setNotifOpen(false); setUserOpen(false); }}
            className="btn-outline !py-1.5 max-w-[200px]"
          >
            <Building2 size={15} className="text-brand-600 shrink-0" />
            <span className="truncate text-xs">{notaria.nombre}</span>
            <ChevronDown size={14} className="shrink-0 text-slate-500" />
          </button>
          {notariaOpen && (
            <div className="absolute right-0 mt-2 w-64 card p-1.5 animate-fade-in">
              {NOTARIAS.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setNotaria(n); setNotariaOpen(false); }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {n.nombre}
                  {n.id === notaria.id && <Check size={15} className="text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((v) => !v); setNotariaOpen(false); setUserOpen(false); }}
            className="btn-ghost relative !px-2"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 card animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Notificaciones</p>
                <span className="chip border border-brand-400/25 bg-brand-500/15 text-brand-700">{NOTIFICACIONES.length} nuevas</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICACIONES.map((n) => (
                  <div key={n.id} className="flex gap-3 border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor(n.tipo)}`} />
                    <div>
                      <p className="text-sm text-slate-800">{n.titulo}</p>
                      <p className="text-xs text-slate-500">{n.detalle}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{n.hora}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Usuario */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); setNotariaOpen(false); }}
            className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-iris-600 text-xs font-semibold text-white">
              CM
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-medium leading-none text-slate-900">Dra. Carla Mendoza</p>
              <p className="mt-1 text-[10px] text-slate-500">Administrador</p>
            </div>
            <ChevronDown size={14} className="hidden text-slate-500 md:block" />
          </button>
          {userOpen && (
            <div className="absolute right-0 mt-2 w-52 card p-1.5 animate-fade-in">
              {[
                { icon: User, label: "Mi perfil" },
                { icon: Settings, label: "Configuración" },
                { icon: LogOut, label: "Cerrar sesión" },
              ].map((it) => (
                <button key={it.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  <it.icon size={15} className="text-slate-500" />
                  {it.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
