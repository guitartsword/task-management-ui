import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DndClientProvider from './context/DndProvider';
import NextAuthProvider from './context/NextAuthProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management UI",
  description: "Streamline Your Day, Achieve More: Task Management Made Simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>
        <DndClientProvider>
          {children}
        </DndClientProvider>
      </NextAuthProvider>
      </body>
    </html>
  );
}
