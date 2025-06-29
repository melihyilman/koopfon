import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Koopfon Yönetim Paneli
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar /> {/* AppBar'ın yüksekliği kadar boşluk bırakır */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Ana Sayfa" />
          </ListItem>
          <ListItem button component={Link} to="/cooperatives">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Kooperatifler" />
          </ListItem>
          <ListItem button component={Link} to="/partners">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Ortaklar" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Kullanıcılar" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Container>{children}</Container>
    </Box>
  </Box>
);

export default MainLayout;