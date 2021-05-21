import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';

import { addSupplier } from '../../redux/supplier/supplier.actions';

import 'rodal/lib/rodal.css';

const AccountForm = ({ visible, onVisible, addSupplier, user }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const rolOptions = ["admin", "staff"];
    const [rol, setRol] = useState(rolOptions[0]);
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/logup', {
                accountId: user.id, 
                idCode: data.id_code, 
                firstName: data.first_name, 
                lastName: data.last_name, 
                birthDate: data.birth_date, 
                username: data.username, 
                role: data.rol
            })
            // addSupplier({
            //     ...response.data
            // });
            onVisible();
            reset();          
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Rodal height={700} width={500} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="last_name">
                        <Form.Label>Họ nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            placeholder="Nhập họ nhân viên"
                            autoComplete="off"
                            ref={register({
                            required: 'Name is required.',
                            pattern: {
                                value: /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Họ nhân viên chỉ chứa các ký tự chữ.'
                            }
                            })}
                            className={`${errors.last_name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.last_name.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="first_name">
                        <Form.Label>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="Nhập tên nhân viên"
                            autoComplete="off"
                            ref={register({
                            required: 'Name is required.',
                            pattern: {
                                value: /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Tên nhân viên chỉ chứa các ký tự chữ.'
                            }
                            })}
                            className={`${errors.first_name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.first_name.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group controlId="id_code">
                        <Form.Label>CMND</Form.Label>
                        <Form.Control
                            type="text"
                            name="id_code"
                            placeholder="Nhập CMND"
                            autoComplete="off"
                            ref={register({
                            required: 'Id number is required.',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'CMND không bao gồm ký tự chữ.'
                            }
                            })}
                            className={`${errors.id_code ? 'input-error' : ''}`}
                        />
                        {errors.tax_num && (
                            <p className="errorMsg">{errors.id_code.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="birth_date">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            name="birth_date"
                            autoComplete="off"
                            ref={register()}
                            className={`${errors.birth_date ? 'input-error' : ''}`}
                        />
                        {errors.address && (
                            <p className="errorMsg">{errors.birth_date.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            autoComplete="off"
                            ref={register({
                            required: 'Name is required.',
                            pattern: {
                                value: /^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Họ nhân viên chỉ chứa các ký tự chữ và số.'
                            }
                            })}
                            className={`${errors.username ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.username.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="rol">
                        <Form.Label>Quyền</Form.Label>
                        <Form.Control as="select" name="rol" value={rol} onChange={(event) => setRol(event.target.value)} ref={register()}>
                            {rolOptions.map(rol => 
                                    <option value={rol}>{rol}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Thêm</Button>
                </div>
            </Form>
        </Rodal>
    )
}

const mapStateToProps =({ user }) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    addSupplier: supplier => dispatch(addSupplier(supplier))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);