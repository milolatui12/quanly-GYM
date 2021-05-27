import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import ProfileForm from '../../components/profile-form/profile-form.component';

import { BackgroundImage } from './profile-page.styles.jsx';

import { selectSupplier } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';

import { TiWarning } from 'react-icons/ti';
import { RiExchangeLine } from 'react-icons/ri';


import './profile-page.styles.scss';

const ProfilePage = ({ supplier, history, user }) => {
    const [profile, setProfile] = useState({})
    const [visible, setVisible] = useState(false);
    const [check, setCheck] = useState(true)
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

    const onVisible = () => {
        setVisible(!visible)
    }
    const handleChange = event => {
        const { value, name } = event.target
        setProfile({ ...profile, [name]: value})
        setCheck(false)
    }
    const handleSubmit = async () => {
        try {
            const respone = await axios.post('http://localhost:3030/edit-profile', {
                staffId: profile.staff_id, 
                firstName: profile.first_name, 
                lastName: profile.last_name, 
                idCode: profile.id_code, 
                birthDate: profile.birth_date
            })
            if(respone.status == 200) {
                setCheck(true)
                return alert("Thay đổi thông tin thành công")
            }
            return alert("Thay đổi thông tin thất bại")
        } catch (error) {
            alert("Thay đổi thông tin thất bại")
        }
    }
    const uploadImage = (e) => {
        let file = e
        let reader = new FileReader();
        reader.onloadend = async function() {
            try {
                const respone = await axios.post('http://localhost:3030/change-avatar', {
                    accountId: user.id,
                    data: reader.result
                })
                if(respone.status == 200) {
                    setProfile({ ...profile, avatar: reader.result })
                    return alert("Thay đổi thông tin thành công")
                }
                return alert("Thay đổi thông tin thất bại")
            } catch (error) {
                alert("Thay đổi thông tin thất bại")
            }
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="page">
            <div className="image-container">
                <BackgroundImage image={profile? profile.avatar: ''} alt="avatar" />
                <RiExchangeLine/>
                <input type="file" onChange={e => uploadImage(e.target.files[0])}></input>
            </div>
            <div className="info">
                <Form className="input-form new">
                    {
                        check?<p></p>:<p className="warnning">chưa lưu<TiWarning/></p>
                    }
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
                                value={profile.id_code}
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
                        <div className="group-btn">
                            <Button
                                onClick={() => handleSubmit()}
                                variant="primary" type="button">Lưu</Button>
                            <Button
                                onClick={() => onVisible()}
                                variant="primary" type="button">Đổi mật khẩu</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <ProfileForm visible={visible} onVisible={onVisible} user={user}/>
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