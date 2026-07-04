
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import HomePage from './pages/HomePage.jsx';
import NosotrosPage from './pages/NosotrosPage.jsx';
import PlataformaPage from './pages/PlataformaPage.jsx';
import SolucionesPage from './pages/SolucionesPage.jsx';
import TecnologiaPage from './pages/TecnologiaPage.jsx';
import SistemasPage from './pages/SistemasPage.jsx';
import EquiposPage from './pages/EquiposPage.jsx';
import IndustriasPage from './pages/IndustriasPage.jsx';
import CasosDeUsoPage from './pages/CasosDeUsoPage.jsx';
import ContactoPage from './pages/ContactoPage.jsx';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/plataforma" element={<PlataformaPage />} />
        <Route path="/soluciones" element={<SolucionesPage />} />
        <Route path="/tecnologia" element={<TecnologiaPage />} />
        <Route path="/sistemas" element={<SistemasPage />} />
        <Route path="/equipos" element={<EquiposPage />} />
        <Route path="/industrias" element={<IndustriasPage />} />
        <Route path="/casos-de-uso" element={<CasosDeUsoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        
        {/* Placeholder catch-all for undefined routes from nav links */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <ScrollToTopButton />
      <Toaster theme="dark" position="bottom-right" />
    </Router>
  );
}

export default App;
