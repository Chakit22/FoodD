import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplifyClientSide';
import {Toaster} from "sonner";
import { UserProvider } from "../components/User-Provider";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { WebsocketProvider } from "@/components/Websocket-Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <UserProvider>
              <ConfigureAmplifyClientSide />
              <Toaster position="top-right" />
                {children}
          </UserProvider>
      </body>
    </html>
  );
}
