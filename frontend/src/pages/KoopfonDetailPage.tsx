import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ApplyButton from '../components/ApplyButton';
import logoV11 from '../assets/images/logo-koopfon-2.png';
import './LandingPage.css';

function KoopfonDetailPage(): JSX.Element {
  const footerRef = React.useRef<HTMLElement>(null);

  return (
    <div className="koopfon-app">
      <section data-theme="light" className="hero-section" style={{ minHeight: 'auto', height: 'auto', padding: '3rem 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-10">
              
              <div className="logo-container mb-5 mt-3">
                <Link to="/">
                  <img src={logoV11} alt="Koopfon Logo" className="logo" style={{ height: '100px', cursor: 'pointer' }} />
                </Link>
              </div>

              <div className="d-md-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold koopfon-secondary mb-3 mb-md-0">
                  Birlikte Kooperatif Kurmak İçin Ortak Arıyoruz!
                </h1>
                <div className="ms-md-4 flex-shrink-0">
                    <ApplyButton />
                </div>
              </div>

              <p className="lead text-muted mt-3">
                <span className="fw-bold">"Küçük bütçelerle, birlikte ev yapalım"</span> diyenler, bu çağrı size.
              </p>

              <p className="mb-4">
                Hepimiz aynı soruyu soruyoruz: Bu şartlarda nasıl ev sahibi olacağız?
              </p>
              <p className="mb-4">
                Son yıllarda konut fiyatları öyle arttı ki, çoğumuz için ev sahibi olmak neredeyse imkânsız hale geldi. Ancak bireysel mücadele yerine, kolektif çözüm yolları arayışı ile bir araya geldiğimizde, hepimiz için daha ulaşılabilir ve sürdürülebilir bir çözüm olarak karşımıza "Yapı kooperatifleri" çıkıyor.
              </p>

              <h4 className="fw-bold koopfon-primary mt-5">Kimleri Arıyoruz?</h4>
              <p className="mb-4">
                Biz de tam bu noktada, aynı meslek gruplarından, yaklaşık aynı bütçelere ve benzer beklentilere sahip, ev sahibi olmak isteyen ama piyasadaki sürekli değişen fiyat dinamikleri karşısında ortak hayalleri olan insanların bir araya gelmeyi hedeflediğik. Şimdi bu hayalimizi büyütmek, birlikte bir yapı kooperatifi kurmak için aynı yolda yürümek isteyen, "birlikte güvenli ve dayanışmacı bir yaşam kuralım!" diyen ortaklar arıyoruz.
              </p>

              <h4 className="fw-bold koopfon-primary mt-5">Neden Kooperatife Katılmalıyım?</h4>
              <p className="mb-4">
                Kooperatifçilik, ev sahibi olmanın daha adil ve uygun maliyetli bir yoludur. Bu kooperatifçilik modeli, şeffaf ve katılımcı bir sisteme konut sahibi olmayı mümkün kılar. Arsa alımından projelendirmeye, inşa sürecinden yerleşme kadar tüm adımlar ortak akılla ilerler. Her şey sizin bildiğiniz ve onayınızla gerçekleşir. Bu süreçte hep birlikte daha uygun fiyata ev sahibi olurken hem de güvenli ve dayanışma içinde ilerleyen bir süreç yaşarız.
              </p>

              <h4 className="fw-bold koopfon-primary mt-5">Ne Aşamadayız?</h4>
              <p className="mb-4">
                Farklı şehir ve bölgelerden arsa araştırmasıyla birlikte ortak arama sürecimiz de devam etmektedir. Talepler doğrultusunda, kooperatiflerin kuruluş süreçlerini resmen başlatacağız.
              </p>

              <h4 className="fw-bold koopfon-primary mt-5">Siz de Aramıza Katılın!</h4>
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
    </div>
  );
}

export default KoopfonDetailPage;