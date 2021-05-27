import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import AccountForm from '../../components/account-form/account-form.component'
import AccountTable from '../../components/account-table/account-table.component';

import './account-page.styles.scss';

const AccountPage = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [accounts, setAccounts] = useState([])
    useEffect(async () => {
        try {
            const acc = await axios.post('http://localhost:3030/fetch-accounts', {
                rol: user.rol
            })
            setAccounts([...acc.data])
        } catch (error) {
            alert(error);
        }
    }, [])

    const onVisible = () => {
        setVisible(!visible)
    }

    return (
        <div className="accounts-container page">
            {
                (user.rol == 'admin')?
                <div className="accounts-container page">
                    <h1>Tài khoản</h1>
                    <Button id="account-btn" onClick={() => onVisible()}>Thêm</Button>
                    <AccountTable accounts={accounts} />
                    <AccountForm visible={visible} onVisible={onVisible} setAccount={setAccounts} accounts={accounts} />
                </div>
                : 
                <h1>Không có quyền thực hiện hành động này</h1>
            }
        </div>
    )
};

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
})

export default connect(mapStateToProps)(AccountPage);

