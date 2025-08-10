import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import KoopfonDetailPage from './pages/KoopfonDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import './styles/global.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/kooperatif-kurmak-için-ortak-ariyoruz" element={<KoopfonDetailPage />} />
      <Route path="/hakkimizda" element={<AboutUsPage />} />
    </Routes>
  </Router>
);

export default App;
