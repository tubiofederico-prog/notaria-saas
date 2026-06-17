"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  type: ToastType;
  msg: string;
}

const ToastCtx = createContext<(msg: string, type?: ToastType) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

const ICONS = {
  success: <CheckCircle2 size={18} className="text-emerald-600" />,
  error: <AlertTriangle size={18} className="text-rose-600" />,
  info: <Info size={18} className="text-brand-600" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((msg: string, type: ToastType = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((t) => [...t, { id, type, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-80 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-100/95 px-4 py-3 shadow-card backdrop-blur animate-slide-in"
          >
            <div className="mt-0.5">{ICONS[t.type]}</div>
            <p className="flex-1 text-sm text-slate-800">{t.msg}</p>
            <button
              onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
              className="text-slate-500 hover:text-slate-700"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
