import React, { useState } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Box, Collapse, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
        Ortaklar Listesi
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenPersonDialog} sx={{ mr: 1 }}>
          + Gerçek Kişi Ortak Ekle
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenLegalEntityDialog}>
          + Tüzel Kişi Ortak Ekle
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleToggleAdvancedFilters} startIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {showAdvancedFilters ? 'Gelişmiş filtreleri gizle' : 'Gelişmiş filtreleri göster'}
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }} onClick={handleClearFilters}>
          Temizle
        </Button>
      </Box>

      <Collapse in={showAdvancedFilters}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mb: 2 }}>
          <Typography variant="h6" gutterBottom>Gelişmiş Filtreler</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
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
          </Box>
        </Box>
      </Collapse>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ortaklık No</TableCell>
              <TableCell>İsim/Unvan</TableCell>
              <TableCell>Pay Adedi</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>{partner.ortaklikNo}</TableCell>
                <TableCell>{partner.isimUnvan}</TableCell>
                <TableCell>{partner.payAdedi}</TableCell>
                <TableCell>{partner.durum}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>Düzenle</Button>
                  <Button variant="outlined" size="small">Sil</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Gerçek Kişi Ortak Ekle Dialog */}
      <Dialog open={openPersonDialog} onClose={handleClosePersonDialog}>
        <DialogTitle>Gerçek Kişi Ortak Ekle</DialogTitle>
        <DialogContent>
          <TextField label="Ad" fullWidth margin="normal" />
          <TextField label="Soyad" fullWidth margin="normal" />
          <TextField label="TC Kimlik No" fullWidth margin="normal" />
          <TextField label="Doğum Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
          <TextField label="Telefon" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" type="email" />
          <TextField label="Ortaklık No" fullWidth margin="normal" />
          <TextField label="Pay Adedi" fullWidth margin="normal" type="number" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Ortaklık Durumu</InputLabel>
            <Select label="Ortaklık Durumu">
              <MenuItem value="Halen Ortak">Halen Ortak</MenuItem>
              {/* Add other statuses as needed */}
            </Select>
          </FormControl>
          <TextField label="Ortaklık Başlangıç Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePersonDialog}>İptal</Button>
          <Button onClick={handleClosePersonDialog} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>

      {/* Tüzel Kişi Ortak Ekle Dialog */}
      <Dialog open={openLegalEntityDialog} onClose={handleCloseLegalEntityDialog}>
        <DialogTitle>Tüzel Kişi Ortak Ekle</DialogTitle>
        <DialogContent>
          <TextField label="Unvan" fullWidth margin="normal" />
          <TextField label="Mersis No" fullWidth margin="normal" />
          <TextField label="Vergi No" fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Kuruluş Tipi</InputLabel>
            <Select label="Kuruluş Tipi">
              <MenuItem value="KOOPERATIF">KOOPERATİF</MenuItem>
              {/* Add other types as needed */}
            </Select>
          </FormControl>
          <TextField label="Ortaklık No" fullWidth margin="normal" />
          <TextField label="Pay Adedi" fullWidth margin="normal" type="number" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Ortaklık Durumu</InputLabel>
            <Select label="Ortaklık Durumu">
              <MenuItem value="Halen Ortak">Halen Ortak</MenuItem>
              {/* Add other statuses as needed */}
            </Select>
          </FormControl>
          <TextField label="Ortaklık Başlangıç Tarihi" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
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