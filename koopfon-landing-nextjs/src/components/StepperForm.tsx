import React, { useState, useEffect } from 'react';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  InputAdornment,
  FormHelperText,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const steps = ['Beklentileriniz', 'Bütçe ve Notlar', 'Kişisel Bilgiler'];

interface StepperFormProps {
  open: boolean;
  handleClose: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    cooperativeInterest: '',
    city: '',
    district: '',
    previousMembership: '',
    budgetMin: '',
    budgetMax: '',
    notes: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    profession: '',
    education: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch('https://turkiyeapi.dev/api/v1/provinces')
      .then((response) => response.json())
      .then((data) => setCities(data.data));
  }, []);

  useEffect(() => {
    if (formData.city) {
      fetch(`https://turkiyeapi.dev/api/v1/provinces/${formData.city}`)
        .then((response) => response.json())
        .then((data) => setDistricts(data.data.districts));
    } else {
      setDistricts([]);
    }
  }, [formData.city]);

  const validate = () => {
    const newErrors: any = {};
    if (activeStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'Ad zorunludur.';
      if (!formData.lastName) newErrors.lastName = 'Soyad zorunludur.';
      if (!formData.email) {
        newErrors.email = 'E-posta adresi zorunludur.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
      }
      if (!/^0\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(formData.phone)) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz (örn: 0 5xx xxx xx xx).';
      }
    }
    if (activeStep === 1) {
        if (formData.budgetMin && isNaN(Number(formData.budgetMin))) {
            newErrors.budgetMin = 'Lütfen sayısal bir değer giriniz.';
        }
        if (formData.budgetMax && isNaN(Number(formData.budgetMax))) {
            newErrors.budgetMax = 'Lütfen sayısal bir değer giriniz.';
        }
        if (Number(formData.budgetMin) > Number(formData.budgetMax)) {
            newErrors.budgetMax = 'Bütçe üst limiti, alt limitten küçük olamaz.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

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
  
  const handleSelectChange = (name: string, value: unknown) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === 'city' && { district: '' }),
    }));
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

  const handleSubmit = () => {
    if (validate()) {
      const subject = `[KOOPFON] Yeni Başvuru: ${formData.firstName} ${formData.lastName}`;
      const body = `
        Kooperatif İlgisi: ${formData.cooperativeInterest}
        Şehir: ${formData.city}
        İlçe: ${formData.district}
        Daha Önceki Üyelik: ${formData.previousMembership}
        Bütçe Aralığı: ${formData.budgetMin} - ${formData.budgetMax}
        Notlar: ${formData.notes}
        Ad: ${formData.firstName}
        Soyad: ${formData.lastName}
        Telefon: ${formData.phone}
        E-posta: ${formData.email}
        Meslek: ${formData.profession}
        Eğitim Durumu: ${formData.education}
      `;

      window.location.href = `mailto:info@koopfon.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      handleNext(); // Teşekkürler sayfasına git
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Beklentilerinizi daha detaylı öğrenip size en uygun projeleri sunmayı hedefliyoruz.
            </Typography>
            <FormControl fullWidth margin="normal" variant="standard">
              <InputLabel>Ne tür kooperatif ile ilgileniyorsunuz?</InputLabel>
              <Select
                variant="standard"
                name="cooperativeInterest"
                value={formData.cooperativeInterest}
                onChange={(e) => handleSelectChange('cooperativeInterest', e.target.value)}
              >
                <MenuItem value="housing">Konut Kooperatifi</MenuItem>
                <MenuItem value="agricultural">Tarım Kooperatifi</MenuItem>
                <MenuItem value="consumer">Tüketim Kooperatifi</MenuItem>
                <MenuItem value="business">İşletme Kooperatifi</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: isMobile ? 'block' : 'flex', gap: 2 }}>
            <FormControl fullWidth margin="normal" variant="standard">
            <InputLabel>Yatırımınızı Hangi bölgede düşünüyorsunuz ?</InputLabel>
              <Select
                variant="standard"
                name="city"
                value={formData.city}
                onChange={(e) => handleSelectChange('city', e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
            <FormControl fullWidth margin="normal" variant="standard">
              <InputLabel>Daha önce kooperatif üyeliğiniz oldu mu?</InputLabel>
              <Select
                variant="standard"
                name="previousMembership"
                value={formData.previousMembership}
                onChange={(e) => handleSelectChange('previousMembership', e.target.value)}
              >
                <MenuItem value="yes">Evet</MenuItem>
                <MenuItem value="no">Hayır</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Bütçe Alt Limit"
              name="budgetMin"
              value={formData.budgetMin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={!!errors.budgetMin}
              helperText={errors.budgetMin}
              InputProps={{
                startAdornment: <InputAdornment position="start">TL</InputAdornment>,
              }}
            />
            <TextField
              label="Bütçe Üst Limit"
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={!!errors.budgetMax}
              helperText={errors.budgetMax}
              InputProps={{
                startAdornment: <InputAdornment position="start">TL</InputAdornment>,
              }}
            />
            <TextField
              label="İletmek istediğiniz notlar"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              variant="standard"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField label="Ad" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" variant="standard" error={!!errors.firstName} helperText={errors.firstName} />
            <TextField label="Soyad" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" variant="standard" error={!!errors.lastName} helperText={errors.lastName} />
            <TextField label="Telefon" name="phone" value={formData.phone} onChange={handleChange} onFocus={handlePhoneFocus} onBlur={handlePhoneBlur} fullWidth margin="normal" variant="standard" error={!!errors.phone} helperText={errors.phone} />
            <TextField label="E-posta" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard" error={!!errors.email} helperText={errors.email} />
            <TextField label="Mesleğiniz" name="profession" value={formData.profession} onChange={handleChange} fullWidth margin="normal" variant="standard" />
            <TextField label="Eğitim Durumunuz" name="education" value={formData.education} onChange={handleChange} fullWidth margin="normal" variant="standard" />
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { backgroundColor: 'var(--koopfon-primary-background)' } }}>
      <DialogTitle>
        {activeStep === steps.length ? 'Teşekkürler' : 'Hemen Başvur'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[800],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>Teşekkürler</Typography>
            <Typography variant="body1">
              Bilgilerinizi aldık, size en uygun projeleri sunmayı hedefliyoruz. En kısa sürede sizinle paylaşacağız.
            </Typography>
          </Box>
        ) : (
          <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box>
              {getStepContent(activeStep)}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep === steps.length ? (
          <Button onClick={handleClose} color="primary" variant="contained">
            Kapat
          </Button>
        ) : (
          <>
            {activeStep !== 0 && (
              <Button 
                onClick={handleBack}
                sx={{
                  backgroundColor: 'var(--koopfon-secondary-button)',
                  color:'white',
                  '&:hover': {
                    backgroundColor: 'var(--koopfon-green-light)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(var(--koopfon-primary-rgb), 0.3)',
                  },
                }}
              >
                Geri
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              sx={{
                backgroundColor: 'var(--koopfon-primary)',
                '&:hover': {
                  backgroundColor: 'var(--koopfon-green-light)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(var(--koopfon-primary-rgb), 0.3)',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Gönder' : 'Devam'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StepperForm;