import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from '../components/Inicio';
import TendenciaCentral from '../components/TendenciaCentral';
import Dispersion from '../components/Dispersion';
import Forma from '../components/Forma';
import Localizacion from '../components/Localizacion';
import Histo_Frec from '../components/Histo_Frec';
import Parametros from '../components/Parametros';
import Limites from '../components/Limites';
import Caja from '../components/Caja';
import { TablaProvider } from '../contexts/TablaContext';

const AppRoutes = () => {
    return (
        <TablaProvider>
            <Router>
                <Routes>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/tendencia" element={<TendenciaCentral />} />
                    <Route path="/dispersion" element={<Dispersion />} />
                    <Route path="/forma" element={<Forma />} />
                    <Route path="/localizacion" element={<Localizacion />} />
                    <Route path="/histograma" element={<Histo_Frec />} />
                    <Route path="/parametros" element={<Parametros />} />
                    <Route path="/limites" element={<Limites />} />
                    <Route path="/caja" element={<Caja />} />

                    <Route path="*" element={<Navigate to="/inicio" />} />
                </Routes>
            </Router>
        </TablaProvider>
    );
};

export default AppRoutes;
