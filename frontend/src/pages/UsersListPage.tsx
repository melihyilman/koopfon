import React from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const users = [
  { id: 1, username: 'admin', role: 'Yönetici' },
  { id: 2, username: 'user1', role: 'Kullanıcı' },
];

const UsersListPage: React.FC = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Kullanıcılar
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Yeni Kullanıcı Ekle
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersListPage;