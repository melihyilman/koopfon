import React, { useState } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Box, Collapse, IconButton, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandMore';

// Mock data for demonstration
type Cooperative = {
  id: string;
  unvan: string;
  dosyaNo: string;
  kurulusIzinTarihi: string;
  ortakSayisi: number;
  mersisNo: string;
  kooperatifTuru: string;
  rol: string;
};

const initialCooperatives: Cooperative[] = [
  {
    id: '1',
    unvan: 'Örnek Kooperatif A.Ş.',
    dosyaNo: '12345',
    kurulusIzinTarihi: '01.01.2020',
    ortakSayisi: 150,
    mersisNo: '0000000000000001',
    kooperatifTuru: 'Üretim ve Pazarlama',
    rol: 'Yönetici',
  },
  {
    id: '2',
    unvan: 'Gelişim Kooperatifi',
    dosyaNo: '67890',
    kurulusIzinTarihi: '15.03.2018',
    ortakSayisi: 300,
    mersisNo: '0000000000000002',
    kooperatifTuru: 'Konut Yapı',
    rol: 'Üye',
  },
  // Add more mock data as needed
];

const CooperativesListPage: React.FC = () => {
  const [cooperatives, setCooperatives] = useState<Cooperative[]>(initialCooperatives);
  const [filters, setFilters] = useState({
    unvan: '',
    mersisNo: '',
    dosyaNo: '',
    kurulusIzinNo: '',
    kurulusTipi: '',
    kooperatifTuru: '',
    il: '',
    kurulusIzinTarihi: '',
    faalDurum: '', // 'Faal', 'Faal Değil', 'Hepsi'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
      unvan: '',
      mersisNo: '',
      dosyaNo: '',
      kurulusIzinNo: '',
      kurulusTipi: '',
      kooperatifTuru: '',
      il: '',
      kurulusIzinTarihi: '',
      faalDurum: '',
    });
  };

  const filteredCooperatives = cooperatives.filter(coop => {
    return (
      coop.unvan.toLowerCase().includes(filters.unvan.toLowerCase()) &&
      coop.mersisNo.includes(filters.mersisNo) &&
      coop.dosyaNo.includes(filters.dosyaNo) &&
      // Add other filter conditions here
      (filters.kooperatifTuru === '' || coop.kooperatifTuru === filters.kooperatifTuru) &&
      (filters.faalDurum === '' ||
        (filters.faalDurum === 'Faal' && true /* Placeholder for actual active status */) ||
        (filters.faalDurum === 'Faal Değil' && false /* Placeholder for actual active status */)
      )
    );
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Kooperatifler Listesi
      </Typography>

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
              label="Unvan"
              name="unvan"
              value={filters.unvan}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Mersis No"
              name="mersisNo"
              value={filters.mersisNo}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Dosya No"
              name="dosyaNo"
              value={filters.dosyaNo}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Kuruluş İzin No"
              name="kurulusIzinNo"
              value={filters.kurulusIzinNo}
              onChange={handleFilterChange}
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Kuruluş Tipi</InputLabel>
              <Select
                name="kurulusTipi"
                value={filters.kurulusTipi}
                label="Kuruluş Tipi"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Seçim Yapınız</MenuItem>
                <MenuItem value="KOOPERATIF">KOOPERATİF</MenuItem>
                {/* Add more types as needed */}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Kooperatif Türü</InputLabel>
              <Select
                name="kooperatifTuru"
                value={filters.kooperatifTuru}
                label="Kooperatif Türü"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Seçim Yapınız</MenuItem>
                <MenuItem value="Üretim ve Pazarlama">Üretim ve Pazarlama</MenuItem>
                <MenuItem value="Konut Yapı">Konut Yapı</MenuItem>
                {/* Add more types as needed */}
              </Select>
            </FormControl>
            <TextField
              label="İl"
              name="il"
              value={filters.il}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Kuruluş İzin Tarihi"
              name="kurulusIzinTarihi"
              value={filters.kurulusIzinTarihi}
              onChange={handleFilterChange}
              size="small"
              placeholder="GG.AA.YYYY"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Faal Durum</InputLabel>
              <Select
                name="faalDurum"
                value={filters.faalDurum}
                label="Faal Durum"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Hepsi</MenuItem>
                <MenuItem value="Faal">Faal</MenuItem>
                <MenuItem value="Faal Değil">Faal Değil</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Collapse>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Unvan</TableCell>
              <TableCell>Dosya No</TableCell>
              <TableCell>Kuruluş İzin Tarihi</TableCell>
              <TableCell>Ortak Sayısı (Beyan Edilen)</TableCell>
              <TableCell>Mersis No</TableCell>
              <TableCell>Kooperatif Türü</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCooperatives.map((coop) => (
              <TableRow key={coop.id}>
                <TableCell>{coop.unvan}</TableCell>
                <TableCell>{coop.dosyaNo}</TableCell>
                <TableCell>{coop.kurulusIzinTarihi}</TableCell>
                <TableCell>{coop.ortakSayisi}</TableCell>
                <TableCell>{coop.mersisNo}</TableCell>
                <TableCell>{coop.kooperatifTuru}</TableCell>
                <TableCell>{coop.rol}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/cooperatives/${coop.id}`} variant="outlined" size="small">
                    Git
                  </Button>
                  <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                    Rapor
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CooperativesListPage;