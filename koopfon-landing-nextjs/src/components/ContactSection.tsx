import React, { useState, ChangeEvent, FormEvent, forwardRef } from 'react';
import { TextField, Button, Box, Snackbar, Alert as MuiAlert, Slide } from '@mui/material';
import './ContactSection.css';

interface AlertProps {
  severity: 'success' | 'error' | 'info' | 'warning';
  children: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactSectionProps {
  'data-theme': string;
}

const ContactSection = forwardRef<HTMLElement, ContactSectionProps>((props, ref) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

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
      reply_to: formData.email,
      submission_date: new Date().toISOString(),
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
        setFormData({ name: '', email: '', phone: '', message: '' });
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
    <>
      <section ref={ref} data-theme={props['data-theme']} id="contact-section" className="contact-section">
        <div className="container-centered">
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
              </div>
            </div>
          </div>
        </div>
      </section>

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
            fontSize: '1.2rem',
            padding: '16px 24px',
            color: (theme) => theme.palette.getContrastText(theme.palette[snackbarSeverity].main),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;