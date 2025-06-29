import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Typography, Box, Paper, Button, Divider, List, ListItem, ListItemText,
  ListItemIcon, Chip, Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // For notes

// Mock data for demonstration (copied from GeneralMeetingsListPage.tsx)
type AgendaItem = {
  description: string;
  approvedCount: number;
  rejectedCount: number;
  notes?: string; // Added notes field
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
    "Kooperatifin Gelecek Stratejilerinin Belirlenmesi",
    "Dijitalleşme Süreçlerinin Değerlendirilmesi",
    "Çevre Dostu Uygulamaların Geliştirilmesi",
  ];
  const notesOptions = [
    "Bu madde üzerinde uzun tartışmalar yaşandı ve oy birliğiyle kabul edildi.",
    "Madde, bazı değişikliklerle kabul edildi. Detaylar tutanaklarda yer almaktadır.",
    "Yoğun katılım ve fikir alışverişi sonucunda madde reddedildi.",
    "Madde, gelecek toplantıda tekrar görüşülmek üzere ertelendi.",
    "Bu madde, kooperatifin uzun vadeli hedefleri açısından kritik öneme sahiptir.",
    "Ortakların yoğun ilgisiyle madde hızlıca onaylandı.",
    "Denetim kurulu, bu maddeyle ilgili ek rapor sunmuştur.",
  ];

  const numItems = Math.floor(Math.random() * 3) + 3; // 3 to 5 random items
  const selectedItems: AgendaItem[] = [];
  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomNotesIndex = Math.floor(Math.random() * notesOptions.length);
    selectedItems.push({
      description: items[randomIndex],
      approvedCount: Math.floor(Math.random() * 100) + 10, // 10-109 approvals
      rejectedCount: Math.floor(Math.random() * 20), // 0-19 rejections
      notes: Math.random() > 0.4 ? notesOptions[randomNotesIndex] : undefined, // More frequent and varied notes
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

const GeneralMeetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const meeting = initialGeneralMeetings.find(m => m.id === id);

  if (!meeting) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          😔 Toplantı bulunamadı!
        </Typography>
        <Button component={RouterLink} to="/general-meetings" variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Genel Kurul Listesine Geri Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button component={RouterLink} to="/general-meetings" variant="outlined" startIcon={<ArrowBackIcon />}>
        Genel Kurul Listesine Geri Dön
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        📋 {meeting.title} Detayları
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon color="action" />
            <Typography variant="body1">
              <Typography component="span" fontWeight="bold">Tarih:</Typography> {meeting.date}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon color="action" />
            <Typography variant="body1">
              <Typography component="span" fontWeight="bold">Yer:</Typography> {meeting.location}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          📝 Gündem Maddeleri
        </Typography>
        {meeting.agendaItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Bu toplantı için belirlenmiş gündem maddesi bulunmamaktadır.
          </Typography>
        ) : (
          <List>
            {meeting.agendaItems.map((item, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2, borderLeft: '4px solid #2196f3' }}> {/* Using primary color for border */}
                <ListItem disableGutters>
                  <ListItemIcon>
                    <SubjectIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">{index + 1}. {item.description}</Typography>}
                    secondary={
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Chip
                          icon={<CheckCircleOutlineIcon />}
                          label={`Onay: ${item.approvedCount}`}
                          color="success"
                          variant="outlined"
                        />
                        <Chip
                          icon={<CancelOutlinedIcon />}
                          label={`Red: ${item.rejectedCount}`}
                          color="error"
                          variant="outlined"
                        />
                      </Stack>
                    }
                  />
                </ListItem>
                {item.notes && (
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <EmojiObjectsIcon color="info" sx={{ mt: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      <Typography component="span" fontWeight="bold">Not:</Typography> {item.notes}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default GeneralMeetingDetailPage;
