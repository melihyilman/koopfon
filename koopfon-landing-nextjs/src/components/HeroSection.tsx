import React, { forwardRef } from 'react';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import logoV11 from '@/assets/images/logo-koopfon-2.png';
import buildAsset from '@/assets/images/build-asset.png';
import ApplyButton from './ApplyButton';
import './HeroSection.css';

interface HeroSectionProps {
  'data-theme': string;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((props, ref) => {
  return (
    <section ref={ref} data-theme={props['data-theme']} className="hero-section">
      <div className="container-centered">
        <div className="row align-items-center min-vh-100">
          {/* Left Content */}
          <div className="col-lg-6">
            {/* Logo */}
            <div className="logo-container">
              <img src={logoV11} alt="Koopfon Logo" className="logo" />
            </div>
            
            {/* Main Heading */}
            <div className="hero-text mb-4">
              <h1 className="display-4 fw-bold koopfon-secondary typewriter-text">
                <div className="typewriter-wrapper">
                  <Typewriter
                    options={{
                      strings: [
                        'Küçük bütçeler ile büyük yatırımlar yapın',
                        'Yatırımlarınızı <span class="koopfon-primary">güvenle</span> değerlendirin',
                        'Kooperatif hisselerinizi hızlıca satın',
                        'Kooperatiflerinizi <span class="koopfon-primary">şeffaf bir şekilde</span> yönetin',
                        'Kooperatiflerinizi kolayca <span class="koopfon-primary">kurun</span>'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 55,
                      deleteSpeed: 35,
                    }}
                  />
                </div>
              </h1>
            </div>
            
            {/* Description */}
            <p className="lead text-muted mb-4">
              Bize taleplerinizi iletin, bütçenize uygun doğru yatırımları sizlerle buluşturalım. Daha fazla bilgi için <Link to="/kooperatif-kurmak-için-ortak-ariyoruz" style={{fontWeight: 'bold', color: 'inherit', textDecoration: 'none'}}>tıklayın.</Link>
            </p>
            
            {/* CTA Button */}
            <ApplyButton />
          </div>
          
          {/* Right Content - Build Asset Image */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="hero-image">
              <img src={buildAsset} alt="Building Asset" className="hero-asset-image" />
            </div>
          </div>
        </div>
      </div>
      <a href="#features-section" className="scroll-down-indicator"></a>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;