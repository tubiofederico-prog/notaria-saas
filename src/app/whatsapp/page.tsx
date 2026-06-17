"use client";

import { useState } from "react";
import { Send, Check, CheckCheck, MessageCircle, Sparkles, Search } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { WSP_CHATS, PLANTILLAS_WSP, WhatsAppMsg } from "@/lib/data";

export default function WhatsAppPage() {
  const toast = useToast();
  const [activeId, setActiveId] = useState(WSP_CHATS[0].clienteId);
  const [input, setInput] = useState("");
  const [plantillaModal, setPlantillaModal] = useState(false);
  const [extraMsgs, setExtraMsgs] = useState<Record<string, WhatsAppMsg[]>>({});

  const chat = WSP_CHATS.find((c) => c.clienteId === activeId)!;
  const mensajes = [...chat.mensajes, ...(extraMsgs[activeId] ?? [])];

  const send = (texto: string) => {
    if (!texto.trim()) return;
    const msg: WhatsAppMsg = { id: `x${Date.now()}`, de: "notaria", texto, hora: "ahora", estado: "enviado" };
    setExtraMsgs((m) => ({ ...m, [activeId]: [...(m[activeId] ?? []), msg] }));
    setInput("");
    toast("Mensaje enviado", "success");
  };

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "WhatsApp" }]} />
      <PageHeader
        title="Integración con WhatsApp"
        subtitle="Notificaciones automáticas a clientes sobre el estado de sus trámites"
        actions={<button className="btn-primary" onClick={() => setPlantillaModal(true)}><Sparkles size={16} /> Enviar notificación</button>}
      />

      <div className="card grid h-[640px] grid-cols-1 overflow-hidden md:grid-cols-3">
        {/* Lista de chats */}
        <div className="flex flex-col border-r border-slate-200">
          <div className="border-b border-slate-200 p-3">
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input placeholder="Buscar conversación…" className="input !py-2 pl-9 text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {WSP_CHATS.map((c) => (
              <button
                key={c.clienteId}
                onClick={() => setActiveId(c.clienteId)}
                className={`flex w-full items-center gap-3 border-b border-slate-100 px-3 py-3 text-left transition ${activeId === c.clienteId ? "bg-brand-500/10" : "hover:bg-slate-50"}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xs font-semibold text-white">
                  {c.cliente.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{c.cliente}</p>
                  <p className="truncate text-xs text-slate-500">{c.ultimoMsg}</p>
                </div>
                {c.noLeidos > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-900">{c.noLeidos}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Conversación */}
        <div className="flex flex-col md:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xs font-semibold text-white">
              {chat.cliente.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{chat.cliente}</p>
              <p className="text-xs text-slate-500">{chat.telefono} · {chat.expediente}</p>
            </div>
            <MessageCircle size={18} className="text-emerald-600" />
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.04),transparent)] p-4">
            {mensajes.map((m) => (
              <div key={m.id} className={`flex ${m.de === "notaria" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${m.de === "notaria" ? "rounded-br-sm bg-emerald-600/90 text-white" : "rounded-bl-sm bg-slate-100 text-slate-800"}`}>
                  <p>{m.texto}</p>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${m.de === "notaria" ? "text-emerald-100/70" : "text-slate-500"}`}>
                    {m.hora}
                    {m.de === "notaria" && (m.estado === "leido" ? <CheckCheck size={12} className="text-aqua-600" /> : m.estado === "entregado" ? <CheckCheck size={12} /> : <Check size={12} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {PLANTILLAS_WSP.slice(0, 3).map((p) => (
                <button key={p.id} onClick={() => setInput(p.texto.replace("{{cliente}}", chat.cliente).replace("{{exp}}", chat.expediente))} className="chip border border-slate-200 text-slate-600 hover:text-slate-800">
                  {p.nombre}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Escribe un mensaje…"
                className="input"
              />
              <button onClick={() => send(input)} className="btn-primary !px-3"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal plantillas */}
      <Modal
        open={plantillaModal}
        onClose={() => setPlantillaModal(false)}
        title="Plantillas de notificación"
        subtitle="Selecciona un mensaje automático para enviar"
        size="lg"
      >
        <div className="space-y-2">
          {PLANTILLAS_WSP.map((p) => (
            <div key={p.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white/40 p-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600"><MessageCircle size={15} /></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{p.nombre}</p>
                <p className="mt-0.5 text-xs text-slate-500">{p.texto}</p>
              </div>
              <button
                className="btn-outline !py-1.5 text-xs"
                onClick={() => { setInput(p.texto.replace("{{cliente}}", chat.cliente).replace("{{exp}}", chat.expediente)); setPlantillaModal(false); toast("Plantilla cargada en el chat", "info"); }}
              >
                Usar
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
