import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile giriş işlemi
    alert('Giriş yapıldı!');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" gutterBottom>Giriş Yap</Typography>
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
      </Paper>
    </Box>
  );
};

export default LoginPage;
