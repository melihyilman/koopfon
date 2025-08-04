import React from 'react';
import { SvgIcon } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

// Custom X/Twitter Icon
const XIcon = () => (
  <SvgIcon fontSize="inherit">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);

interface FooterProps {
  theme?: 'light' | 'dark';
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(({ theme = 'dark' }, ref) => {
  const footerClasses = `footer-section ${theme === 'light' ? 'footer-light' : ''}`;

  return (
    <footer ref={ref} data-theme={theme} className={footerClasses}>
      <div className="container footer-content">
        <div className="row">
          {/* Left - Social Media */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-semibold mb-3">Bizi Takip Edin</h5>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61578509685985&locale=tr_TR" target="_blank" rel="noopener noreferrer" className="social-link me-3"><FacebookIcon /></a>
              <a href="https://www.instagram.com/koopfon/" target="_blank" rel="noopener noreferrer" className="social-link me-3"><InstagramIcon /></a>
              <a href="#" className="social-link me-3"><LinkedInIcon /></a>
              <Link to="/" className="social-link me-3"><LanguageIcon /></Link>
              <a href="https://x.com/koopfon" target="_blank" rel="noopener noreferrer" className="social-link"><XIcon /></a>
            </div>
          </div>

          {/* Center - Corporate Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-semibold mb-3">Kurumsal</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/hakkimizda" className="footer-link">Hakkımızda</Link></li>
              <li className="mb-2"><a href="#" className="footer-link">Gizlilik Politikası</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Çerez Politikası</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Bilgi Güvenliği Politikası</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Veri Bilim Aydınlatma Metni</a></li>
              <li><a href="#" className="footer-link">Açık Rıza Politikası</a></li>
            </ul>
          </div>

          {/* Right - Legal */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3">Yasal Bilgiler</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="footer-link">Yatırım ve İşlem Rehberi</a></li>
              <li><a href="#" className="footer-link">Şikayet Politikası</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <hr className="my-4" />
        <div className="text-center">
          <p className="small mb-0">
            Copyright © 2025 KOOPFON. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;