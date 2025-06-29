import React, { useState } from 'react';
import {
  Typography, TextField, Button, Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid,
  Stack, Chip, Divider, InputAdornment
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NumbersIcon from '@mui/icons-material/Numbers';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import WarningIcon from '@mui/icons-material/Warning';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CoffinIcon from '@mui/icons-material/LocalHospital'; // Using LocalHospital as a placeholder for Coffin/Death icon

// Mock data for partners
type Partner = {
  id: string;
  ortaklikNo: string;
  type: 'Gerçek' | 'Tüzel';
  isimUnvan: string; // For both real and legal entities
  firstName?: string;
  lastName?: string;
  tckn?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email: string;
  address: string;
  status: string;
  shareCount: number;
  startDate: string;
  // Expulsion details
  reason?: string;
  firstWarningDate?: string;
  firstWarningNumber?: string;
  boardDecisionDate?: string;
  boardDecisionNumber?: string;
  // Transfer details
  transferDirection?: 'Gelen' | 'Giden';
  counterpartyMembershipEventId?: string;
  // Death details
  dateOfDeath?: string;
  // Legal Entity specific
  mersisNo?: string;
  vergiNo?: string;
  kurulusTipi?: string;
};

const initialPartners: Partner[] = [
  {
    id: '1',
    ortaklikNo: '1000',
    isimUnvan: 'Ali Veli',
    firstName: 'Ali',
    lastName: 'Veli',
    tckn: '11111111111',
    dateOfBirth: '1980-01-01',
    phoneNumber: '5551234567',
    email: 'ali.veli@example.com',
    address: 'Örnek Mah. Örnek Cad. No:1, Örnek İlçe/Örnek İl',
    status: 'Halen Ortak',
    shareCount: 100,
    startDate: '2020-01-01',
    type: 'Gerçek'
  },
  {
    id: '2',
    ortaklikNo: '1001',
    isimUnvan: 'ABC Ticaret A.Ş.',
    type: 'Tüzel',
    mersisNo: '0000000000000001',
    vergiNo: '1234567890',
    kurulusTipi: 'ŞİRKET',
    phoneNumber: '5557654321',
    email: 'info@abcticaret.com',
    address: 'Ticaret Merkezi, No:5, İş Merkezi/Büyükşehir',
    status: 'Halen Ortak',
    shareCount: 500,
    startDate: '2019-05-10',
  },
  {
    id: '3',
    ortaklikNo: '1002',
    isimUnvan: 'Ayşe Yılmaz',
    type: 'Gerçek',
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    tckn: '22222222222',
    dateOfBirth: '1975-03-15',
    phoneNumber: '5559876543',
    email: 'ayse.yilmaz@example.com',
    address: 'Gül Sok. No:7, Huzur Mah./Küçük İlçe',
    status: 'Ortaklıktan Çıktı',
    shareCount: 50,
    startDate: '2018-01-01',
    reason: 'Kendi isteğiyle ayrıldı.',
    boardDecisionDate: '2024-01-20',
    boardDecisionNumber: '2024/05',
  },
  {
    id: '4',
    ortaklikNo: '1003',
    isimUnvan: 'Mehmet Can',
    type: 'Gerçek',
    firstName: 'Mehmet',
    lastName: 'Can',
    tckn: '33333333333',
    dateOfBirth: '1990-07-22',
    phoneNumber: '5551112233',
    email: 'mehmet.can@example.com',
    address: 'Yeni Cad. No:12, Merkez Mah./Merkez İlçe',
    status: 'Ortaklığı Devretti',
    shareCount: 200,
    startDate: '2021-02-01',
    transferDirection: 'Giden',
    counterpartyMembershipEventId: 'transfer_event_001',
  },
  {
    id: '5',
    ortaklikNo: '1004',
    isimUnvan: 'Zeynep Ak',
    type: 'Gerçek',
    firstName: 'Zeynep',
    lastName: 'Ak',
    tckn: '44444444444',
    dateOfBirth: '1960-11-05',
    phoneNumber: '5554445566',
    email: 'zeynep.ak@example.com',
    address: 'Çiçek Sok. No:3, Eski Mah./Eski İlçe',
    status: 'Vefat Etti',
    shareCount: 75,
    startDate: '2017-08-01',
    dateOfDeath: '2023-10-25',
  },
];

const emptyPartner: Partner = {
  id: '',
  ortaklikNo: '',
  type: 'Gerçek', // Default to Gerçek
  isimUnvan: '',
  firstName: '',
  lastName: '',
  tckn: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  address: '',
  status: 'Halen Ortak', // Default status
  shareCount: 0,
  startDate: new Date().toISOString().split('T')[0], // Current date
};

const PartnerDetailPage: React.FC = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const [partner, setPartner] = useState<Partner>(
    isNew ? emptyPartner : initialPartners.find(p => p.id === id) || emptyPartner
  );

  // If partner is not found and it's not a new entry, display error
  if (!partner && !isNew) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          😔 Ortak bulunamadı!
        </Typography>
        <Button component={RouterLink} to="/partners" variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Ortaklar Listesine Geri Dön
        </Button>
      </Box>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setPartner(prev => {
      if (!prev) return prev;
      const updatedPartner = {
        ...prev,
        [name as string]: value,
      };

      // Update isimUnvan for Gerçek type
      if (updatedPartner.type === 'Gerçek' && (name === 'firstName' || name === 'lastName')) {
        updatedPartner.isimUnvan = `${updatedPartner.firstName || ''} ${updatedPartner.lastName || ''}`.trim();
      }
      return updatedPartner;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile kaydet
    alert('Kaydedildi!');
  };

  return (
    <Box>
      <Button component={RouterLink} to="/partners" variant="outlined" startIcon={<ArrowBackIcon />}>
        Ortaklar Listesine Geri Dön
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {isNew ? '➕ Yeni Ortak Ekle' : `👤 Ortak Detay: ${partner?.isimUnvan}`}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSave}>
          <Typography variant="h6" gutterBottom>Genel Bilgiler</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ortaklık No"
                name="ortaklikNo"
                value={partner?.ortaklikNo || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ortak Tipi</InputLabel>
                <Select
                  name="type"
                  value={partner?.type || ''}
                  label="Ortak Tipi"
                  onChange={handleInputChange}
                  startAdornment={<InputAdornment position="start"><InfoIcon sx={{ mr: 1 }} /></InputAdornment>}
                >
                  <MenuItem value="Gerçek">Gerçek Kişi</MenuItem>
                  <MenuItem value="Tüzel">Tüzel Kişi</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {partner?.type === 'Gerçek' ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Adı"
                    name="firstName"
                    value={partner?.firstName || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Soyadı"
                    name="lastName"
                    value={partner?.lastName || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="TC Kimlik No"
                    name="tckn"
                    value={partner?.tckn || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Doğum Tarihi"
                    name="dateOfBirth"
                    type="date"
                    value={partner?.dateOfBirth || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Unvan"
                    name="isimUnvan"
                    value={partner?.isimUnvan || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mersis No"
                    name="mersisNo"
                    value={partner?.mersisNo || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vergi No"
                    name="vergiNo"
                    value={partner?.vergiNo || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Kuruluş Tipi</InputLabel>
                    <Select
                      name="kurulusTipi"
                      value={partner?.kurulusTipi || ''}
                      label="Kuruluş Tipi"
                      onChange={handleInputChange}
                      startAdornment={<InputAdornment position="start"><BusinessIcon sx={{ mr: 1 }} /></InputAdornment>}
                    >
                      <MenuItem value="KOOPERATIF">KOOPERATİF</MenuItem>
                      <MenuItem value="ŞİRKET">ŞİRKET</MenuItem>
                      <MenuItem value="DERNEK">DERNEK</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefon"
                name="phoneNumber"
                value={partner?.phoneNumber || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={partner?.email || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adres"
                name="address"
                value={partner?.address || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Ortaklık Durumu</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={partner?.status || ''}
                  label="Durum"
                  onChange={handleInputChange}
                  startAdornment={<InputAdornment position="start"><InfoIcon sx={{ mr: 1 }} /></InputAdornment>}
                >
                  <MenuItem value="Halen Ortak">Halen Ortak</MenuItem>
                  <MenuItem value="Ortaklıktan Çıktı">Ortaklıktan Çıktı</MenuItem>
                  <MenuItem value="Ortaklığı Devretti">Ortaklığı Devretti</MenuItem>
                  <MenuItem value="Hatalı Giriş">Hatalı Giriş</MenuItem>
                  <MenuItem value="Ortaklıktan İhraç Edildi">Ortaklıktan İhraç Edildi</MenuItem>
                  <MenuItem value="Ortaklığı Devraldı">Ortaklığı Devraldı</MenuItem>
                  <MenuItem value="Vefat Etti">Vefat Etti</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pay Adedi"
                name="shareCount"
                type="number"
                value={partner?.shareCount || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ortaklık Başlangıç Tarihi"
                name="startDate"
                type="date"
                value={partner?.startDate || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon sx={{ mr: 1 }} /></InputAdornment> }}
              />
            </Grid>

            {/* Dynamic fields based on status */}
            {partner?.status === 'Ortaklıktan İhraç Edildi' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="İhraç Sebebi" name="reason" value={partner.reason || ''} onChange={handleInputChange} fullWidth margin="normal" multiline rows={2} InputProps={{ startAdornment: <InputAdornment position="start"><GavelIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="1. İhtarnamenin Tarihi" name="firstWarningDate" type="date" value={partner.firstWarningDate || ''} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><WarningIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="1. İhtarname No" name="firstWarningNumber" value={partner.firstWarningNumber || ''} onChange={handleInputChange} fullWidth margin="normal" InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Yönetim Kurulu Karar Tarihi" name="boardDecisionDate" type="date" value={partner.boardDecisionDate || ''} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Yönetim Kurulu Karar No" name="boardDecisionNumber" value={partner.boardDecisionNumber || ''} onChange={handleInputChange} fullWidth margin="normal" InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
              </>
            )}

            {partner?.status === 'Ortaklığı Devretti' && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Transfer Yönü</InputLabel>
                    <Select
                      name="transferDirection"
                      value={partner.transferDirection || ''}
                      label="Transfer Yönü"
                      onChange={handleInputChange}
                      startAdornment={<InputAdornment position="start"><SwapHorizIcon /></InputAdornment>}
                    >
                      <MenuItem value="Gelen">Gelen</MenuItem>
                      <MenuItem value="Giden">Giden</MenuItem>
                    </Select>
                      </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Karşı Taraf Üyelik Olayı ID" name="counterpartyMembershipEventId" value={partner.counterpartyMembershipEventId || ''} onChange={handleInputChange} fullWidth margin="normal" InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
              </>
            )}

            {partner?.status === 'Vefat Etti' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="Vefat Tarihi" name="dateOfDeath" type="date" value={partner.dateOfDeath || ''} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><CoffinIcon sx={{ mr: 1 }} /></InputAdornment> }} />
                </Grid>
              </>
            )}
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PartnerDetailPage;
