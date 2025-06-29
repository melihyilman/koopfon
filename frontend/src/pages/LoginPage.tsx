import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (username === 'admin' && password === 'admin') {
      alert('Giriş başarılı!');
      // TODO: API ile giriş işlemi ve yönlendirme
    } else {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default, // Tema arka plan rengi
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Hafif degrade
      }}
    >
      <Paper sx={{ p: 4, minWidth: 320, maxWidth: 400, textAlign: 'center' }}>
        <LockOutlinedIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Koopfon Yönetim Paneli Giriş
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Lütfen kullanıcı adı ve şifrenizle giriş yapın.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Şifre"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Giriş Yap
          </Button>
        </form>

        <Box sx={{ mt: 3, fontSize: '0.8rem', color: 'text.secondary' }}>
          <Typography variant="body2">
            Sorun yaşıyorsanız yöneticinizle iletişime geçin.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            © 2025 Koopfon. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;