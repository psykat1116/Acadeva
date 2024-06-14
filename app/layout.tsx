import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/provider/ToastProvider";
import ConfettiProvider from "@/provider/ConfettiProvider";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "greek", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Acadeva - A Learning Platform for Developers and Designers 🚀",
  description:
    "Acadeva is a learning platform for developers and designers. Learn from the best and get started with your career today! 🚀",
  icons: {
    icon: [{ url: "/logo.svg", href: "/logo.svg" }],
  },
  openGraph: {
    title: "Acadeva - A Learning Platform for Developers and Designers 🚀",
    description:
      "Acadeva is a learning platform for developers and designers. Learn from the best and get started with your career today! 🚀",
    images: [
      {
        url: "https://github.com/psykat1116/Acadeva/blob/master/public/OpenGraph.png?raw=true",
        alt: "Acadeva",
        width: 1280,
        height: 640,
      },
    ],
    siteName: "Acadeva",
    locale: "en_US",
    type: "website",
    url: "https://acadeva-six.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
