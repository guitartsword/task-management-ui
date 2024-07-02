import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DndClientProvider from './context/DndProvider';

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
        <DndClientProvider>
          {children}
        </DndClientProvider>
      </body>
    </html>
  );
}
