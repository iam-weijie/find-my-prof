import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find My Prof",
  description:
    "AI assistant designed to help you discover the best professor for your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-114KGHX8PR"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-114KGHX8PR');
            `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
