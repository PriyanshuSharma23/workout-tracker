import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ServiceWorkerLoader from "./components/ServiceWorkerLoader";
import { ClerkProvider } from "@clerk/nextjs";
import BottomBar from "./components/BottomBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#111827",
};

export const metadata: Metadata = {
  title: "Workout Tracker",
  description: "Track your daily workouts",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Workout Tracker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-900 text-white`}
        >
          <ServiceWorkerLoader>
            <Toaster position="top-center" />
            {children}
            <BottomBar />
          </ServiceWorkerLoader>
        </body>
      </ClerkProvider>
    </html>
  );
}
