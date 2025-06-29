import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CooperativesListPage from './pages/CooperativesListPage';
import CooperativeDetailPage from './pages/CooperativeDetailPage';
import PartnersListPage from './pages/PartnersListPage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailPage from './pages/UserDetailPage';
import MainLayout from './layout/MainLayout';
import GeneralMeetingsListPage from './pages/GeneralMeetingsListPage';
import GeneralMeetingDetailPage from './pages/GeneralMeetingDetailPage';
import FinancialsPage from './pages/FinancialsPage';
import DocumentManagementPage from './pages/DocumentManagementPage';

// Örnek oturum kontrolü (gerçek uygulamada authSlice veya context ile yapılmalı)
const isAuthenticated = true;

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
          <Route path="/cooperatives" element={<MainLayout><CooperativesListPage /></MainLayout>} />
          <Route path="/cooperatives/:id" element={<MainLayout><CooperativeDetailPage /></MainLayout>} />
          <Route path="/partners" element={<MainLayout><PartnersListPage /></MainLayout>} />
          <Route path="/partners/:id" element={<MainLayout><PartnerDetailPage /></MainLayout>} />
          <Route path="/users" element={<MainLayout><UsersListPage /></MainLayout>} />
          <Route path="/users/:id" element={<MainLayout><UserDetailPage /></MainLayout>} />
          <Route path="/general-meetings" element={<MainLayout><GeneralMeetingsListPage /></MainLayout>} />
          <Route path="/general-meetings/:id" element={<MainLayout><GeneralMeetingDetailPage /></MainLayout>} />
          <Route path="/financials" element={<MainLayout><FinancialsPage /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><DocumentManagementPage /></MainLayout>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </Router>
);

export default App;
