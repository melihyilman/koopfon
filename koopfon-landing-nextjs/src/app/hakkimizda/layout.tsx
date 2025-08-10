import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hakkımızda - Güvenilir Kooperatifçiliğin Dijital Adı | Koopfon",
  description: "Koopfon.com, dijital kooperatifçilik hizmetleri ile kullanıcı dostu, güvenilir, yenilikçi ve sürdürülebilir bir kooperatifleşme deneyimi sunmak için kuruldu.",
  keywords: "koopfon hakkında, dijital kooperatifçilik, kooperatif yönetimi, kooperatif kurulumu",
  openGraph: {
    title: "Hakkımızda - Güvenilir Kooperatifçiliğin Dijital Adı | Koopfon",
    description: "Koopfon.com, dijital kooperatifçilik hizmetleri ile güvenilir ve sürdürülebilir bir kooperatifleşme deneyimi sunuyor.",
    type: "website",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}