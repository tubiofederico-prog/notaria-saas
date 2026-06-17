"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  FilePlus2,
  Upload,
  FileSignature,
  FolderKanban,
  Users,
  FileText,
  LayoutTemplate,
  Hash,
} from "lucide-react";
import { NAV } from "./nav";
import { TRAMITES, CLIENTES, PLANTILLAS } from "@/lib/data";

interface Cmd {
  id: string;
  label: string;
  sub?: string;
  group: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  keywords?: string;
  run: (r: ReturnType<typeof useRouter>) => void;
}

const CtxOpen = createContext<() => void>(() => {});
export const useCommandPalette = () => useContext(CtxOpen);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openPalette = useCallback(() => setOpen(true), []);

  // Comandos disponibles
  const commands = useMemo<Cmd[]>(() => {
    const navCmds: Cmd[] = NAV.flatMap((g) =>
      g.items.map((it) => ({
        id: `nav-${it.href}`,
        label: it.label,
        sub: g.title,
        group: "Ir a",
        icon: it.icon,
        keywords: `${it.label} ${g.title}`,
        run: (r) => r.push(it.href),
      })),
    );

    const actions: Cmd[] = [
      { id: "a-nuevo", label: "Nuevo trámite", sub: "Crear expediente", group: "Acciones rápidas", icon: FilePlus2, keywords: "crear nuevo tramite expediente", run: (r) => r.push("/tramites/nuevo") },
      { id: "a-subir", label: "Subir documento", sub: "Digitalizar con OCR", group: "Acciones rápidas", icon: Upload, keywords: "subir cargar documento ocr", run: (r) => r.push("/documentos") },
      { id: "a-contrato", label: "Generar contrato con IA", sub: "Desde plantilla", group: "Acciones rápidas", icon: FileSignature, keywords: "generar contrato ia plantilla", run: (r) => r.push("/contratos") },
      { id: "a-buscar", label: "Buscar expedientes", sub: "Búsqueda avanzada", group: "Acciones rápidas", icon: FolderKanban, keywords: "buscar expediente", run: (r) => r.push("/buscar") },
    ];

    const tramiteCmds: Cmd[] = TRAMITES.map((t) => ({
      id: `t-${t.id}`,
      label: t.cliente,
      sub: `${t.codigo} · ${t.tipo}`,
      group: "Trámites",
      icon: FileText,
      keywords: `${t.cliente} ${t.codigo} ${t.tipo} ${t.estado}`,
      run: (r) => r.push(`/tramites/${t.id}`),
    }));

    const clienteCmds: Cmd[] = CLIENTES.map((c) => ({
      id: `c-${c.id}`,
      label: c.nombre,
      sub: `${c.documento} · ${c.codigoSeguimiento}`,
      group: "Clientes",
      icon: Users,
      keywords: `${c.nombre} ${c.documento} ${c.codigoSeguimiento}`,
      run: (r) => r.push(`/clientes/${c.id}`),
    }));

    const plantillaCmds: Cmd[] = PLANTILLAS.map((p) => ({
      id: `p-${p.id}`,
      label: p.nombre,
      sub: `Plantilla · ${p.categoria}`,
      group: "Plantillas",
      icon: LayoutTemplate,
      keywords: `${p.nombre} ${p.categoria} plantilla`,
      run: (r) => r.push("/plantillas"),
    }));

    return [...actions, ...navCmds, ...tramiteCmds, ...clienteCmds, ...plantillaCmds];
  }, []);

  // Filtrado
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return commands.filter((c) => c.group === "Acciones rápidas" || c.group === "Ir a");
    return commands.filter((c) => (c.keywords ?? c.label).toLowerCase().includes(term)).slice(0, 24);
  }, [q, commands]);

  // Agrupar preservando orden
  const grouped = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    results.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return Array.from(map.entries());
  }, [results]);

  const flat = results; // active index sobre la lista plana

  // Reset al abrir
  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  // Atajo global ⌘K / Ctrl+K + navegación
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = flat[active];
        if (cmd) { cmd.run(router); setOpen(false); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, active, router]);

  // Scroll al item activo
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <CtxOpen.Provider value={openPalette}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[12vh]">
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl animate-fade-in overflow-hidden rounded-xl border border-white/10 bg-ink-850/95 shadow-card backdrop-blur-xl">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
              <Search size={18} className="text-slate-500" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar módulos, trámites, clientes, plantillas o acciones…"
                className="flex-1 bg-transparent py-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              />
              <kbd className="rounded border border-white/10 bg-ink-800 px-1.5 py-0.5 text-[10px] text-slate-500">ESC</kbd>
            </div>

            {/* Resultados */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <Hash size={22} className="text-slate-600" />
                  <p className="text-sm text-slate-400">Sin coincidencias para “{q}”</p>
                  <p className="text-xs text-slate-600">Prueba con un nombre, DNI o número de expediente.</p>
                </div>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="mb-1.5">
                    <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">{group}</p>
                    {items.map((c) => {
                      const idx = flat.indexOf(c);
                      const isActive = idx === active;
                      return (
                        <button
                          key={c.id}
                          data-idx={idx}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => { c.run(router); setOpen(false); }}
                          className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition ${isActive ? "bg-brand-600/20 text-white" : "text-slate-300 hover:bg-white/[0.04]"}`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? "bg-brand-600 text-white" : "bg-ink-800 text-slate-400"}`}>
                            <c.icon size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{c.label}</p>
                            {c.sub && <p className="truncate text-[11px] text-slate-500">{c.sub}</p>}
                          </div>
                          {isActive && <CornerDownLeft size={14} className="text-brand-300" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><ArrowUp size={11} /><ArrowDown size={11} /> navegar</span>
              <span className="flex items-center gap-1"><CornerDownLeft size={11} /> abrir</span>
              <span className="ml-auto flex items-center gap-1"><kbd className="rounded border border-white/10 bg-ink-800 px-1 py-0.5">⌘</kbd><kbd className="rounded border border-white/10 bg-ink-800 px-1 py-0.5">K</kbd> abrir/cerrar</span>
            </div>
          </div>
        </div>
      )}
    </CtxOpen.Provider>
  );
}
