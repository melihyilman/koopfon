import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import logoV11 from '../assets/images/logo-koopfon-2.png';

const ValueItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
    <div style={{
      width: '8px',
      height: '8px',
      backgroundColor: 'var(--koopfon-primary)',
      borderRadius: '50%',
      marginTop: '8px',
      marginRight: '12px',
      flexShrink: 0
    }}></div>
    <p style={{ margin: 0 }}>
      {children}
    </p>
  </div>
);

function AboutUsPage(): JSX.Element {
  const footerRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="koopfon-app">
      <section data-theme="light" style={{ backgroundColor: 'var(--koopfon-primary-background)', minHeight: '100vh', padding: '3rem 0' }}>
        <div className="container-detail-page">
          <div className="row">
            <div className="col-lg-9 col-md-10">
              
              <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                <Link to="/">
                    <img src={logoV11} alt="Koopfon Logo" style={{ height: '100px', cursor: 'pointer' }} />
                </Link>
              </div>

              <div className="d-md-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold mb-3 mb-md-0" style={{ 
                  color: 'var(--koopfon-secondary)' 
                }}>
                  Güvenilir Kooperatifçiliğin Dijital Adı
                </h1>
               
              </div>

              <p className="mb-4">
                <strong>Koopfon.com</strong>, sunduğu dijital kooperatifçilik hizmetleri ile kullanıcı dostu, güvenilir, yenilikçi ve sürdürülebilir bir kooperatifleşme deneyimi sunmak amacıyla 2025 yılında yola çıktı.
              </p>

              <p className="mb-4">
                Kuruluşumuzdan bu yana temel amacımız; ihtiyaçlarınıza, taleplerinize ve bütçenize uygun doğru yatırımları sizlerle buluşturmak, Kooperatiflerin iç dinamiklerini güçlendirmek, ortakları arası ilişkiler sağlıklı bir zemine taşımak, sektörde güveni artırmak; kooperatifçiliği yönetilebilir hale getirmek, dijital kooperatifçilik hizmetlerini herkes için erişilebilir kılmak, sürdürülebilir kalkınmayı desteklemek için akılcı, etkili ve etik bir platform sunmaktır.
              </p>

              <h3 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Misyonumuz</h3>
              <p className="mb-4">
                Türkiye genelinde kooperatiflerin karşılaştığı sorunları çözmeye odaklanan ve sürdürülebilir ekonomik girişimleri destekleyen güçlü bir kooperatifçilik altyapısı ve anlayışına ulaşmak ve kullanıcılarımıza her zaman daha iyi sunmak.
              </p>

              <h3 className="fw-bold mt-5" style={{ color: 'var(--koopfon-primary)' }}>Değerlerimiz</h3>
              <div style={{ marginBottom: '20px' }}>
                <ValueItem>
                  <strong>Uzmanlık ve Güvenilirlik:</strong> Alanında deneyimli profesyonellerle çalışıyor ve güven esaslı bir hizmet sunuyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>Şeffaflık ve Etik:</strong> Açık iletişim, şeffaf iş ve dış denetim ve etik kurallara bağlılık temel esaslarımızdır. Ortaklarca denetlenen süreçlerde şeffaflığı koruyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>Çözüm Odaklı Yaklaşım:</strong> Her kooperatifin özgün ihtiyaçlarını karşılayan çözümler sunuyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>Sürdürülebilirlik:</strong> Kooperatifçilikte dijital gelişim ile sürdürülebilir ekonomik faaliyetleri destekliyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>Mevzuat Altyapısı:</strong> Kooperatifler Kanunu esaslarına ve ihtiyaçlara uygun şekilde hizmet ve servislerimizi geliştiriyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>Verimlilik:</strong> Teknolojik altyapımız ve dijital hizmetlerimizle, süreçlerde verimlilik ve kolaylık sağlıyoruz.
                </ValueItem>
                <ValueItem>
                  <strong>İşbirliği ve Güven:</strong> Ortaklar arası güven, dayanışma ve ortak iş yapma kültürünü destekliyoruz. Demokratik bir yaklaşımla, birlikte çalışarak kararların daha etkin bir şekilde alınmasını amaçlıyoruz.
                </ValueItem>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer ref={footerRef} theme="light" />
    </div>
  );
}

export default AboutUsPage;