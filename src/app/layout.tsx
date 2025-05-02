import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Pranjali & Soumitra Wedding",
  description: "Wedding Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-59CLXCWBWF"
        ></Script>
        <Script id="google-analytics-tag">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-59CLXCWBWF');`}
        </Script>
      </head>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
