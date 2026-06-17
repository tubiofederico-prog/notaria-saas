"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./nav";
import { Scale, X } from "lucide-react";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink-950/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.06] bg-ink-900/95 backdrop-blur transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between gap-2 border-b border-white/[0.06] px-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-iris-600 shadow-glow">
              <Scale size={19} className="text-white" />
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-none text-white">Lexnota</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Notarial Intelligence</p>
            </div>
          </Link>
          <button onClick={onClose} className="btn-ghost !px-1.5 lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group) => (
            <div key={group.title} className="mb-5">
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                          active
                            ? "bg-brand-600/15 text-white shadow-[inset_2px_0_0_0_var(--tw-shadow-color)] shadow-brand-400"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                        }`}
                      >
                        <item.icon size={17} className={active ? "text-brand-300" : "text-slate-500 group-hover:text-slate-300"} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                              active ? "bg-brand-500/30 text-brand-200" : "bg-ink-700 text-slate-400"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer plan */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="rounded-lg border border-white/[0.06] bg-gradient-to-br from-brand-600/15 to-iris-600/10 p-3.5">
            <p className="text-xs font-medium text-white">Plan Enterprise</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              IA ilimitada · OCR · Firma digital · Soporte prioritario
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
