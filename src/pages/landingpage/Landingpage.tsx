import React from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import './Landingpage.css';
import Frame1 from '../../components/landingpage-frames/frame1/Frame1';
import Frame2 from '../../components/landingpage-frames/frame2/Frame2';
import Frame3 from '../../components/landingpage-frames/frame3/Frame3';
import Frame4 from '../../components/landingpage-frames/frame4/Frame4';
import Frame5 from '../../components/landingpage-frames/frame5/Frame5';
import Frame6 from '../../components/landingpage-frames/frame6/Frame6';
import Frame7 from '../../components/landingpage-frames/frame7/Frame7';

const Landingpage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame7 />
    </div>
  )
}

export default Landingpage;
