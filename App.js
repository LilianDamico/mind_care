import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Cadastros from './pages/cadastros/Cadastros.tsx';
import Contato from './pages/contato/Contato.tsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>      
    </Router>
  );
}

export default App;
