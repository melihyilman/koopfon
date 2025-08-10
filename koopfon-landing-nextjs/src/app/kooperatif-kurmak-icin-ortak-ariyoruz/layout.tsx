import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kooperatif Kurmak İçin Ortak Arıyoruz! | Koopfon",
  description: "Küçük bütçelerle birlikte ev yapalım! Yapı kooperatifi kurarak ev sahibi olmak için bize katılın. Güvenli ve dayanışmacı yaşam için ortaklar arıyoruz.",
  keywords: "yapı kooperatifi, kooperatif kurmak, ortak arıyoruz, ev yapmak, kooperatifçilik",
  openGraph: {
    title: "Kooperatif Kurmak İçin Ortak Arıyoruz! | Koopfon",
    description: "Küçük bütçelerle birlikte ev yapalım! Yapı kooperatifi kurarak ev sahibi olmak için bize katılın.",
    type: "article",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}