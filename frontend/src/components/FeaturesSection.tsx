import React, { forwardRef } from 'react';
import whatKoopfonDoes from '../assets/images/what-koopfon-does.png';
import './FeaturesSection.css';

interface FeaturesSectionProps {
  'data-theme': string;
}

const FeaturesSection = forwardRef<HTMLElement, FeaturesSectionProps>((props, ref) => {
  return (
    <section ref={ref} data-theme={props['data-theme']} id="features-section" className="features-section">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5">
          <div className="section-title-badge">
            <h2 className="h3 fw-bold mb-0">koopfon ne yapar?</h2>
          </div>
        </div>
        
        <div className="row align-items-center">
          {/* Left Side - Graphics */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="graphics-container text-center">
              <img src={whatKoopfonDoes} alt="What Koopfon Does" className="img-fluid" />
            </div>
          </div>
          
          {/* Right Side - Features */}
          <div className="col-lg-6">
            <p className="text-white fs-5 mb-4">
              Koopfon platformu ile bireysel yatırımlarınızı yönetebilir, kooperatifleriniz için dijital hizmetlerden yararlanabilirsiniz.
            </p>
            
            {/* Feature Cards */}
            <div className="features-list">
              {/* Feature 1 */}
              <div className="feature-card mb-3">
                <div className="d-flex align-items-start">
                  <div className="feature-number">
                    <span>1</span>
                  </div>
                  <div className="feature-content">
                    <h5 className="text-white fw-semibold mb-2">Yatırım Fikrini Kooperatifleştirme</h5>
                    <p className="text-white-50 small mb-0">
                      Yatırım bütçesi ve çeşidine uygun tüm yatırımcıları buluşturarak kooperatifleşmeyi, küçük bütçeler ile büyük yatırımlar yapabilmeyi sağlıyoruz. Sizin adınıza araştırma yaparak uygun yatırım fırsatları sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="feature-card mb-3">
                <div className="d-flex align-items-start">
                  <div className="feature-number">
                    <span>2</span>
                  </div>
                  <div className="feature-content">
                    <h5 className="text-white fw-semibold mb-2">Ortak olma ve Hisse devri</h5>
                    <p className="text-white-50 small mb-0">
                      Kooperatif hisseleri alım ve satım işlemlerinizi kolay, hızlı ve güvenli bir şekilde yapabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="feature-card mb-3">
                <div className="d-flex align-items-start">
                  <div className="feature-number">
                    <span>3</span>
                  </div>
                  <div className="feature-content">
                    <h5 className="text-white fw-semibold mb-2">Kooperatif Yönetimi</h5>
                    <p className="text-white-50 small mb-0">
                      Mevzuata uygun dijital kooperatifçilik hizmetlerimizle, yatırımlarınızı tek bir platform üzerinden hızlı, kolay, şeffaf ve güvenilir bir şekilde yönetebilmenizi sağlıyoruz.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="feature-card">
                <div className="d-flex align-items-start">
                  <div className="feature-number">
                    <span>4</span>
                  </div>
                  <div className="feature-content">
                    <h5 className="text-white fw-semibold mb-2">Kooperatif Kurulumu</h5>
                    <p className="text-white-50 small mb-0">
                      Kooperatif kurulum süreçlerindeki tüm aşamaları dijitalleştirerek, sizlere daha kolay ve öngörülebilen bir hizmet sunuyoruz. Süreçlerin tüm adımlarında sizlere destek veriyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;