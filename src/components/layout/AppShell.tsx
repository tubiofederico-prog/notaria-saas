"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CommandPaletteProvider } from "./CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <CommandPaletteProvider>
      <div className="app-bg min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-64">
          <Header onMenu={() => setSidebarOpen(true)} />
          <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">{children}</main>
        </div>
      </div>
    </CommandPaletteProvider>
  );
}
