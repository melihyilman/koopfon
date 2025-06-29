import React, { useState } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Box, Collapse, Select, MenuItem, FormControl, InputLabel, Chip, Stack, Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Mock data for demonstration
type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'Aktif' | 'Pasif';
  lastLogin: string;
};

const initialUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@koopfon.com', role: 'Yönetici', status: 'Aktif', lastLogin: '29.06.2025 10:30' },
  { id: '2', username: 'user1', email: 'user1@koopfon.com', role: 'Kullanıcı', status: 'Aktif', lastLogin: '28.06.2025 15:00' },
  { id: '3', username: 'editor', email: 'editor@koopfon.com', role: 'Editör', status: 'Aktif', lastLogin: '29.06.2025 09:00' },
  { id: '4', username: 'inactive_user', email: 'inactive@koopfon.com', role: 'Kullanıcı', status: 'Pasif', lastLogin: '15.05.2025 11:00' },
];

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    username: '',
    role: '',
    status: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const handleClearFilters = () => {
    setFilters({
      username: '',
      role: '',
      status: '',
    });
  };

  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      (filters.role === '' || user.role === filters.role) &&
      (filters.status === '' || user.status === filters.status)
    );
  });

  const handleDeleteUser = (userId: string) => {
    if (window.confirm(`Kullanıcı ID: ${userId} silinecek. Emin misiniz?`)) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        👥 Kullanıcılar
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }} startIcon={<PersonAddIcon />}>
          Yeni Kullanıcı Ekle
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleToggleFilters} startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {showFilters ? 'Filtreleri gizle' : 'Filtreleri göster'}
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }} onClick={handleClearFilters} startIcon={<ClearIcon />}>
          Temizle
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mb: 2 }}>
          <Typography variant="h6" gutterBottom>Filtreler</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Kullanıcı Adı"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Rol</InputLabel>
                <Select
                  name="role"
                  value={filters.role}
                  label="Rol"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Hepsi</MenuItem>
                  <MenuItem value="Yönetici">Yönetici</MenuItem>
                  <MenuItem value="Kullanıcı">Kullanıcı</MenuItem>
                  <MenuItem value="Editör">Editör</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  label="Durum"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Hepsi</MenuItem>
                  <MenuItem value="Aktif">Aktif</MenuItem>
                  <MenuItem value="Pasif">Pasif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#️⃣ ID</TableCell>
              <TableCell>👤 Kullanıcı Adı</TableCell>
              <TableCell>📧 E-posta</TableCell>
              <TableCell>🔑 Rol</TableCell>
              <TableCell>✅ Durum</TableCell>
              <TableCell>⏰ Son Giriş</TableCell>
              <TableCell>⚙️ İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h6" color="text.secondary">
                    😔 Hiç kullanıcı bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'Aktif' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                      <Button component={Link} to={`/users/${user.id}`} variant="outlined" size="small" startIcon={<LaunchIcon />}>
                        Düzenle
                      </Button>
                      <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)}>
                        Sil
                      </Button>
                    </Stack>
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

export default UsersListPage;
