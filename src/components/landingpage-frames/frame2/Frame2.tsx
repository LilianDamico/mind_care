import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Frame2.css';

const Frame2: React.FC = () => {

    const navigate = useNavigate();

    const handleUsersListClick = () => {
        navigate('/userslist'); 
    };

    return (
        <div className='frame2-container'>
            <div>
                <button className="userslist" onClick={handleUsersListClick}>
                    
                    Conheça nossos profissionais!

                </button>
            </div>
        </div>
    )
}

export default Frame2;
