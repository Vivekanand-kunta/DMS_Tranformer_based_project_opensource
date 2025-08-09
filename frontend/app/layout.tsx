import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNavigationMenu } from "@/components/FunctionalComponents/ApplicationMenu";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DMS",
  description: "It is an open-source, transformer-based database management system that provides a user-friendly interface for managing databases.Created by K.Vivekanandreddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <AppNavigationMenu />
        <header className="text-center mt-5 text-4xl relative bottom-10 "><h1>DMS</h1></header>
        {children}
      </body>
    </html>
  );
}
