import React from 'react';
import {
  Typography, Grid, Paper, Box, Card, CardContent, List, ListItem, ListItemText,
  ListItemIcon, Avatar, Chip, Divider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// Dummy Data for Charts and Statistics
const cooperativeTypeData = [
  { name: 'Üretim ve Pazarlama', value: 5 },
  { name: 'Konut Yapı', value: 3 },
  { name: 'Tüketim', value: 2 },
  { name: 'Tarım Kredi', value: 1 },
];

const partnerStatusData = [
  { name: 'Halen Ortak', value: 80 },
  { name: 'Ortaklıktan Çıktı', value: 15 },
  { name: 'Ortaklığı Devretti', value: 5 },
];

const COLORS = ['#2196f3', '#ff9800', '#4caf50', '#f44336']; // Using theme colors
const COLORS_DOCUMENTS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];
const COLORS_MEMBERSHIP = ['#00C49F', '#FFBB28'];

const documentTypeData = [
  { name: 'Tüzük', value: 3 },
  { name: 'Karar', value: 8 },
  { name: 'Sözleşme', value: 5 },
  { name: 'Rapor', value: 2 },
  { name: 'Diğer', value: 4 },
];

const membershipEventData = [
  { name: 'Ocak', 'Yeni Ortak': 5, 'Ayrılan Ortak': 1 },
  { name: 'Şubat', 'Yeni Ortak': 3, 'Ayrılan Ortak': 0 },
  { name: 'Mart', 'Yeni Ortak': 7, 'Ayrılan Ortak': 2 },
  { name: 'Nisan', 'Yeni Ortak': 2, 'Ayrılan Ortak': 1 },
  { name: 'Mayıs', 'Yeni Ortak': 6, 'Ayrılan Ortak': 3 },
  { name: 'Haziran', 'Yeni Ortak': 4, 'Ayrılan Ortak': 0 },
];

const recentActivities = [
  { id: 1, type: 'kooperatif', description: 'Örnek Kooperatif A.Ş. bilgileri güncellendi.', date: '29.06.2025' },
  { id: 2, type: 'ortak', description: 'Ayşe Yılmaz yeni ortak olarak eklendi.', date: '28.06.2025' },
  { id: 3, type: 'genel_kurul', description: '2024 Yılı Olağan Genel Kurul Toplantısı kararları onaylandı.', date: '27.06.2025' },
  { id: 4, type: 'kullanici', description: 'Mehmet Can\'ın yetkileri düzenlendi.', date: '26.06.2025' },
  { id: 5, type: 'finansal', description: 'Haziran ayı finansal raporu yüklendi.', date: '25.06.2025' },
];

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📊 Ana Sayfa
      </Typography>

      <Grid container spacing={3} mb={4}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <GroupIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" color="textSecondary">Toplam Kooperatif</Typography>
              <Typography variant="h3" color="primary">11</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" color="textSecondary">Toplam Ortak</Typography>
              <Typography variant="h3" color="secondary">520</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h6" color="textSecondary">Aktif Kullanıcı</Typography>
              <Typography variant="h3" color="success">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalanceWalletIcon color="info" sx={{ fontSize: 40 }} />
              <Typography variant="h6" color="textSecondary">Bekleyen İşlem</Typography>
              <Typography variant="h3" color="info">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h6" color="textSecondary">Tamamlanan İşlem</Typography>
              <Typography variant="h3" color="success">12</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Charts Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Kooperatif Türlerine Göre Dağılım 📈</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cooperativeTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2196f3" /> {/* Using primary color */}
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ortaklık Durumuna Göre Dağılım 📊</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={partnerStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {partnerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* New Charts Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Belge Türlerine Göre Dağılım 📄</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_DOCUMENTS[index % COLORS_DOCUMENTS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Aylık Ortaklık Hareketleri 📈</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={membershipEventData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Yeni Ortak" stackId="a" fill={COLORS_MEMBERSHIP[0]} />
                <Bar dataKey="Ayrılan Ortak" stackId="a" fill={COLORS_MEMBERSHIP[1]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Son Aktiviteler 🔔</Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.type === 'kooperatif' && <GroupIcon color="primary" />}
                      {activity.type === 'ortak' && <PeopleIcon color="secondary" />}
                      {activity.type === 'genel_kurul' && <EventNoteIcon color="info" />}
                      {activity.type === 'kullanici' && <PersonIcon color="success" />}
                      {activity.type === 'finansal' && <AccountBalanceWalletIcon color="warning" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.description}
                      secondary={activity.date}
                    />
                    <Chip
                      label={activity.type.toUpperCase()}
                      size="small"
                      color={
                        activity.type === 'kooperatif' ? 'primary' :
                        activity.type === 'ortak' ? 'secondary' :
                        activity.type === 'genel_kurul' ? 'info' :
                        activity.type === 'kullanici' ? 'success' :
                        'warning'
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;