import React, { useState } from 'react';
import {
  Typography, Box, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, List, ListItem, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mock Data
const financialSummary = {
  totalRevenue: 1250000,
  totalExpenses: 750000,
  netProfit: 500000,
  lastUpdate: '28.06.2025',
};

const incomeExpenseData = [
  { month: 'Ocak', gelir: 100000, gider: 60000 },
  { month: 'Şubat', gelir: 110000, gider: 65000 },
  { month: 'Mart', gelir: 120000, gider: 70000 },
  { month: 'Nisan', gelir: 130000, gider: 75000 },
  { month: 'Mayıs', gelir: 140000, gider: 80000 },
  { month: 'Haziran', gelir: 150000, gider: 85000 },
];

const financialDocuments = [
  { id: 1, name: '2024 Yılı Bilanço', type: 'Bilanço', date: '31.12.2024', file: 'bilanco_2024.pdf' },
  { id: 2, name: '2024 Yılı Gelir Tablosu', type: 'Gelir Tablosu', date: '31.12.2024', file: 'gelir_tablosu_2024.pdf' },
  { id: 3, name: '2025 Yılı Bütçe Taslağı', type: 'Bütçe', date: '15.01.2025', file: 'butce_taslagi_2025.pdf' },
];

const FinancialsPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Dosya yüklendi: ${selectedFile.name}`);
      // TODO: Dosya yükleme API çağrısı
      setSelectedFile(null);
    } else {
      alert('Lütfen yüklenecek bir dosya seçin.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        💰 Finansal Durum
      </Typography>

      <Grid container spacing={3} mb={4}>
        {/* Financial Summary Cards */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AttachMoneyIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6" color="textSecondary">Toplam Gelir</Typography>
            <Typography variant="h3" color="success">{financialSummary.totalRevenue.toLocaleString('tr-TR')} TL</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <MoneyOffIcon color="error" sx={{ fontSize: 40 }} />
            <Typography variant="h6" color="textSecondary">Toplam Gider</Typography>
            <Typography variant="h3" color="error">{financialSummary.totalExpenses.toLocaleString('tr-TR')} TL</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" color="textSecondary">Net Kar</Typography>
            <Typography variant="h3" color="primary">{financialSummary.netProfit.toLocaleString('tr-TR')} TL</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Income/Expense Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Aylık Gelir ve Gider Grafiği 📈</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gelir" stroke="#4caf50" name="Gelir" />
                <Line type="monotone" dataKey="gider" stroke="#f44336" name="Gider" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Financial Documents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Finansal Belgeler 📄</Typography>
            <List>
              {financialDocuments.map((doc) => (
                <ListItem
                  key={doc.id}
                  secondaryAction={
                    <Button variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                      Görüntüle
                    </Button>
                  }
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.name} secondary={`${doc.type} - ${doc.date}`} sx={{ pr: '100px' }} /> {/* Added padding-right */}
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Yeni Belge Yükle</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadFileIcon />}>
                  Dosya Seç
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {selectedFile && (
                  <Typography variant="body2">{selectedFile.name}</Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!selectedFile}>
                  Yükle
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Financial Activities/Updates */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Son Finansal Güncellemeler 🔔</Typography>
            <List>
              <ListItem>
                <ListItemIcon><TrendingUpIcon color="success" /></ListItemIcon>
                <ListItemText primary="Q1 2025 Gelirleri güncellendi." secondary="25.06.2025" />
              </ListItem>
              <ListItem>
                <ListItemIcon><TrendingDownIcon color="error" /></ListItemIcon>
                <ListItemText primary="Yeni gider kalemi eklendi: Ofis malzemeleri." secondary="20.06.2025" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CalendarTodayIcon color="info" /></ListItemIcon>
                <ListItemText primary="Vergi beyannamesi son tarihi yaklaşıyor." secondary="15.06.2025" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialsPage;