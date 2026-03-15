import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUJU LAB — Signal Intelligence",
  description:
    "Intelligence-driven operator terminal for prediction markets. Signal intelligence, not prediction theater.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-juju-black text-juju-white antialiased">
        {children}
      </body>
    </html>
  );
}
