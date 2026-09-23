import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signature DC — Digital Product Marketing & Creative Partner",
  description: "Strategy, creative systems and campaigns that turn digital products into brands people discover, trust and buy.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
