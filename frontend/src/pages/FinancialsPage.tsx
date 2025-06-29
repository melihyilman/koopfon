import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import {
  Typography, Box, Paper, Tabs, Tab, TextField, Grid, Button, Collapse, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
      id={`financial-tabpanel-${index}`}
      aria-labelledby={`financial-tab-${index}`}
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
    id: `financial-tab-${index}`,
    'aria-controls': `financial-tabpanel-${index}`,
  };
}

const FinancialsPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // Mock data for financial summary
  const financialSummary = {
    hesapDonemiBaslangic: '01/01/2021',
    hesapDonemiBitis: '31/12/2021',
    genelKurulOdenek: 100,
    sigortaPrimi: 100,
    personelSayisi: 100,
  };

  // Mock data for real estate holdings
  const realEstateHoldings = [
    {
      id: '1',
      propertyType: 'TARLA',
      address: 'Güzelhisar, İstiklal Cad. No:4, 09100 Efeler/Aydın',
      city: 'AYDIN',
      district: 'AYDIN',
      sheetNo: '100/01',
      parcelNo: '120/02',
      areaSqm: 1000,
      estimatedValue: 1000000,
    },
  ];

  // Mock data for affiliate participations
  const affiliateParticipations = [
    {
      id: '1',
      affiliateName: 'TÜRK EKONOMİ BANKASI ANONİM ŞİRKETİ',
      mersisNo: '0876004342000105',
      taxId: '8760043420',
      shareRatio: 0.05,
      capitalAmount: 10000000,
    },
  ];

  // Mock data for documents
  const documents = [
    { id: '1', type: 'YÖNETİM KURULU FAALİYET RAPORU', description: '' },
    { id: '2', type: 'DENETÇİ RAPORU', description: '' },
    { id: '3', type: 'BİLANÇO', description: '' },
    { id: '4', type: 'GELİR-GİDER TABLOSU', description: '' },
  ];

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        İdari/Mali Durum
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleToggleFilters} startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {showFilters ? 'Gelişmiş filtreleri gizle' : 'Gelişmiş filtreleri göster'}
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Temizle
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mb: 2 }}>
          <Typography variant="h6" gutterBottom>Filtreler</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Hesap Dönemi Başlangıç Tarihi" fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Hesap Dönemi Bitiş Tarihi" fullWidth size="small" />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} aria-label="financial tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Finansal Bilgiler" {...a11yProps(0)} />
          <Tab label="Gayrimenkul" {...a11yProps(1)} />
          <Tab label="Raporlar" {...a11yProps(2)} />
          <Tab label="İştirakler" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="h6" gutterBottom>Finansal Bilgiler</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField label="Hesap Dönemi Başlangıç Tarihi" value={financialSummary.hesapDonemiBaslangic} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Hesap Dönemi Bitiş Tarihi" value={financialSummary.hesapDonemiBitis} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Genel Kurulca Bir Ortak İçin Belirlenen Yıllık Ödenti Toplamı" value={financialSummary.genelKurulOdenek} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Ödenen Yıllık Sigorta Primi Toplamı" value={financialSummary.sigortaPrimi} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="İstihdam Edilen Personel Sayısı" value={financialSummary.personelSayisi} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary">Finansal Bilgi Ekle</Button>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>Gayrimenkul Bilgileri</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gayrimenkul Türü</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell>Şehir</TableCell>
                <TableCell>İlçe</TableCell>
                <TableCell>Pafta No</TableCell>
                <TableCell>Parsel No</TableCell>
                <TableCell>Yüz Ölçümü (m²)</TableCell>
                <TableCell>Tahmini Değer</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {realEstateHoldings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell>{holding.propertyType}</TableCell>
                  <TableCell>{holding.address}</TableCell>
                  <TableCell>{holding.city}</TableCell>
                  <TableCell>{holding.district}</TableCell>
                  <TableCell>{holding.sheetNo}</TableCell>
                  <TableCell>{holding.parcelNo}</TableCell>
                  <TableCell>{holding.areaSqm}</TableCell>
                  <TableCell>{holding.estimatedValue}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>Düzenle</Button>
                    <Button variant="outlined" size="small">Sil</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          <Button variant="contained" color="primary">Gayrimenkul Ekle</Button>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>Raporlar</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Belge Türü</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>Detay</Button>
                    <Button variant="outlined" size="small">Sil</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          <Button variant="contained" color="primary">Rapor Ekle</Button>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h6" gutterBottom>İştirakler</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ünvanı</TableCell>
                <TableCell>Mersis Numarası</TableCell>
                <TableCell>Vergi Kimlik No</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliateParticipations.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>{affiliate.affiliateName}</TableCell>
                  <TableCell>{affiliate.mersisNo}</TableCell>
                  <TableCell>{affiliate.taxId}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>Düzenle</Button>
                    <Button variant="outlined" size="small">Sil</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          <Button variant="contained" color="primary">İştirak Ekle</Button>
        </Box>
      </TabPanel>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
          Geri
        </Button>
        <Button variant="contained" color="primary">
          Kaydet ve Bitir
        </Button>
      </Box>
    </MainLayout>
  );
};

export default FinancialsPage;