import React, { useState } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Box, Collapse, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, Stack, Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import LaunchIcon from '@mui/icons-material/Launch';

// Mock data for demonstration
type Partner = {
  id: string;
  ortaklikNo: string;
  isimUnvan: string;
  payAdedi: number;
  durum: string;
  tip: 'Gerçek' | 'Tüzel';
};

const initialPartners: Partner[] = [
  {
    id: '1',
    ortaklikNo: '1000',
    isimUnvan: 'Ali Veli',
    payAdedi: 100,
    durum: 'Halen Ortak',
    tip: 'Gerçek',
  },
  {
    id: '2',
    ortaklikNo: '1001',
    isimUnvan: 'ABC Ticaret A.Ş.',
    payAdedi: 500,
    durum: 'Halen Ortak',
    tip: 'Tüzel',
  },
  {
    id: '3',
    ortaklikNo: '1002',
    isimUnvan: 'Ayşe Yılmaz',
    payAdedi: 50,
    durum: 'Ortaklıktan Çıktı',
    tip: 'Gerçek',
  },
  {
    id: '4',
    ortaklikNo: '1003',
    isimUnvan: 'Mehmet Can',
    payAdedi: 200,
    durum: 'Ortaklığı Devretti',
    tip: 'Gerçek',
  },
  {
    id: '5',
    ortaklikNo: '1004',
    isimUnvan: 'XYZ Holding A.Ş.',
    payAdedi: 1000,
    durum: 'Halen Ortak',
    tip: 'Tüzel',
  },
];

const PartnersListPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    ortaklikNo: '',
    isimUnvan: '',
    payAdedi: '',
    durum: '',
    tip: '',
  });
  const [openPersonDialog, setOpenPersonDialog] = useState(false);
  const [openLegalEntityDialog, setOpenLegalEntityDialog] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleToggleAdvancedFilters = () => {
    setShowAdvancedFilters(prev => !prev);
  };

  const handleClearFilters = () => {
    setFilters({
      ortaklikNo: '',
      isimUnvan: '',
      payAdedi: '',
      durum: '',
      tip: '',
    });
  };

  const filteredPartners = partners.filter(partner => {
    return (
      partner.ortaklikNo.includes(filters.ortaklikNo) &&
      partner.isimUnvan.toLowerCase().includes(filters.isimUnvan.toLowerCase()) &&
      (filters.payAdedi === '' || partner.payAdedi === parseInt(filters.payAdedi)) &&
      (filters.durum === '' || partner.durum === filters.durum) &&
      (filters.tip === '' || partner.tip === filters.tip)
    );
  });

  const handleOpenPersonDialog = () => setOpenPersonDialog(true);
  const handleClosePersonDialog = () => setOpenPersonDialog(false);
  const handleOpenLegalEntityDialog = () => setOpenLegalEntityDialog(true);
  const handleCloseLegalEntityDialog = () => setOpenLegalEntityDialog(false);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        👥 Ortaklar Listesi
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenPersonDialog} sx={{ mr: 1 }} startIcon={<PersonAddIcon />}>
          Gerçek Kişi Ortak Ekle
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenLegalEntityDialog} startIcon={<BusinessIcon />}>
          Tüzel Kişi Ortak Ekle
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleToggleAdvancedFilters} startIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {showAdvancedFilters ? 'Gelişmiş filtreleri gizle' : 'Gelişmiş filtreleri göster'}
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }} onClick={handleClearFilters} startIcon={<ClearIcon />}>
          Temizle
        </Button>
      </Box>

      <Collapse in={showAdvancedFilters}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mb: 2 }}>
          <Typography variant="h6" gutterBottom>Gelişmiş Filtreler</Typography>
          <Grid container spacing={2}>
            <TextField
              label="Ortaklık No"
              name="ortaklikNo"
              value={filters.ortaklikNo}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="İsim/Unvan"
              name="isimUnvan"
              value={filters.isimUnvan}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Pay Adedi"
              name="payAdedi"
              value={filters.payAdedi}
              onChange={handleFilterChange}
              size="small"
              type="number"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Durum</InputLabel>
              <Select
                name="durum"
                value={filters.durum}
                label="Durum"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Hepsi</MenuItem>
                <MenuItem value="Halen Ortak">Halen Ortak</MenuItem>
                <MenuItem value="Ortaklıktan Çıktı">Ortaklıktan Çıktı</MenuItem>
                <MenuItem value="Ortaklığı Devretti">Ortaklığı Devretti</MenuItem>
                <MenuItem value="Hatalı Giriş">Hatalı Giriş</MenuItem>
                <MenuItem value="Ortaklıktan İhraç Edildi">Ortaklıktan İhraç Edildi</MenuItem>
                <MenuItem value="Ortaklığı Devraldı">Ortaklığı Devraldı</MenuItem>
                <MenuItem value="Vefat Etti">Vefat Etti</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Tip</InputLabel>
              <Select
                name="tip"
                value={filters.tip}
                label="Tip"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Hepsi</MenuItem>
                <MenuItem value="Gerçek">Gerçek Kişi</MenuItem>
                <MenuItem value="Tüzel">Tüzel Kişi</MenuItem>
              </Select>
            </FormControl>
            </Grid>
        </Box>
      </Collapse>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#️⃣ Ortaklık No</TableCell>
              <TableCell>👤 İsim/Unvan</TableCell>
              <TableCell>💰 Pay Adedi</TableCell>
              <TableCell>✅ Durum</TableCell>
              <TableCell>⚙️ İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPartners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h6" color="text.secondary">
                    😔 Hiç ortak bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.ortaklikNo}</TableCell>
                  <TableCell>{partner.isimUnvan}</TableCell>
                  <TableCell>{partner.payAdedi}</TableCell>
                  <TableCell>
                    <Chip
                      label={partner.durum}
                      color={partner.durum === 'Halen Ortak' ? 'success' :
                               partner.durum === 'Ortaklıktan Çıktı' ? 'error' :
                               'info'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                      <Button component={Link} to={`/admin/partners/${partner.id}`} variant="outlined" size="small" startIcon={<LaunchIcon />}>
                        İncele
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Gerçek Kişi Ortak Ekle Dialog */}
      <Dialog open={openPersonDialog} onClose={handleClosePersonDialog} fullWidth maxWidth="sm">
        <DialogTitle>➕ Gerçek Kişi Ortak Ekle</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Ad" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Soyad" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="TC Kimlik No" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Doğum Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Telefon" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" fullWidth margin="normal" type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Ortaklık No" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Pay Adedi" fullWidth margin="normal" type="number" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ortaklık Durumu</InputLabel>
                <Select label="Ortaklık Durumu">
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
            <Grid item xs={12}>
              <TextField label="Ortaklık Başlangıç Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePersonDialog}>İptal</Button>
          <Button onClick={handleClosePersonDialog} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>

      {/* Tüzel Kişi Ortak Ekle Dialog */}
      <Dialog open={openLegalEntityDialog} onClose={handleCloseLegalEntityDialog} fullWidth maxWidth="sm">
        <DialogTitle>➕ Tüzel Kişi Ortak Ekle</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Unvan" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Mersis No" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Vergi No" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Kuruluş Tipi</InputLabel>
                <Select label="Kuruluş Tipi">
                  <MenuItem value="KOOPERATIF">KOOPERATİF</MenuItem>
                  <MenuItem value="ŞİRKET">ŞİRKET</MenuItem>
                  <MenuItem value="DERNEK">DERNEK</MenuItem>
                  {/* Add other types as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Ortaklık No" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Pay Adedi" fullWidth margin="normal" type="number" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ortaklık Durumu</InputLabel>
                <Select label="Ortaklık Durumu">
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
            <Grid item xs={12}>
              <TextField label="Ortaklık Başlangıç Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLegalEntityDialog}>İptal</Button>
          <Button onClick={handleCloseLegalEntityDialog} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PartnersListPage;
