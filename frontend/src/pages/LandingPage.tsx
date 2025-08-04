import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { TextField, Button, Box, Fab, SvgIcon, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Typewriter from 'typewriter-effect';
import logoV11 from '../assets/images/logo-koopfon-2.png';
import buildAsset from '../assets/images/build-asset.png';
import whatKoopfonDoes from '../assets/images/what-koopfon-does.png';
import './LandingPage.css';
import StepperForm from '../components/StepperForm';

// Custom X/Twitter Icon
const XIcon = () => (
  <SvgIcon fontSize="inherit">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function LandingPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [fabStyle, setFabStyle] = useState({});
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme === 'dark') {
              setFabStyle({
                backgroundColor: 'var(--koopfon-primary-background)',
                color: 'var(--koopfon-primary)',
              });
            } else {
              setFabStyle({
                backgroundColor: 'var(--koopfon-primary)',
                color: 'var(--koopfon-white)',
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = [heroRef, featuresRef, contactRef, footerRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    if (name === 'phone') {
      let digits = value.replace(/\D/g, '');

      if (digits.length > 11) {
        digits = digits.substring(0, 11);
      }

      if (digits.length > 0 && digits.charAt(0) !== '0') {
        digits = '0' + digits.slice(1);
      } else if (digits.length === 0) {
        digits = '';
      }

      let formatted = '';
      if (digits.length > 0) {
        formatted = digits.substring(0, 1);
      }
      if (digits.length > 1) {
        formatted += ` ${digits.substring(1, 4)}`;
      }
      if (digits.length > 4) {
        formatted += ` ${digits.substring(4, 7)}`;
      }
      if (digits.length > 7) {
        formatted += ` ${digits.substring(7, 9)}`;
      }
      if (digits.length > 9) {
        formatted += ` ${digits.substring(9, 11)}`;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhoneFocus = () => {
    if (formData.phone === '') {
      setFormData((prev) => ({ ...prev, phone: '0' }));
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.replace(/\D/g, '') === '0') {
      setFormData((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      showSnackbar('Geçerli bir e-posta adresi giriniz.', 'error');
      return;
    }

    const subject = `[KOOPFON] Destek Talebi Hk. - ${formData.name}`;
    const body = `
      Ad Soyad: ${formData.name}
      E-posta: ${formData.email}
      Telefon: ${formData.phone}
      
      Mesaj:
      ${formData.message}
    `;

    const apiPayload = {
      subject,
      body,
      reply_to: formData.email, // Add user's email for the Reply-To header
      submission_date: new Date().toISOString(), // Add submission timestamp
    };

    try {
      const response = await fetch('https://koopfon-797637104173.europe-west1.run.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        showSnackbar('Mesajınız başarıyla gönderildi!', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        showSnackbar(`Mesaj gönderilirken bir hata oluştu: ${errorData.message || response.statusText}`, 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showSnackbar('Mesaj gönderilirken bir ağ hatası oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
    }
  };

  return (
    <div className="koopfon-app">
      {/* Header/Hero Section */}
      <section ref={heroRef} data-theme="light" className="hero-section">
        <div className="container">
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
                Bize taleplerinizi iletin, bütçenize uygun doğru yatırımları sizlerle buluşturalım
              </p>
              
              {/* CTA Button */}
              <button className="btn btn-koopfon-secondary btn-lg px-4 py-2" onClick={handleOpen}>
                Hemen Başvur
              </button>
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

      {/* What Does Koopfon Do Section */}
      <section ref={featuresRef} data-theme="dark" id="features-section" className="features-section">
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

      {/* Contact Section */}
      <section ref={contactRef} data-theme="light" id="contact-section" className="contact-section">
        <div className="container">
          {/* Section Title */}
          <div className="text-center mb-5 contact-title-container">
            <div className="contact-title-badge">
              <h2 className="h3 fw-bold text-white mb-0">Bize Ulaşın</h2>
            </div>
          </div>
          
          <div className="row align-items-center">
            {/* Left Side - Contact Form */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <p className="text-muted mb-4">
                Tüm sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
              
              <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" className="contact-form-box">
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Ad Soyad"
                  variant="filled"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="E-posta"
                  variant="filled"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Telefon"
                  variant="filled"
                  placeholder="0 5xx xxx xx xx"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="message"
                  name="message"
                  label="Mesajınız"
                  variant="filled"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="contact-submit-button"
                >
                  Gönder
                </Button>
              </Box>
            </div>
            
            {/* Right Side - Description */}
            <div className="col-lg-6">
              <div className="contact-info">
                <h3>
                  Kooperatifçilik konusunda sizlere nasıl yardımcı olabileceğimizle ilgili düşüncelerinizi almak isteriz.
                </h3>
                {/* <p className="text-muted">
                  Kooperatifçilik alanında uzman kadromuz ile birlikte, yatırımlarınızı güvenle değerlendirmeniz için size en uygun çözümleri sunuyoruz. Sorularınız için bizimle iletişime geçebilirsiniz.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} data-theme="dark" className="footer-section">
        <div className="container footer-content">
          <div className="row">
            {/* Left - Social Media */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="text-white fw-semibold mb-3">Bizi Takip Edin</h5>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61578509685985&locale=tr_TR" target="_blank" rel="noopener noreferrer" className="social-link me-3"><FacebookIcon /></a>
                <a href="https://www.instagram.com/koopfon/" target="_blank" rel="noopener noreferrer" className="social-link me-3"><InstagramIcon /></a>
                <a href="#"  className="social-link me-3"><LinkedInIcon /></a>
                <a href="#" className="social-link me-3"><LanguageIcon /></a>
                <a href="https://x.com/koopfon" target="_blank" rel="noopener noreferrer" className="social-link"><XIcon /></a>
              </div>
            </div>
            
            {/* Center - Corporate Links */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="text-white fw-semibold mb-3">Kurumsal</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Hakkımızda</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Gizlilik Politikası</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Çerez Politikası</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Bilgi Güvenliği Politikası</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Veri Bilim Aydınlatma Metni</a></li>
                <li><a href="#" className="footer-link">Açık Rıza Politikası</a></li>
              </ul>
            </div>
            
            {/* Right - Legal */}
            <div className="col-md-4">
              <h5 className="text-white fw-semibold mb-3">Yasal Bilgiler</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Yatırım ve İşlem Rehberi</a></li>
                <li><a href="#" className="footer-link">Şikayet Politikası</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <hr className="border-white-50 my-4" />
          <div className="text-center">
            <p className="text-white-50 small mb-0">
              Copyright © 2025 KOOPFON. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {showScrollButton && (
        <Fab
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            ...fabStyle,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
      <StepperForm open={open} handleClose={handleClose} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '1.2rem', // Make text larger
            padding: '16px 24px', // Increase padding
            color: (theme) => theme.palette.getContrastText(theme.palette[snackbarSeverity].main), // Ensure contrasting text color
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LandingPage;