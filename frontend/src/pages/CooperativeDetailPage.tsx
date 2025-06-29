import React, { useState } from 'react';
import {
  Typography, Box, Paper, Tabs, Tab, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    aciklama: 'Bu bir örnek kooperatiftir.',
    dosyaNo: '12345',
    naceKodu: 'A.01.11',
    merkezIlce: 'ADIYAMAN MERKEZ',
    faaliyetBolgesi: 'Bölgesel',
    calismaKonusu: 'Tarım Ürünleri Üretimi',
    // Add more fields as per db.txt and PDF
  };

  // Dummy data for tabs
  const partners = [
    { id: 1, name: 'Ortak 1', share: 100, status: 'Aktif' },
    { id: 2, name: 'Ortak 2', share: 50, status: 'Aktif' },
  ];

  const boardMembers = [
    { id: 1, name: 'Yönetim Kurulu Üyesi 1', position: 'Başkan' },
    { id: 2, name: 'Yönetim Kurulu Üyesi 2', position: 'Üye' },
  ];

  const auditBoardMembers = [
    { id: 1, name: 'Denetim Kurulu Üyesi 1', position: 'Başkan' },
    { id: 2, name: 'Denetim Kurulu Üyesi 2', position: 'Üye' },
  ];

  const financialData = [
    { name: '2022', gelir: 4000, gider: 2400 },
    { name: '2023', gelir: 3000, gider: 1398 },
    { name: '2024', gelir: 2000, gider: 9800 },
  ];

  const generalMeetings = [
    { id: 1, date: '15.03.2023', topic: 'Yıllık Olağan Genel Kurul', status: 'Yapıldı' },
    { id: 2, date: '20.09.2024', topic: 'Olağanüstü Genel Kurul', status: 'Planlandı' },
  ];

  const auditorInfo = {
    name: 'Denetçi Adı Soyadı',
    firm: 'Denetim Firması A.Ş.',
    contact: 'denetci@example.com',
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isNew ? 'Yeni Kooperatif Oluştur' : `Kooperatif Detay: ${cooperativeDetails.unvan}`}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Hukuki Durum:</Typography>
            <Typography variant="h6">{cooperativeDetails.hukukiDurum}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">En Son Yapılan Genel Kurul Tarihi:</Typography>
            <Typography variant="h6">{cooperativeDetails.sonGenelKurulTarihi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Merkez İl:</Typography>
            <Typography variant="h6">{cooperativeDetails.merkezIl}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Tescil Tarihi:</Typography>
            <Typography variant="h6">{cooperativeDetails.tescilTarihi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Mevcut Ortak Sayısı:</Typography>
            <Typography variant="h6">{cooperativeDetails.mevcutOrtakSayisi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Görevde Olan Y.K. Üye Sayısı:</Typography>
            <Typography variant="h6">{cooperativeDetails.gorevdeYKuyeSayisi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Görevde Olan D.K. Üye Sayısı:</Typography>
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
            <TextField label="Unvan" value={cooperativeDetails.unvan} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Hukuki Durum" value={cooperativeDetails.hukukiDurum} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Arşiv No" value={cooperativeDetails.arsivNo} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Mersis No" value={cooperativeDetails.mersisNo} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Merkez İl" value={cooperativeDetails.merkezIl} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Kuruluş Tipi" value={cooperativeDetails.kurulusTipi} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Kooperatif Türü" value={cooperativeDetails.kooperatifTuru} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Açıklama" value={cooperativeDetails.aciklama} fullWidth margin="normal" InputProps={{ readOnly: true }} multiline rows={2} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Dosya No" value={cooperativeDetails.dosyaNo} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Nace Kodu" value={cooperativeDetails.naceKodu} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Merkez İlçe" value={cooperativeDetails.merkezIlce} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Faaliyet Bölgesi" value={cooperativeDetails.faaliyetBolgesi} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Çalışma Konusu" value={cooperativeDetails.calismaKonusu} fullWidth margin="normal" InputProps={{ readOnly: true }} multiline rows={2} />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.id}</TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.share}</TableCell>
                  <TableCell>{partner.status}</TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {boardMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {auditBoardMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
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
            <TextField label="Adı Soyadı" value="Yetkili Adı Soyadı" fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="E-posta" value="yetkili@example.com" fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Telefon" value="+90 5XX XXX XX XX" fullWidth margin="normal" InputProps={{ readOnly: true }} />
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
          </BarChart>
        </ResponsiveContainer>

        <Typography variant="subtitle1" mt={4}>Gayrimenkul Bilgileri</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Adres</TableCell>
                <TableCell>Alan (m²)</TableCell>
                <TableCell>Değer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Örnek Mah. No:1</TableCell>
                <TableCell>500</TableCell>
                <TableCell>1.000.000 TL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {generalMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.topic}</TableCell>
                  <TableCell>{meeting.status}</TableCell>
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
            <TextField label="Adı Soyadı" value={auditorInfo.name} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Firma" value={auditorInfo.firm} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="E-posta" value={auditorInfo.contact} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default CooperativeDetailPage;
