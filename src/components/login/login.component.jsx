import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { setCurrentUser } from '../../redux/user/user.actions'; 
import { fetchSuppliers } from '../../redux/supplier/supplier.actions';

import './login.styles.scss';

const Login = ({ setUser, fetchSuppliers }) => {
    const { register, handleSubmit, errors } = useForm();
    const [userCredentials, setCredentials] = useState(''); 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/login', {
                username: data.user_name,
                password: data.password,
            });
            if (response.status == 204) {
                alert("sai thông tin đăng nhập")
            } else {
                setUser({ 
                    userName: response.data.USERNAME,
                    role: response.data.ROLES    
                });
                try {
                    const suppliers = await axios.get('http://localhost:3030/fetch-suppliers')
                    fetchSuppliers(suppliers.data)
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="form-container">
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="user_name">
                    <Form.Label>User name</Form.Label>
                    <Form.Control 
                        type="text"
                        name="user_name"
                        placeholder="Enter your user name"
                        ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Tên đăng nhập không hợp lệ"
                            }
                        })}
                        className={`${errors.user_name? 'input-error': ''}`}
                    />
                    {errors.user_name && (
                        <p className="errorMsg">{errors.user_name.message}</p>
                    )}
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        ref={register({
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Mật khẩu chứa ít nhất 6 ký tự"
                            }
                        })}
                        className={`${errors.password? 'input-error': ''}`}
                    />
                    {errors.password && (
                        <p className="errorMsg">{errors.password.message}</p>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">Đăng nhập</Button>
            </Form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setCurrentUser(user)),
    fetchSuppliers: suppliers => dispatch(fetchSuppliers(suppliers))
})

export default connect(null, mapDispatchToProps)(Login);
