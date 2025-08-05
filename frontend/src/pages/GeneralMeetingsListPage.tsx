import React, { useState } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Collapse, IconButton, TextField, Stack, Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubjectIcon from '@mui/icons-material/Subject';

// Mock data for demonstration
type AgendaItem = {
  description: string;
  approvedCount: number;
  rejectedCount: number;
};

type GeneralMeeting = {
  id: string;
  title: string;
  date: string;
  location: string;
  agendaItems: AgendaItem[];
};

const generateRandomAgendaItems = (): AgendaItem[] => {
  const items = [
    "Yönetim Kurulu Faaliyet Raporunun Görüşülmesi",
    "Denetim Kurulu Raporunun Görüşülmesi",
    "Bilanço ve Gelir-Gider Farkı Hesaplarının Onaylanması",
    "Yönetim ve Denetim Kurulu Üyelerinin Seçimi",
    "Yeni Dönem Bütçesinin Görüşülmesi",
    "Tüzük Değişikliği Önerilerinin Görüşülmesi",
    "Gayrimenkul Alım/Satım Yetkisi Verilmesi",
    "Ortakların Aidat Miktarlarının Belirlenmesi",
  ];
  const numItems = Math.floor(Math.random() * 3) + 1; // 1 to 3 random items
  const selectedItems: AgendaItem[] = [];
  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    selectedItems.push({
      description: items[randomIndex],
      approvedCount: Math.floor(Math.random() * 100) + 10, // 10-109 approvals
      rejectedCount: Math.floor(Math.random() * 20), // 0-19 rejections
    });
  }
  return selectedItems;
};

const initialGeneralMeetings: GeneralMeeting[] = [
  {
    id: 'gm1',
    title: '2024 Yılı Olağan Genel Kurul Toplantısı',
    date: '15.03.2025',
    location: 'Kooperatif Merkezi Toplantı Salonu',
    agendaItems: generateRandomAgendaItems(),
  },
  {
    id: 'gm2',
    title: '2023 Yılı Olağanüstü Genel Kurul Toplantısı',
    date: '20.11.2024',
    location: 'Şehir Konferans Salonu',
    agendaItems: generateRandomAgendaItems(),
  },
  {
    id: 'gm3',
    title: '2025 Yılı Olağan Genel Kurul Toplantısı',
    date: '10.03.2026',
    location: 'Online Toplantı Platformu',
    agendaItems: generateRandomAgendaItems(),
  },
];

const GeneralMeetingsListPage: React.FC = () => {
  const [generalMeetings, setGeneralMeetings] = useState<GeneralMeeting[]>(initialGeneralMeetings);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    date: '',
    location: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const handleClearFilters = () => {
    setFilters({
      title: '',
      date: '',
      location: '',
    });
  };

  const filteredMeetings = generalMeetings.filter(meeting => {
    return (
      meeting.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      meeting.date.includes(filters.date) &&
      meeting.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        🗓️ Genel Kurul Toplantıları
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleToggleFilters} startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {showFilters ? 'Filtreleri gizle' : 'Filtreleri göster'}
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }} onClick={handleClearFilters}>
          Temizle
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mb: 2 }}>
          <Typography variant="h6" gutterBottom>Filtreler</Typography>
          <Grid container spacing={2}>
            <TextField
              label="Toplantı Başlığı"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              size="small"
            />
            <TextField
              label="Tarih"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              size="small"
              placeholder="GG.AA.YYYY"
            />
            <TextField
              label="Yer"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              size="small"
            />
          </Grid>
        </Box>
      </Collapse>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>📝 Başlık</TableCell>
              <TableCell>📅 Tarih</TableCell>
              <TableCell>📍 Yer</TableCell>
              <TableCell>📋 Gündem Maddeleri</TableCell>
              <TableCell>⚙️ İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMeetings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h6" color="text.secondary">
                    😔 Hiç genel kurul toplantısı bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.location}</TableCell>
                  <TableCell>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
                      {meeting.agendaItems.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SubjectIcon fontSize="small" color="action" />
                          <Typography variant="body2">{item.description}</Typography>
                          <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ ml: 1 }} />
                          <Typography variant="body2" color="success.main">{item.approvedCount}</Typography>
                          <CancelOutlinedIcon color="error" fontSize="small" />
                          <Typography variant="body2" color="error.main">{item.rejectedCount}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/general-meetings/${meeting.id}`} variant="outlined" size="small" startIcon={<LaunchIcon />}>
                      İncele
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GeneralMeetingsListPage;
