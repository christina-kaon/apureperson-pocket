import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "与雪同归 · 神仙姐姐篇",
  description: "一段由你亲自决定去留的互动仙侠群聊故事。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
