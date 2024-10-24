import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
        <div className='frame'>
            <h5>Encontre especialistas:</h5>
            <p>Busque por especialiatas de saúde em sua região.</p>
            <p>Filtre por planos de saúde, tratamentos ou disponibilidade.</p>
        </div>
        <div className='frame'>
            <h5>Agende consultas:</h5>
            <p>Escolha o profissional, dia e horário que desejar</p>
            <p>agendando sua consulta em até dois minutos.</p>
            <p>Sem complicação!</p>
        </div>
        <div className='frame'>
            <h5>Receba lembretes:</h5>
            <p>Confirmamos seu agendamento imediatamente pelo e-mail cadastrado</p>
            <p>e, antes da consulta um lembrete será enviado via WhatsApp!</p>
        </div>
        <div className='frame'>
            <h5>Avalie-nos!</h5>
            <p>Após a consulta você poderá deixar sua opinião sobre o serviço!</p>
            <p>Tudo de forma gratuita, simples e rápida!</p>
        </div>
      
    </div>
  )
}

export default Footer;
