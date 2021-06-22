import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../components/login/login.component';
import logo from '../../assets/logo.png';
import background from '../../assets/background.jpg'

import './login-page.styles.scss';

const LoginPage = () => {
    return (
        <div className="bg">
            <div className="img-container">
                <img src={logo} alt="logo" height={200} width={200}/>
            </div>
            <div className="text-field">
                <span>QUẢN LÝ THIẾT BỊ PHÒNG GYM</span>
            </div>
            <Route exact path='/' component={Login} />
        </div>
    )
};

export default LoginPage;