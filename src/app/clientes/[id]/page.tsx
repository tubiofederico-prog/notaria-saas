import { CLIENTES } from "@/lib/data";
import ClienteDetalleClient from "./Detalle";

export function generateStaticParams() {
  return CLIENTES.map((c) => ({ id: c.id }));
}

export default function Page() {
  return <ClienteDetalleClient />;
}
