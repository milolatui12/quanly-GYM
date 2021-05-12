import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../redux/user/user.actions';

import { slide as Menu } from 'react-burger-menu';

import './header.styles.scss';

const Header = ({ signOut, user }) => {
    return (
        <div className="header">
            <div className="slice-bar">
                <Menu>
                    <Link to="/">Home</Link>
                    <Link to="/suppliers">Nhà Cung Cấp</Link>
                    <Link to="/receipt">Hóa Đơn</Link>
                    <Link to="/equipment">Thiết bị</Link>
                    <Link to="/" onClick={() => signOut()}>Đăng Xuất</Link>
                </Menu>
                <Link className="logo-container" to='/'>
                    <img  alt="Logo" width={70} height={55} />        
                </Link>
            </div>
            <div className="user-name">
                <span>{user.username}_{user.rol}</span>
            </div>
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);