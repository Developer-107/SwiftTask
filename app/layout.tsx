export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import LayoutShell from "./layoutShell";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: "SwipeTask",
  description: "Organize Parcels as u wish",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased `}>
        <Container>
        <Theme>
        <LayoutShell>
        {children}
        </LayoutShell>
        </Theme>
        </Container>
      </body>
    </html>
  );
}
