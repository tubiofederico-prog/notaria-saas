"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Barra de progreso animada que se dispara en cada cambio de ruta.
export function TopProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setWidth(12);
    const t1 = setTimeout(() => setWidth(65), 90);
    const t2 = setTimeout(() => setWidth(100), 380);
    const t3 = setTimeout(() => setVisible(false), 620);
    const t4 = setTimeout(() => setWidth(0), 760);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-brand-500 via-iris-500 to-aqua-400 shadow-[0_0_8px_rgba(79,111,255,0.7)] transition-all duration-300 ease-out"
        style={{ width: `${width}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
