import React, { useState } from 'react';
import {
  Typography, TextField, Button, Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid,
  Stack, Chip, Divider
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mock data for demonstration
type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'Aktif' | 'Pasif';
  lastLogin: string;
  createdAt: string;
};

const initialUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@koopfon.com', role: 'Yönetici', status: 'Aktif', lastLogin: '29.06.2025 10:30', createdAt: '01.01.2024' },
  { id: '2', username: 'user1', email: 'user1@koopfon.com', role: 'Kullanıcı', status: 'Aktif', lastLogin: '28.06.2025 15:00', createdAt: '10.03.2024' },
  { id: '3', username: 'editor', email: 'editor@koopfon.com', role: 'Editör', status: 'Aktif', lastLogin: '29.06.2025 09:00', createdAt: '05.04.2024' },
  { id: '4', username: 'inactive_user', email: 'inactive@koopfon.com', role: 'Kullanıcı', status: 'Pasif', lastLogin: '15.05.2025 11:00', createdAt: '20.02.2024' },
];

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const [user, setUser] = useState<User | undefined>(
    isNew ? undefined : initialUsers.find(u => u.id === id)
  );
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // If user is not found and it's not a new entry, display error
  if (!user && !isNew) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          😔 Kullanıcı bulunamadı!
        </Typography>
        <Button component={RouterLink} to="/users" variant="outlined" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Kullanıcı Listesine Geri Dön
        </Button>
      </Box>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setUser(prev => {
      if (!prev) return undefined;
      return {
        ...prev,
        [name as string]: value,
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile kaydet
    alert('Kaydedildi!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }
    // TODO: API ile şifre değiştirme
    alert('Şifre değiştirildi!');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Box>
      <Button component={RouterLink} to="/users" variant="outlined" startIcon={<ArrowBackIcon />}>
        Kullanıcı Listesine Geri Dön
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {isNew ? '➕ Yeni Kullanıcı Ekle' : `👤 Kullanıcı Detay: ${user?.username}`}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSave}>
          <Typography variant="h6" gutterBottom>Kullanıcı Bilgileri</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Kullanıcı Adı"
                name="username"
                value={user?.username || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={user?.email || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Rol</InputLabel>
                <Select
                  name="role"
                  value={user?.role || ''}
                  label="Rol"
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: <KeyIcon sx={{ mr: 1 }} /> }}
                >
                  <MenuItem value="Yönetici">Yönetici</MenuItem>
                  <MenuItem value="Kullanıcı">Kullanıcı</MenuItem>
                  <MenuItem value="Editör">Editör</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={user?.status || ''}
                  label="Durum"
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: <InfoIcon sx={{ mr: 1 }} /> }}
                >
                  <MenuItem value="Aktif">Aktif</MenuItem>
                  <MenuItem value="Pasif">Pasif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {!isNew && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Son Giriş"
                    value={user?.lastLogin || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true, startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} /> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Oluşturulma Tarihi"
                    value={user?.createdAt || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true, startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} /> }}
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Box>
        </form>

        {!isNew && (
          <>
            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>Şifre Değiştir</Typography>
            <form onSubmit={handleChangePassword}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Yeni Şifre"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ startAdornment: <LockIcon sx={{ mr: 1 }} /> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Yeni Şifre Tekrar"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{ startAdornment: <LockIcon sx={{ mr: 1 }} /> }}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button type="submit" variant="contained" color="secondary">
                  Şifreyi Değiştir
                </Button>
              </Box>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default UserDetailPage;
