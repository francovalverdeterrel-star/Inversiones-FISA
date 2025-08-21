import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FISA · Declaración de Conflicto de Interés",
  description: "Mockup interno para registro y evaluación de vínculos familiares",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
