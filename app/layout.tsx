import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospedagem Nexus",
  description: "Gestão de hospedagens com reservas, operações e inventário."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
