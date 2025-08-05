import 'bootstrap/dist/css/bootstrap.min.css';
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
import LandingPage from "./pages/LandingPage";
import KoopfonDetailPage from './pages/KoopfonDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';

// Örnek oturum kontrolü (gerçek uygulamada authSlice veya context ile yapılmalı)
const isAuthenticated = true;

const AdminRoutes: React.FC = () => (
    <MainLayout>
        <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cooperatives" element={<CooperativesListPage />} />
            <Route path="cooperatives/:id" element={<CooperativeDetailPage />} />
            <Route path="partners" element={<PartnersListPage />} />
            <Route path="partners/:id" element={<PartnerDetailPage />} />
            <Route path="users" element={<UsersListPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="general-meetings" element={<GeneralMeetingsListPage />} />
            <Route path="general-meetings/:id" element={<GeneralMeetingDetailPage />} />
            <Route path="financials" element={<FinancialsPage />} />
            <Route path="documents" element={<DocumentManagementPage />} />
            <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
    </MainLayout>
);

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/kooperatif-kurmak-için-ortak-ariyoruz" element={<KoopfonDetailPage />} />
      <Route path="/hakkimizda" element={<AboutUsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={isAuthenticated ? <AdminRoutes /> : <Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
