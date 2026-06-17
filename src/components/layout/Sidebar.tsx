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
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white/95 backdrop-blur transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between gap-2 border-b border-slate-200 px-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-iris-600 shadow-glow">
              <Scale size={19} className="text-white" />
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-none text-slate-900">Lexnota</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Notarial Intelligence</p>
            </div>
          </Link>
          <button onClick={onClose} className="btn-ghost !px-1.5 lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group) => {
            const groupActive = group.items.some((i) => isActive(i.href));
            return (
              <div key={group.title} className="mb-5">
                <p
                  className={`mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                    groupActive ? "text-brand-700" : "text-slate-400"
                  }`}
                >
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
                          aria-current={active ? "page" : undefined}
                          className={`group relative flex items-center gap-3 rounded-lg py-2 pl-4 pr-3 text-sm font-medium transition ${
                            active
                              ? "bg-brand-50 text-brand-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {active && (
                            <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                          )}
                          <item.icon
                            size={17}
                            className={active ? "text-brand-700" : "text-slate-500 group-hover:text-slate-700"}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                active ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-600"
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
            );
          })}
        </nav>

        {/* Footer plan */}
        <div className="border-t border-slate-200 p-3">
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-brand-600/15 to-iris-600/10 p-3.5">
            <p className="text-xs font-medium text-slate-900">Plan Enterprise</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              IA ilimitada · OCR · Firma digital · Soporte prioritario
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
