import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, MenuItem } from '@mui/material';

const UserDetailPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [role, setRole] = useState('Yönetici');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile kaydet
    alert('Kaydedildi!');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Kullanıcı Detay
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <form onSubmit={handleSave}>
          <TextField
            label="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rol"
            select
            value={role}
            onChange={e => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Yönetici">Yönetici</MenuItem>
            <MenuItem value="Kullanıcı">Kullanıcı</MenuItem>
          </TextField>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default UserDetailPage;