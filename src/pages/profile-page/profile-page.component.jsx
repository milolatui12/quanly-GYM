import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import { selectSupplier } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';

import './profile-page.styles.scss';

const ProfilePage = ({ supplier, updateSupplier, history, user }) => {
    const [profile, setProfile] = useState({})
    useEffect(async () => {
        try {
            const record = await axios.post('http://localhost:3030/fetch-profile', {
                accountId: user.id
            })
            setProfile({...record.data, birth_date: record.data.birth_date.slice(0, 10)})
        } catch (error) {
            alert(error);
        }
    }, [])
    console.log(profile)

    const handleChange = event => {
        const { value, name } = event.target
        setProfile({ ...profile, [name]: value})
    }

    return (
        <div className="page">
            <img src="https://www.w3schools.com/w3css/img_snowtops.jpg" alt="avatar" height="200" width="200" class="avatar"/>
            <div className="info">
                <Form className="input-form">
                    <div className="col-l-9 offset-md-1">
                        <div className="name">
                            <Form.Group controlId="last_name">
                                <Form.Label>Họ</Form.Label>
                                <Form.Control
                                    name="last_name"
                                    value={profile.last_name}
                                    onChange={event => handleChange(event)}
                                />
                            </Form.Group>
                            <Form.Group controlId="first_name">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    name="first_name"
                                    value={profile.first_name}
                                    onChange={event => handleChange(event)}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="id_code">
                            <Form.Label>CMND</Form.Label>
                            <Form.Control
                                name="id_code"
                                value={profile.staff_code}
                                onChange={event => handleChange(event)}
                            />
                        </Form.Group>
                        <Form.Group controlId="birth_date">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_date"
                                value={profile.birth_date}
                                onChange={event => handleChange(event)}
                            />
                        </Form.Group>
                        <div className="btn-group">
                            <Button
                                variant="primary" type="button">Lưu</Button>
                            <Button
                                variant="primary" type="button">Đổi mật khẩu</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    supplier: selectSupplier(ownProps.match.params.suppId)(state),
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));