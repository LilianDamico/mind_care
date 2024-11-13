import React from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import './Landingpage.css';
import Frame1 from '../../components/landingpage-frames/frame1/Frame1';
import Frame2 from '../../components/landingpage-frames/frame2/Frame2';

const Landingpage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Frame1 />
      <Frame2 />
    </div>
  )
}

export default Landingpage;
