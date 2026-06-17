"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ label = "Volver", fallback }: { label?: string; fallback?: string }) {
  const router = useRouter();
  const onClick = () => {
    if (fallback) router.push(fallback);
    else router.back();
  };
  return (
    <button onClick={onClick} className="btn-ghost !px-2.5 !py-1.5 text-xs">
      <ArrowLeft size={15} /> {label}
    </button>
  );
}
