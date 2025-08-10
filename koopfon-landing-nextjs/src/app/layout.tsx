import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: "Koopfon - Güvenilir Kooperatifçiliğin Dijital Adı",
  description: "Kooperatif kurmak mı istiyorsunuz? Dijital kooperatif hizmetlerimiz ile size özel adım adım kooperatif kurulumu yapın. Kooperatiflerinizi kolayca yönetin. Hisselerinizi hızlıca satın",
  keywords: "kooperatif, kooperatif kurmak, yapı kooperatifi, kooperatif yönetimi, kooperatif hisseleri",
  authors: [{ name: "Koopfon" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Koopfon - Güvenilir Kooperatifçiliğin Dijital Adı",
    description: "Kooperatif kurmak mı istiyorsunuz? Dijital kooperatif hizmetlerimizle kooperatiflerinizi kolayca yönetin.",
    url: "https://koopfon.com",
    siteName: "Koopfon",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koopfon - Güvenilir Kooperatifçiliğin Dijital Adı",
    description: "Kooperatif kurmak mı istiyorsunuz? Dijital kooperatif hizmetlerimizle kooperatiflerinizi kolayca yönetin.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <div className="koopfon-app">
          {children}
        </div>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}