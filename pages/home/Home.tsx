import React from 'react';
import Menu from '../../components/menu/Menu.tsx';
import Footer from '../../components/footer/Footer.tsx';
import './Home.css';

import head from '../../assets/images/head.png';

function Home() {
  return (
    <div>
      <Menu />
      <div className='container-home'>
        <div className='dialog-box'>
          <h2>Mindcare</h2>
          <h4>Onde médicos, pacientes e familiares se encontram!</h4>
          <p>
            Cuidar de sua saúde mental nunca foi tão acessível e seguro!
          </p>
          <p>
            No MindCare, médicos, especialistae e pacientes se encontram
            em um ambiente "online" dedicado ao bem estar emocional
            e psicológico.
          </p>
          <p>
            Inscreva-se e faça parte dessa jornada de cuidado e acolhimento.
          </p>
          <h4>Venha para a MindCare!</h4>
        </div>
        <div className='home-decor'>
          <img src={ head } alt="imagem" />
        </div>        
      </div> 
      <Footer />     
    </div>
  )
}

export default Home;
