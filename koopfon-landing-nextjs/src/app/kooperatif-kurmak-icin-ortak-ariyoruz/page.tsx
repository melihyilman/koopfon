'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ApplyButton from '@/components/ApplyButton';
import logoV11 from '@/assets/images/logo-koopfon-2.png';

export default function KoopfonDetailPage() {
  const footerRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <section data-theme="light" style={{ 
        minHeight: 'auto', 
        height: 'auto', 
        padding: '3rem 0',
        backgroundColor: 'var(--koopfon-primary-background)'
      }}>
        <div className="container-detail-page">
          <div className="row">
            <div className="col-lg-9 col-md-10">
              
              <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                <Link href="/">
                  <Image 
                    src={logoV11} 
                    alt="Koopfon Logo" 
                    height={100}
                    width={200}
                    style={{ 
                      cursor: 'pointer',
                      height: '100px',
                      width: 'auto',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    quality={90}
                    loading="eager"
                  />
                </Link>
              </div>

              <div className="d-md-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold mb-3 mb-md-0" style={{ 
                  color: 'var(--koopfon-secondary)' 
                }}>
                  Birlikte Kooperatif Kurmak İçin Ortak Arıyoruz!
                </h1>
                <div className="ms-md-4 flex-shrink-0">
                    <ApplyButton />
                </div>
              </div>

              <p className="mb-4">
                <span className="fw-bold">&quot;Küçük bütçelerle, birlikte ev yapalım&quot;</span> diyenler, bu çağrı size.
              </p>

              <p className="mb-4">
                Hepimiz aynı soruyu soruyoruz: Bu şartlarda nasıl ev sahibi olacağız?
              </p>
              <p className="mb-4">
                Son yıllarda konut fiyatları öyle arttı ki, çoğumuz için ev sahibi olmak neredeyse imkânsız hale geldi. Ancak bireysel mücadele yerine, kolektif çözüm yolları arayışı ile bir araya geldiğimizde, hepimiz için daha ulaşılabilir ve sürdürülebilir bir çözüm olarak karşımıza &quot;Yapı kooperatifleri&quot; çıkıyor.
              </p>

              <h4 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Kimleri Arıyoruz?</h4>
              <p className="mb-4">
                Biz de tam bu noktada, aynı meslek gruplarından, yaklaşık aynı bütçelere ve benzer beklentilere sahip, ev sahibi olmak isteyen ama piyasadaki sürekli olarak artan fiyatlara yetişemeyen, ortak hayalleri olan insanları bir araya getirmeyi hedefledik. Şimdi bu hayalimizi büyütmek, birlikte bir yapı kooperatifi kurmak için aynı yolda yürümek isteyen, &quot;birlikte güvenli ve dayanışmacı bir yaşam kuralım&quot; diyen ortaklar arıyoruz. 
              </p>

              <h4 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Neden Kooperatife Katılmalıyım?</h4>
              <p className="mb-4">
                Kooperatifçilik, ev sahibi olmanın daha adil ve uygun maliyetli bir yoludur. Bu kooperatifçilik modeli, şeffaf ve katılımcı bir sisteme konut sahibi olmayı mümkün kılar. Arsa alımından projelendirmeye, inşa sürecinden yerleşme kadar tüm adımlar ortak akılla ilerler. Her şey sizin bildiğiniz ve onayınızla gerçekleşir. Bu süreçte hep birlikte daha uygun fiyata ev sahibi olurken hem de güvenli ve dayanışma içinde ilerleyen bir süreç yaşarız.
              </p>

              <h4 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Ne Aşamadayız?</h4>
              <p className="mb-4">
                Farklı şehir ve bölgelerden arsa araştırmasıyla birlikte ortak arama sürecimiz de devam etmektedir. Talepler doğrultusunda, kooperatiflerin kuruluş süreçlerini resmen başlatacağız.
              </p>

              <h4 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Siz de Aramıza Katılın!</h4>
              <p className="mb-4">
                Eğer siz de gücünüzü bizimle birleştirmek isterseniz, beklentilerinizi ve sorularınızı detayıca konuşabileceğimiz bir görüşme ile tanışmak isteriz.
              </p>

              <p className="mb-4">
                Şimdi aramıza katıl, geleceğimizi hep birlikte inşa edelim!
              </p>

              <div className="mt-4">
                <ApplyButton />
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer ref={footerRef} theme="light" />
    </>
  );
}