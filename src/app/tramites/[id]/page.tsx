import { TRAMITES } from "@/lib/data";
import TramiteDetalleClient from "./Detalle";

export function generateStaticParams() {
  return TRAMITES.map((t) => ({ id: t.id }));
}

export default function Page() {
  return <TramiteDetalleClient />;
}
