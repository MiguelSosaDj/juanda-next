import "@/styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Sistema Nutricional",
  description: "Sistema de nutrición migrado a Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow px-6 py-4 flex gap-6">
          <Link href="/">🏠 Dashboard</Link>
          <Link href="/nino-sano/1">Niño Sano</Link>
          <Link href="/gestante/1">Gestante</Link>
          <Link href="/lactante/1">Lactante</Link>
          <Link href="/bajo-peso/1">Bajo Peso</Link>
          <Link href="/sobre-peso/1">Sobre Peso</Link>
          <Link href="/gemelar/1">Gemelar</Link>
          <Link href="/alumno/1">Alumnos</Link>
        </nav>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
