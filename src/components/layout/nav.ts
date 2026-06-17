import {
  LayoutDashboard,
  FolderKanban,
  FilePlus2,
  ScanText,
  BrainCircuit,
  FileSignature,
  LayoutTemplate,
  Users,
  MessageCircle,
  Database,
  Search,
  Settings,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Trámites", href: "/tramites", icon: FolderKanban, badge: "47" },
      { label: "Nuevo trámite", href: "/tramites/nuevo", icon: FilePlus2 },
    ],
  },
  {
    title: "Inteligencia documental",
    items: [
      { label: "Carga & OCR", href: "/documentos", icon: ScanText },
      { label: "Motor IA", href: "/motor-ia", icon: BrainCircuit, badge: "6" },
      { label: "Generar contrato", href: "/contratos", icon: FileSignature },
      { label: "Plantillas", href: "/plantillas", icon: LayoutTemplate },
    ],
  },
  {
    title: "Relación con clientes",
    items: [
      { label: "Clientes", href: "/clientes", icon: Users },
      { label: "WhatsApp", href: "/whatsapp", icon: MessageCircle, badge: "3" },
    ],
  },
  {
    title: "Archivo & búsqueda",
    items: [
      { label: "Repositorio", href: "/repositorio", icon: Database },
      { label: "Buscar expedientes", href: "/buscar", icon: Search },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Administración", href: "/admin", icon: Settings },
      { label: "Auditoría", href: "/auditoria", icon: ShieldCheck },
      { label: "Roadmap", href: "/roadmap", icon: Rocket },
    ],
  },
];
