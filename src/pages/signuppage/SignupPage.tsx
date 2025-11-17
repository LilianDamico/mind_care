import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-choice-container">
      <h2>Cadastre-se</h2>
      <div className="signup-buttons">
        <button onClick={() => navigate('/signupuserpage')}>Cadastre-se aqui!</button>
      </div>
    </div>
  );
};

export default SignupPage;
