import React, { useState } from 'react';
import {
  Typography, Box, Paper, Tabs, Tab, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CooperativeDetailPage: React.FC = () => {
  const { id } = useParams();
  const isNew = !id;
  const [value, setValue] = useState(0);

  // Mock data for cooperative details
  const cooperativeDetails = {
    unvan: 'Örnek Kooperatif A.Ş.',
    hukukiDurum: 'KURULUŞ',
    sonGenelKurulTarihi: '30/06/2022',
    merkezIl: 'ADIYAMAN',
    tescilTarihi: '14/10.2020',
    mevcutOrtakSayisi: 618,
    gorevdeYKuyeSayisi: 13,
    gorevdeDKuyeSayisi: 6,
    arsivNo: 'K-12345',
    mersisNo: '0000000000000001',
    kurulusTipi: 'KOOPERATİF',
    kooperatifTuru: 'ÜRETİM VE PAZARLAMA KOOPERATİFİ',
    aciklama: 'Bu bir örnek kooperatiftir. Tarım ürünleri üretimi ve pazarlaması konusunda faaliyet göstermektedir. Bölgesel çapta önemli bir kooperatiftir.',
    dosyaNo: '12345',
    naceKodu: 'A.01.11',
    merkezIlce: 'ADIYAMAN MERKEZ',
    faaliyetBolgesi: 'Bölgesel',
    calismaKonusu: 'Tarım Ürünleri Üretimi, Pazarlaması ve Destek Hizmetleri',
    // Add more fields as per db.txt and PDF
  };

  // Dummy data for tabs
  const partners = [
    { id: 1, name: 'Ali Yılmaz', share: 100, status: 'Aktif', type: 'Gerçek Kişi' },
    { id: 2, name: 'Ayşe Demir', share: 50, status: 'Aktif', type: 'Gerçek Kişi' },
    { id: 3, name: 'ABC Gıda Ltd. Şti.', share: 200, status: 'Aktif', type: 'Tüzel Kişi' },
    { id: 4, name: 'Fatma Can', share: 75, status: 'Pasif', type: 'Gerçek Kişi' },
  ];

  const boardMembers = [
    { id: 1, name: 'Ahmet Kaya', position: 'Başkan', startDate: '01.01.2023', endDate: '01.01.2026' },
    { id: 2, name: 'Zeynep Ak', position: 'Başkan Yardımcısı', startDate: '01.01.2023', endDate: '01.01.2026' },
    { id: 3, name: 'Mustafa Deniz', position: 'Üye', startDate: '01.01.2023', endDate: '01.01.2026' },
  ];

  const auditBoardMembers = [
    { id: 1, name: 'Elif Güneş', position: 'Başkan', startDate: '01.01.2024', endDate: '01.01.2027' },
    { id: 2, name: 'Can Yıldız', position: 'Üye', startDate: '01.01.2024', endDate: '01.01.2027' },
  ];

  const financialData = [
    { name: '2022', gelir: 400000, gider: 240000, kar: 160000 },
    { name: '2023', gelir: 550000, gider: 300000, kar: 250000 },
    { name: '2024', gelir: 600000, gider: 450000, kar: 150000 },
  ];

  const realEstateHoldings = [
    { id: 1, address: 'Merkez Mah. Kooperatif Cad. No:10', area: 500, value: '1.000.000 TL', type: 'Bina' },
    { id: 2, address: 'Tarla Köyü Mevkii No:20', area: 2000, value: '500.000 TL', type: 'Tarla' },
  ];

  const financialDocuments = [
    { id: 1, name: '2023 Yılı Bilanço', type: 'Bilanço', date: '31.12.2023', file: 'bilanco_2023.pdf' },
    { id: 2, name: '2024 Yılı Gelir Tablosu', type: 'Gelir Tablosu', date: '31.12.2024', file: 'gelir_2024.pdf' },
  ];

  const generalMeetings = [
    { id: 'gm1', date: '15.03.2023', topic: 'Yıllık Olağan Genel Kurul', status: 'Yapıldı' },
    { id: 'gm2', date: '20.09.2024', topic: 'Olağanüstü Genel Kurul', status: 'Yapıldı' },
    { id: 'gm3', date: '10.03.2025', topic: 'Yıllık Olağan Genel Kurul', status: 'Planlandı' },
  ];

  const auditorInfo = {
    name: 'Denetçi Adı Soyadı',
    firm: 'Denetim Firması A.Ş.',
    contactEmail: 'denetci@example.com',
    contactPhone: '+90 212 123 45 67',
    lastAuditDate: '01.05.2025',
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!cooperativeDetails && !isNew) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          😔 Kooperatif bulunamadı!
        </Typography>
        <Button component={RouterLink} to="/cooperatives" variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Kooperatif Listesine Geri Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button component={RouterLink} to="/cooperatives" variant="outlined" startIcon={<ArrowBackIcon />}>
        Kooperatif Listesine Geri Dön
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        🏢 {isNew ? 'Yeni Kooperatif Oluştur' : `Kooperatif Detay: ${cooperativeDetails.unvan}`}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <InfoIcon color="action" />
              <Typography variant="subtitle1">Hukuki Durum:</Typography>
            </Stack>
            <Typography variant="h6" color="primary">{cooperativeDetails.hukukiDurum}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarTodayIcon color="action" />
              <Typography variant="subtitle1">En Son Yapılan Genel Kurul Tarihi:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.sonGenelKurulTarihi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnIcon color="action" />
              <Typography variant="subtitle1">Merkez İl:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.merkezIl}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarTodayIcon color="action" />
              <Typography variant="subtitle1">Tescil Tarihi:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.tescilTarihi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleIcon color="action" />
              <Typography variant="subtitle1">Mevcut Ortak Sayısı:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.mevcutOrtakSayisi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <GroupIcon color="action" />
              <Typography variant="subtitle1">Görevde Olan Y.K. Üye Sayısı:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.gorevdeYKuyeSayisi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon color="action" />
              <Typography variant="subtitle1">Görevde Olan D.K. Üye Sayısı:</Typography>
            </Stack>
            <Typography variant="h6">{cooperativeDetails.gorevdeDKuyeSayisi}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} aria-label="cooperative detail tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Kooperatif Kartı" {...a11yProps(0)} />
          <Tab label="Ortaklar" {...a11yProps(1)} />
          <Tab label="Organlar" {...a11yProps(2)} />
          <Tab label="Koopbis Yetkilisi" {...a11yProps(3)} />
          <Tab label="İdari/Mali Durum" {...a11yProps(4)} />
          <Tab label="Genel Kurul" {...a11yProps(5)} />
          <Tab label="Denetçi" {...a11yProps(6)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="h6" gutterBottom>Özlük Bilgileri</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Unvan" value={cooperativeDetails.unvan} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <InfoIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Hukuki Durum" value={cooperativeDetails.hukukiDurum} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <AccountBalanceIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Arşiv No" value={cooperativeDetails.arsivNo} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <DescriptionIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Mersis No" value={cooperativeDetails.mersisNo} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <InfoIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Merkez İl" value={cooperativeDetails.merkezIl} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <LocationOnIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Kuruluş Tipi" value={cooperativeDetails.kurulusTipi} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <BusinessIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Kooperatif Türü" value={cooperativeDetails.kooperatifTuru} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <GroupIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Açıklama" value={cooperativeDetails.aciklama} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <DescriptionIcon sx={{ mr: 1 }} /> }} multiline rows={2} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Dosya No" value={cooperativeDetails.dosyaNo} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <DescriptionIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Nace Kodu" value={cooperativeDetails.naceKodu} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <BusinessIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Merkez İlçe" value={cooperativeDetails.merkezIlce} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <LocationOnIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Faaliyet Bölgesi" value={cooperativeDetails.faaliyetBolgesi} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <LocationOnIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Çalışma Konusu" value={cooperativeDetails.calismaKonusu} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <DescriptionIcon sx={{ mr: 1 }} /> }} multiline rows={2} />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary">Düzenle</Button>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>Ortaklar</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Pay</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell>Tip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.id}</TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.share}</TableCell>
                  <TableCell>
                    <Chip
                      label={partner.status}
                      color={partner.status === 'Aktif' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{partner.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>Organlar</Typography>
        <Typography variant="subtitle1" mt={2}>Yönetim Kurulu Üyeleri</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Pozisyon</TableCell>
                <TableCell>Başlangıç Tarihi</TableCell>
                <TableCell>Bitiş Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boardMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.startDate}</TableCell>
                  <TableCell>{member.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" mt={4}>Denetim Kurulu Üyeleri</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Pozisyon</TableCell>
                <TableCell>Başlangıç Tarihi</TableCell>
                <TableCell>Bitiş Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditBoardMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.startDate}</TableCell>
                  <TableCell>{member.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h6" gutterBottom>Koopbis Yetkilisi</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Adı Soyadı" value="Yetkili Adı Soyadı" fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <PersonIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="E-posta" value="yetkili@example.com" fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <EmailIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Telefon" value="+90 5XX XXX XX XX" fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <PhoneIcon sx={{ mr: 1 }} /> }} />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Typography variant="h6" gutterBottom>İdari/Mali Durum</Typography>
        <Typography variant="subtitle1" mt={2}>Finansal Özet (Gelir/Gider)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gelir" fill="#82ca9d" name="Gelir" />
            <Bar dataKey="gider" fill="#8884d8" name="Gider" />
            <Bar dataKey="kar" fill="#ffc107" name="Kar" />
          </BarChart>
        </ResponsiveContainer>

        <Typography variant="subtitle1" mt={4}>Gayrimenkul Bilgileri</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Adres</TableCell>
                <TableCell>Alan (m²)</TableCell>
                <TableCell>Değer</TableCell>
                <TableCell>Tip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {realEstateHoldings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell>{holding.address}</TableCell>
                  <TableCell>{holding.area}</TableCell>
                  <TableCell>{holding.value}</TableCell>
                  <TableCell>{holding.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" mt={4}>Finansal Belgeler</Typography>
        <List>
          {financialDocuments.map((doc) => (
            <ListItem key={doc.id} secondaryAction={
              <Button variant="outlined" size="small" startIcon={<AttachFileIcon />}>
                Görüntüle
              </Button>
            }>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={doc.name} secondary={`${doc.type} - ${doc.date}`} />
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <Typography variant="h6" gutterBottom>Genel Kurul</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tarih</TableCell>
                <TableCell>Konu</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {generalMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.topic}</TableCell>
                  <TableCell>
                    <Chip
                      label={meeting.status}
                      color={meeting.status === 'Yapıldı' ? 'success' : 'info'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button component={RouterLink} to={`/general-meetings/${meeting.id}`} variant="outlined" size="small" startIcon={<LaunchIcon />}>
                      İncele
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={6}>
        <Typography variant="h6" gutterBottom>Denetçi</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Adı Soyadı" value={auditorInfo.name} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <PersonIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Firma" value={auditorInfo.firm} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <BusinessIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="E-posta" value={auditorInfo.contactEmail} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <EmailIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Telefon" value={auditorInfo.contactPhone} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <PhoneIcon sx={{ mr: 1 }} /> }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Son Denetim Tarihi" value={auditorInfo.lastAuditDate} fullWidth margin="normal" InputProps={{ readOnly: true, startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} /> }} />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default CooperativeDetailPage;