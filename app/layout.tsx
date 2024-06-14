import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/provider/ToastProvider";
import ConfettiProvider from "@/provider/ConfettiProvider";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "greek", "vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Acadeva - A Learning Platform for Developers and Designers 🚀",
    template: `%s | Acadeva`,
  },
  description:
    "Acadeva is a learning platform for developers and designers. Learn from the best and get started with your career today! 🚀",
  icons: {
    icon: [
      {
        href: "/logo.svg",
        url: "/logo.svg",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acadeva-six.vercel.app/",
    siteName: "Acadeva",
    images: [
      {
        url: "https://github.com/psykat1116/Acadeva/blob/master/public/OpenGraph.png?raw=true",
        width: 1366,
        height: 679,
        alt: "Acadeva - A Learning Platform for Developers and Designers 🚀",
      },
    ],
    title: "Acadeva - A Learning Platform for Developers and Designers 🚀",
    description:
      "Acadeva is a learning platform for developers and designers. Learn from the best and get started with your career today! 🚀",
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
