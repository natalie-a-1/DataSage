"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { AppProvider } from "./AppContext";
import { usePathname } from 'next/navigation';
import { metadata } from './metadata'; // Ensure the import is correct

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/login' && pathname !== '/sign-up';

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} flex bg-white`}>
        <AppProvider>
          {showSidebar && <Sidebar />}
          <div className={`flex flex-col ${showSidebar ? 'flex-1' : 'w-full'} bg-white`}>
            <main className="flex-1 bg-white">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
