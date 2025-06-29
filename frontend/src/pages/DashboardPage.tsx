import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPage: React.FC = () => {
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Ana Sayfa
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Toplam Kooperatif</Typography>
            <Typography variant="h3" color="primary">11</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Toplam Ortak</Typography>
            <Typography variant="h3" color="primary">520</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Aktif Kullanıcı</Typography>
            <Typography variant="h3" color="primary">5</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Kooperatif Türlerine Göre Dağılım</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cooperativeTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ortaklık Durumuna Göre Dağılım</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={partnerStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
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
      </Grid>
    </>
  );
};

export default DashboardPage;
