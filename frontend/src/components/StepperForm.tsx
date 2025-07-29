
import React, { useState } from 'react';
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
} from '@mui/material';
import '../pages/LandingPage.css'; // Stil için

const steps = ['Beklentileriniz', 'Bütçe ve Notlar', 'Kişisel Bilgiler'];

interface StepperFormProps {
  open: boolean;
  handleClose: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    cooperativeInterest: '',
    investmentRegion: '',
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

  const validate = () => {
    const newErrors: any = {};
    if (activeStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'Ad zorunludur.';
      if (!formData.lastName) newErrors.lastName = 'Soyad zorunludur.';
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
      }
      if (!/^(05\d{9})$|^5\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz (örn: 5xxxxxxxxx).';
      }
    }
    if (activeStep === 1) {
        if (formData.budgetMin && isNaN(Number(formData.budgetMin))) {
            newErrors.budgetMin = 'Lütfen sayısal bir değer giriniz.';
        }
        if (formData.budgetMax && isNaN(Number(formData.budgetMax))) {
            newErrors.budgetMax = 'Lütfen sayısal bir değer giriniz.';
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as string]: value,
    }));
  };
  
  const handleSelectChange = (name: string, value: unknown) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form Data Submitted:', formData);
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
            <FormControl fullWidth margin="normal" variant="standard">
              <InputLabel>Yatırımınızı hangi bölgede düşünüyorsunuz?</InputLabel>
              <Select
                variant="standard"
                name="investmentRegion"
                value={formData.investmentRegion}
                onChange={(e) => handleSelectChange('investmentRegion', e.target.value)}
              >
                <MenuItem value="marmara">Marmara</MenuItem>
                <MenuItem value="ege">Ege</MenuItem>
                <MenuItem value="akdeniz">Akdeniz</MenuItem>
                <MenuItem value="ic_anadolu">İç Anadolu</MenuItem>
                <MenuItem value="karadeniz">Karadeniz</MenuItem>
                <MenuItem value="dogu_anadolu">Doğu Anadolu</MenuItem>
                <MenuItem value="guneydogu_anadolu">Güneydoğu Anadolu</MenuItem>
              </Select>
            </FormControl>
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
            <TextField label="Telefon" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" variant="standard" error={!!errors.phone} helperText={errors.phone} />
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{activeStep === steps.length ? 'Teşekkürler' : 'Hemen Başvur'}</DialogTitle>
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
              <Button onClick={handleBack}>
                Geri
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
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
