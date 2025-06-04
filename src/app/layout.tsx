import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Nutricional",
  description: "Gestión de información nutricional y salud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-gray-100 min-h-screen`}>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
