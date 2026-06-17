// ============================================================
// Capa de datos mock — Lexnota (100% visual, sin backend)
// ============================================================

export type EstadoTramite =
  | "Recibido"
  | "En revisión"
  | "Pendiente de datos"
  | "Contrato generado"
  | "Pendiente de firma"
  | "Listo para retiro"
  | "Finalizado";

export const ESTADOS: EstadoTramite[] = [
  "Recibido",
  "En revisión",
  "Pendiente de datos",
  "Contrato generado",
  "Pendiente de firma",
  "Listo para retiro",
  "Finalizado",
];

export const ESTADO_META: Record<
  EstadoTramite,
  { color: string; dot: string; step: number }
> = {
  Recibido: { color: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-400", step: 1 },
  "En revisión": { color: "bg-brand-50 text-brand-700 border-brand-200", dot: "bg-brand-500", step: 2 },
  "Pendiente de datos": { color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", step: 3 },
  "Contrato generado": { color: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500", step: 4 },
  "Pendiente de firma": { color: "bg-sky-50 text-sky-700 border-sky-200", dot: "bg-sky-500", step: 5 },
  "Listo para retiro": { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", step: 6 },
  Finalizado: { color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-600", step: 7 },
};

export type TipoTramite =
  | "Compraventa de vehículo"
  | "Compraventa de inmueble"
  | "Constitución de empresa"
  | "Contrato privado"
  | "Legalización de firma"
  | "Otros";

export const TIPOS_TRAMITE: TipoTramite[] = [
  "Compraventa de vehículo",
  "Compraventa de inmueble",
  "Constitución de empresa",
  "Contrato privado",
  "Legalización de firma",
  "Otros",
];

export type Prioridad = "Alta" | "Media" | "Baja";

export interface DocItem {
  id: string;
  nombre: string;
  tipo: string;
  estado: "Recibido" | "OCR en proceso" | "Datos detectados" | "Validación pendiente" | "Aprobado" | "Observado";
  peso: string;
  subido: string;
  paginas: number;
}

export interface ActividadItem {
  id: string;
  usuario: string;
  accion: string;
  detalle: string;
  fecha: string;
  icon?: string;
}

export interface Tramite {
  id: string;
  codigo: string;
  tipo: TipoTramite;
  cliente: string;
  clienteId: string;
  contraparte?: string;
  estado: EstadoTramite;
  responsable: string;
  prioridad: Prioridad;
  creado: string;
  actualizado: string;
  progreso: number;
  monto?: string;
  documentos: DocItem[];
  actividad: ActividadItem[];
  alertas: number;
}

const responsables = [
  "Dra. Carla Mendoza",
  "Dr. Luis Paredes",
  "Asist. Rosa Quispe",
  "Dra. María Fernández",
  "Dr. Jorge Salazar",
];

function doc(id: string, nombre: string, tipo: string, estado: DocItem["estado"], paginas = 2): DocItem {
  return { id, nombre, tipo, estado, peso: `${(0.4 + paginas * 0.6).toFixed(1)} MB`, subido: "hace 2 días", paginas };
}

export const TRAMITES: Tramite[] = [
  {
    id: "t1",
    codigo: "EXP-2026-00841",
    tipo: "Compraventa de vehículo",
    cliente: "Roberto Salinas Vega",
    clienteId: "c1",
    contraparte: "AutoMax Perú S.A.C.",
    estado: "En revisión",
    responsable: responsables[0],
    prioridad: "Alta",
    creado: "12 jun 2026",
    actualizado: "hace 3 horas",
    progreso: 35,
    monto: "S/ 48,500",
    alertas: 2,
    documentos: [
      doc("d1", "DNI Comprador", "DNI", "Aprobado", 1),
      doc("d2", "DNI Vendedor", "DNI", "Validación pendiente", 1),
      doc("d3", "Tarjeta de propiedad", "Documento vehicular", "Datos detectados", 1),
      doc("d4", "SOAT vigente", "Documento vehicular", "OCR en proceso", 1),
    ],
    actividad: [
      { id: "a1", usuario: "Dra. Carla Mendoza", accion: "Cambió estado", detalle: "Recibido → En revisión", fecha: "hoy, 09:14" },
      { id: "a2", usuario: "Motor IA", accion: "Validó documento", detalle: "DNI Comprador aprobado automáticamente", fecha: "hoy, 09:02" },
      { id: "a3", usuario: "Asist. Rosa Quispe", accion: "Cargó documento", detalle: "Tarjeta de propiedad", fecha: "ayer, 17:40" },
      { id: "a4", usuario: "Sistema", accion: "Creó expediente", detalle: "EXP-2026-00841", fecha: "12 jun, 11:20" },
    ],
  },
  {
    id: "t2",
    codigo: "EXP-2026-00839",
    tipo: "Compraventa de inmueble",
    cliente: "Inmobiliaria Andina S.A.",
    clienteId: "c2",
    contraparte: "Familia Torres Ríos",
    estado: "Pendiente de firma",
    responsable: responsables[1],
    prioridad: "Alta",
    creado: "10 jun 2026",
    actualizado: "hace 1 día",
    progreso: 78,
    monto: "S/ 420,000",
    alertas: 0,
    documentos: [
      doc("d5", "Partida registral", "Título", "Aprobado", 4),
      doc("d6", "DNI Vendedor", "DNI", "Aprobado", 1),
      doc("d7", "Minuta de compraventa", "Contrato", "Aprobado", 6),
      doc("d8", "Certificado de gravamen", "Título", "Aprobado", 2),
    ],
    actividad: [
      { id: "a5", usuario: "Dr. Luis Paredes", accion: "Generó contrato", detalle: "Escritura pública con IA", fecha: "ayer, 15:30" },
      { id: "a6", usuario: "Dr. Luis Paredes", accion: "Aprobó validación", detalle: "Partida registral", fecha: "ayer, 14:10" },
    ],
  },
  {
    id: "t3",
    codigo: "EXP-2026-00835",
    tipo: "Constitución de empresa",
    cliente: "Tech Innova E.I.R.L.",
    clienteId: "c3",
    estado: "Contrato generado",
    responsable: responsables[2],
    prioridad: "Media",
    creado: "08 jun 2026",
    actualizado: "hace 2 días",
    progreso: 60,
    monto: "S/ 12,000",
    alertas: 1,
    documentos: [
      doc("d9", "DNI Socios (3)", "DNI", "Aprobado", 3),
      doc("d10", "Búsqueda de razón social", "Documento", "Aprobado", 1),
      doc("d11", "Estatuto", "Contrato", "Validación pendiente", 8),
    ],
    actividad: [
      { id: "a7", usuario: "Motor IA", accion: "Generó contrato", detalle: "Acto constitutivo + estatuto", fecha: "hace 2 días" },
    ],
  },
  {
    id: "t4",
    codigo: "EXP-2026-00830",
    tipo: "Legalización de firma",
    cliente: "Carmen Rojas Delgado",
    clienteId: "c4",
    estado: "Listo para retiro",
    responsable: responsables[3],
    prioridad: "Baja",
    creado: "06 jun 2026",
    actualizado: "hace 3 días",
    progreso: 92,
    alertas: 0,
    documentos: [doc("d12", "Carta poder", "Poder", "Aprobado", 2), doc("d13", "DNI Otorgante", "DNI", "Aprobado", 1)],
    actividad: [{ id: "a8", usuario: "Dra. María Fernández", accion: "Cambió estado", detalle: "Listo para retiro", fecha: "hace 3 días" }],
  },
  {
    id: "t5",
    codigo: "EXP-2026-00828",
    tipo: "Contrato privado",
    cliente: "Constructora del Sur S.A.C.",
    clienteId: "c5",
    contraparte: "Proveedora Lima Norte",
    estado: "Pendiente de datos",
    responsable: responsables[4],
    prioridad: "Media",
    creado: "05 jun 2026",
    actualizado: "hace 4 días",
    progreso: 22,
    monto: "S/ 85,000",
    alertas: 3,
    documentos: [doc("d14", "Vigencia de poder", "Documento", "Observado", 2), doc("d15", "RUC ficha", "Documento", "Datos detectados", 1)],
    actividad: [{ id: "a9", usuario: "Dr. Jorge Salazar", accion: "Solicitó corrección", detalle: "Vigencia de poder vencida", fecha: "hace 4 días" }],
  },
  {
    id: "t6",
    codigo: "EXP-2026-00821",
    tipo: "Compraventa de vehículo",
    cliente: "Pedro Huamán Castro",
    clienteId: "c6",
    contraparte: "Lucía Vargas Núñez",
    estado: "Finalizado",
    responsable: responsables[0],
    prioridad: "Baja",
    creado: "01 jun 2026",
    actualizado: "hace 6 días",
    progreso: 100,
    monto: "S/ 32,000",
    alertas: 0,
    documentos: [doc("d16", "Acta de transferencia", "Contrato", "Aprobado", 3)],
    actividad: [{ id: "a10", usuario: "Dra. Carla Mendoza", accion: "Finalizó trámite", detalle: "Entregado al cliente", fecha: "hace 6 días" }],
  },
  {
    id: "t7",
    codigo: "EXP-2026-00818",
    tipo: "Compraventa de inmueble",
    cliente: "Grupo Residencial Lima S.A.",
    clienteId: "c2",
    estado: "Recibido",
    responsable: responsables[1],
    prioridad: "Media",
    creado: "16 jun 2026",
    actualizado: "hace 5 horas",
    progreso: 8,
    monto: "S/ 610,000",
    alertas: 1,
    documentos: [doc("d17", "Minuta", "Contrato", "Recibido", 5)],
    actividad: [{ id: "a11", usuario: "Sistema", accion: "Creó expediente", detalle: "Vía portal web", fecha: "hoy, 08:00" }],
  },
  {
    id: "t8",
    codigo: "EXP-2026-00815",
    tipo: "Constitución de empresa",
    cliente: "Gastronómica Bella Vista S.A.C.",
    clienteId: "c7",
    estado: "En revisión",
    responsable: responsables[2],
    prioridad: "Alta",
    creado: "14 jun 2026",
    actualizado: "hace 1 día",
    progreso: 40,
    monto: "S/ 15,500",
    alertas: 2,
    documentos: [doc("d18", "DNI Socios (2)", "DNI", "Datos detectados", 2)],
    actividad: [{ id: "a12", usuario: "Asist. Rosa Quispe", accion: "Cargó documento", detalle: "DNI socios", fecha: "ayer, 10:00" }],
  },
];

export interface Cliente {
  id: string;
  nombre: string;
  tipo: "Persona natural" | "Persona jurídica";
  documento: string;
  email: string;
  telefono: string;
  direccion: string;
  tramitesActivos: number;
  tramitesTotal: number;
  desde: string;
  codigoSeguimiento: string;
}

export const CLIENTES: Cliente[] = [
  { id: "c1", nombre: "Roberto Salinas Vega", tipo: "Persona natural", documento: "DNI 41258963", email: "rsalinas@gmail.com", telefono: "+51 987 654 321", direccion: "Av. Javier Prado 1234, San Isidro, Lima", tramitesActivos: 1, tramitesTotal: 3, desde: "2024", codigoSeguimiento: "LEX-841A" },
  { id: "c2", nombre: "Inmobiliaria Andina S.A.", tipo: "Persona jurídica", documento: "RUC 20512369874", email: "legal@inmoandina.pe", telefono: "+51 1 712 3400", direccion: "Calle Las Begonias 450, San Isidro, Lima", tramitesActivos: 2, tramitesTotal: 11, desde: "2022", codigoSeguimiento: "LEX-839B" },
  { id: "c3", nombre: "Tech Innova E.I.R.L.", tipo: "Persona jurídica", documento: "RUC 20601234567", email: "info@techinnova.pe", telefono: "+51 956 112 233", direccion: "Av. Arequipa 2890, Lince, Lima", tramitesActivos: 1, tramitesTotal: 2, desde: "2025", codigoSeguimiento: "LEX-835C" },
  { id: "c4", nombre: "Carmen Rojas Delgado", tipo: "Persona natural", documento: "DNI 09887654", email: "carmen.rojas@hotmail.com", telefono: "+51 998 877 665", direccion: "Jr. Huánuco 560, Cercado de Lima", tramitesActivos: 0, tramitesTotal: 4, desde: "2023", codigoSeguimiento: "LEX-830D" },
  { id: "c5", nombre: "Constructora del Sur S.A.C.", tipo: "Persona jurídica", documento: "RUC 20554789632", email: "gerencia@constructorasur.pe", telefono: "+51 1 644 8800", direccion: "Av. La Marina 2300, San Miguel, Lima", tramitesActivos: 1, tramitesTotal: 7, desde: "2021", codigoSeguimiento: "LEX-828E" },
  { id: "c6", nombre: "Pedro Huamán Castro", tipo: "Persona natural", documento: "DNI 45123789", email: "phuaman@gmail.com", telefono: "+51 911 223 344", direccion: "Calle Los Pinos 88, Surco, Lima", tramitesActivos: 0, tramitesTotal: 1, desde: "2026", codigoSeguimiento: "LEX-821F" },
  { id: "c7", nombre: "Gastronómica Bella Vista S.A.C.", tipo: "Persona jurídica", documento: "RUC 20609871234", email: "admin@bellavista.pe", telefono: "+51 945 667 889", direccion: "Av. Pardo 1450, Miraflores, Lima", tramitesActivos: 1, tramitesTotal: 1, desde: "2026", codigoSeguimiento: "LEX-815G" },
];

export interface Plantilla {
  id: string;
  nombre: string;
  categoria: string;
  activa: boolean;
  usos: number;
  actualizada: string;
  variables: string[];
}

export const PLANTILLAS: Plantilla[] = [
  { id: "p1", nombre: "Compraventa de vehículo", categoria: "Vehicular", activa: true, usos: 142, actualizada: "hace 1 semana", variables: ["{{nombre_comprador}}", "{{dni_comprador}}", "{{nombre_vendedor}}", "{{datos_bien}}", "{{monto}}", "{{fecha}}"] },
  { id: "p2", nombre: "Compraventa de inmueble", categoria: "Inmobiliario", activa: true, usos: 98, actualizada: "hace 3 días", variables: ["{{nombre_comprador}}", "{{nombre_vendedor}}", "{{partida_registral}}", "{{datos_bien}}", "{{monto}}", "{{fecha}}"] },
  { id: "p3", nombre: "Constitución de empresa", categoria: "Societario", activa: true, usos: 67, actualizada: "hace 2 semanas", variables: ["{{razon_social}}", "{{socios}}", "{{capital}}", "{{objeto_social}}", "{{fecha}}"] },
  { id: "p4", nombre: "Constitución de sociedad", categoria: "Societario", activa: true, usos: 31, actualizada: "hace 1 mes", variables: ["{{razon_social}}", "{{socios}}", "{{aportes}}", "{{fecha}}"] },
  { id: "p5", nombre: "Legalización de firma", categoria: "Legalizaciones", activa: true, usos: 410, actualizada: "hace 4 días", variables: ["{{nombre_otorgante}}", "{{dni_otorgante}}", "{{fecha}}"] },
  { id: "p6", nombre: "Contrato de arrendamiento", categoria: "Inmobiliario", activa: false, usos: 24, actualizada: "hace 2 meses", variables: ["{{arrendador}}", "{{arrendatario}}", "{{datos_bien}}", "{{renta}}", "{{fecha}}"] },
  { id: "p7", nombre: "Contrato personalizado", categoria: "Otros", activa: true, usos: 56, actualizada: "ayer", variables: ["{{parte_1}}", "{{parte_2}}", "{{objeto}}", "{{fecha}}"] },
];

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: "Administrador" | "Abogado" | "Asistente notarial" | "Revisor documental" | "Atención al cliente";
  estado: "Activo" | "Inactivo";
  ultimoAcceso: string;
}

export const USUARIOS: Usuario[] = [
  { id: "u1", nombre: "Dra. Carla Mendoza", email: "cmendoza@lexnota.pe", rol: "Administrador", estado: "Activo", ultimoAcceso: "hace 5 min" },
  { id: "u2", nombre: "Dr. Luis Paredes", email: "lparedes@lexnota.pe", rol: "Abogado", estado: "Activo", ultimoAcceso: "hace 1 hora" },
  { id: "u3", nombre: "Rosa Quispe", email: "rquispe@lexnota.pe", rol: "Asistente notarial", estado: "Activo", ultimoAcceso: "hace 20 min" },
  { id: "u4", nombre: "Dra. María Fernández", email: "mfernandez@lexnota.pe", rol: "Abogado", estado: "Activo", ultimoAcceso: "ayer" },
  { id: "u5", nombre: "Jorge Salazar", email: "jsalazar@lexnota.pe", rol: "Revisor documental", estado: "Activo", ultimoAcceso: "hace 2 horas" },
  { id: "u6", nombre: "Ana Torres", email: "atorres@lexnota.pe", rol: "Atención al cliente", estado: "Inactivo", ultimoAcceso: "hace 1 semana" },
];

export const ROLES = ["Administrador", "Abogado", "Asistente notarial", "Revisor documental", "Atención al cliente"] as const;
export const MODULOS = ["Dashboard", "Trámites", "Documentos", "Motor IA", "Contratos", "Plantillas", "Clientes", "Repositorio", "Auditoría", "Administración"];

export const PERMISOS_MATRIZ: Record<string, Record<string, boolean>> = {
  Administrador: Object.fromEntries(MODULOS.map((m) => [m, true])),
  Abogado: Object.fromEntries(MODULOS.map((m) => [m, !["Administración"].includes(m)])),
  "Asistente notarial": Object.fromEntries(MODULOS.map((m) => [m, ["Dashboard", "Trámites", "Documentos", "Clientes", "Repositorio"].includes(m)])),
  "Revisor documental": Object.fromEntries(MODULOS.map((m) => [m, ["Dashboard", "Documentos", "Motor IA", "Repositorio", "Auditoría"].includes(m)])),
  "Atención al cliente": Object.fromEntries(MODULOS.map((m) => [m, ["Dashboard", "Clientes", "Trámites"].includes(m)])),
};

export interface AuditLog {
  id: string;
  usuario: string;
  accion: string;
  documento: string;
  estadoAnterior: string;
  estadoNuevo: string;
  fecha: string;
  ip: string;
}

export const AUDITORIA: AuditLog[] = [
  { id: "l1", usuario: "Dra. Carla Mendoza", accion: "Cambio de estado", documento: "EXP-2026-00841", estadoAnterior: "Recibido", estadoNuevo: "En revisión", fecha: "17 jun 2026, 09:14", ip: "190.234.12.8" },
  { id: "l2", usuario: "Motor IA", accion: "Validación automática", documento: "DNI Comprador / EXP-841", estadoAnterior: "Datos detectados", estadoNuevo: "Aprobado", fecha: "17 jun 2026, 09:02", ip: "interno" },
  { id: "l3", usuario: "Dr. Luis Paredes", accion: "Generación de contrato", documento: "EXP-2026-00839", estadoAnterior: "En revisión", estadoNuevo: "Contrato generado", fecha: "16 jun 2026, 15:30", ip: "190.234.12.41" },
  { id: "l4", usuario: "Rosa Quispe", accion: "Carga de documento", documento: "Tarjeta propiedad / EXP-841", estadoAnterior: "—", estadoNuevo: "Recibido", fecha: "16 jun 2026, 17:40", ip: "190.234.12.19" },
  { id: "l5", usuario: "Jorge Salazar", accion: "Solicitud de corrección", documento: "EXP-2026-00828", estadoAnterior: "En revisión", estadoNuevo: "Pendiente de datos", fecha: "13 jun 2026, 11:05", ip: "190.234.12.55" },
  { id: "l6", usuario: "Dra. María Fernández", accion: "Cambio de estado", documento: "EXP-2026-00830", estadoAnterior: "Pendiente de firma", estadoNuevo: "Listo para retiro", fecha: "14 jun 2026, 16:20", ip: "190.234.12.33" },
  { id: "l7", usuario: "Ana Torres", accion: "Notificación WhatsApp", documento: "EXP-2026-00839", estadoAnterior: "—", estadoNuevo: "Enviada", fecha: "16 jun 2026, 16:00", ip: "190.234.12.70" },
  { id: "l8", usuario: "Sistema", accion: "Creación de expediente", documento: "EXP-2026-00818", estadoAnterior: "—", estadoNuevo: "Recibido", fecha: "17 jun 2026, 08:00", ip: "portal-web" },
];

export interface WhatsAppMsg {
  id: string;
  de: "notaria" | "cliente";
  texto: string;
  hora: string;
  estado?: "enviado" | "entregado" | "leido";
}

export interface WhatsAppChat {
  clienteId: string;
  cliente: string;
  telefono: string;
  expediente: string;
  ultimoMsg: string;
  noLeidos: number;
  mensajes: WhatsAppMsg[];
}

export const PLANTILLAS_WSP = [
  { id: "w1", nombre: "Documento recibido", texto: "Estimado(a) {{cliente}}, hemos recibido sus documentos para el expediente {{exp}}. Le mantendremos informado del avance. — Notaría Lexnota" },
  { id: "w2", nombre: "Falta documentación", texto: "Estimado(a) {{cliente}}, para continuar con el expediente {{exp}} necesitamos el siguiente documento: {{documento}}. Quedamos atentos." },
  { id: "w3", nombre: "Trámite en revisión", texto: "Su expediente {{exp}} se encuentra en revisión legal. Tiempo estimado: 24-48 horas hábiles." },
  { id: "w4", nombre: "Contrato listo para firma", texto: "¡Buenas noticias! El contrato de su expediente {{exp}} está listo. Por favor coordine su cita de firma." },
  { id: "w5", nombre: "Documento listo para retiro", texto: "Su trámite {{exp}} ha finalizado. Puede acercarse a recoger sus documentos en horario de oficina." },
];

export const WSP_CHATS: WhatsAppChat[] = [
  {
    clienteId: "c2",
    cliente: "Inmobiliaria Andina S.A.",
    telefono: "+51 1 712 3400",
    expediente: "EXP-2026-00839",
    ultimoMsg: "Perfecto, coordinamos la firma.",
    noLeidos: 0,
    mensajes: [
      { id: "m1", de: "notaria", texto: "Estimados, hemos recibido sus documentos para el expediente EXP-2026-00839.", hora: "14 jun 10:02", estado: "leido" },
      { id: "m2", de: "cliente", texto: "Gracias, ¿cuánto demora la revisión?", hora: "14 jun 10:15" },
      { id: "m3", de: "notaria", texto: "Su expediente se encuentra en revisión legal. Tiempo estimado 24-48h.", hora: "14 jun 10:18", estado: "leido" },
      { id: "m4", de: "notaria", texto: "¡Buenas noticias! El contrato está listo para firma. Coordine su cita.", hora: "16 jun 15:40", estado: "leido" },
      { id: "m5", de: "cliente", texto: "Perfecto, coordinamos la firma.", hora: "16 jun 16:05" },
    ],
  },
  {
    clienteId: "c1",
    cliente: "Roberto Salinas Vega",
    telefono: "+51 987 654 321",
    expediente: "EXP-2026-00841",
    ultimoMsg: "Adjunto el SOAT actualizado.",
    noLeidos: 2,
    mensajes: [
      { id: "m6", de: "notaria", texto: "Estimado Roberto, recibimos sus documentos para EXP-2026-00841.", hora: "12 jun 11:30", estado: "entregado" },
      { id: "m7", de: "notaria", texto: "Necesitamos el SOAT vigente para continuar.", hora: "13 jun 09:00", estado: "entregado" },
      { id: "m8", de: "cliente", texto: "Adjunto el SOAT actualizado.", hora: "hoy 08:45" },
    ],
  },
  {
    clienteId: "c5",
    cliente: "Constructora del Sur S.A.C.",
    telefono: "+51 1 644 8800",
    expediente: "EXP-2026-00828",
    ultimoMsg: "La vigencia de poder está vencida...",
    noLeidos: 1,
    mensajes: [
      { id: "m9", de: "notaria", texto: "La vigencia de poder presentada está vencida. Por favor envíe una actualizada.", hora: "13 jun 11:10", estado: "entregado" },
    ],
  },
];

// Métricas dashboard
export const METRICAS = {
  tramitesActivos: 47,
  tramitesActivosDelta: "+12%",
  docsPendientes: 18,
  docsPendientesDelta: "-4",
  contratosIA: 134,
  contratosIADelta: "+23%",
  clientesNotificados: 312,
  clientesNotificadosDelta: "+8%",
  tiempoPromedio: "3.2 días",
  tiempoPromedioDelta: "-0.6 días",
};

export const TRAMITES_POR_ESTADO = ESTADOS.map((e, i) => ({
  estado: e.length > 12 ? e.slice(0, 11) + "…" : e,
  estadoFull: e,
  cantidad: [9, 12, 7, 6, 5, 4, 28][i],
}));

export const TRAMITES_POR_MES = [
  { mes: "Ene", tramites: 28, contratos: 18 },
  { mes: "Feb", tramites: 34, contratos: 22 },
  { mes: "Mar", tramites: 41, contratos: 29 },
  { mes: "Abr", tramites: 38, contratos: 26 },
  { mes: "May", tramites: 52, contratos: 38 },
  { mes: "Jun", tramites: 47, contratos: 34 },
];

export const ALERTAS_DOCS = [
  { id: "al1", expediente: "EXP-2026-00828", motivo: "Vigencia de poder vencida", nivel: "alto" as const },
  { id: "al2", expediente: "EXP-2026-00841", motivo: "DNI vendedor pendiente de validación", nivel: "medio" as const },
  { id: "al3", expediente: "EXP-2026-00835", motivo: "Estatuto requiere firma del titular", nivel: "medio" as const },
  { id: "al4", expediente: "EXP-2026-00818", motivo: "Falta certificado de gravamen", nivel: "alto" as const },
];

export const NOTIFICACIONES = [
  { id: "n1", titulo: "Documento validado por IA", detalle: "DNI Comprador · EXP-2026-00841", hora: "hace 12 min", tipo: "ok" as const },
  { id: "n2", titulo: "Alerta de cumplimiento", detalle: "Vigencia de poder vencida · EXP-828", hora: "hace 1 h", tipo: "warn" as const },
  { id: "n3", titulo: "Contrato listo para firma", detalle: "EXP-2026-00839", hora: "hace 3 h", tipo: "info" as const },
  { id: "n4", titulo: "Nuevo expediente vía portal", detalle: "EXP-2026-00818", hora: "hace 5 h", tipo: "info" as const },
];

export const NOTARIAS = [
  { id: "no1", nombre: "Notaría Lexnota — Lima Centro" },
  { id: "no2", nombre: "Notaría Lexnota — San Isidro" },
  { id: "no3", nombre: "Notaría Lexnota — Miraflores" },
];

export function getTramite(id: string) {
  return TRAMITES.find((t) => t.id === id);
}
export function getCliente(id: string) {
  return CLIENTES.find((c) => c.id === id);
}
