import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';

import { addSupplier } from '../../redux/supplier/supplier.actions';

import 'rodal/lib/rodal.css';

const SupplierForm = ({ visible, onVisible, addSupplier }) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/addsupplier', {
                address: data.address,
                name: data.name,
                taxId: data.tax_num
            })
            addSupplier({
                ...response.data
            });
            onVisible();
            reset();          
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Rodal height={500} width={500} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="name">
                        <Form.Label>Tên nhà cung cấp</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên nhà cung cấp"
                            autoComplete="off"
                            ref={register({
                            required: 'Name is required.',
                            pattern: {
                                value: /^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Tên nhà cung cấp chỉ chứa các ký tự chữ và số.'
                            }
                            })}
                            className={`${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group controlId="tax_num">
                        <Form.Label>Mã số thuế</Form.Label>
                        <Form.Control
                            type="text"
                            name="tax_num"
                            placeholder="Nhập mã số thuế"
                            autoComplete="off"
                            ref={register({
                            required: 'Tax number is required.',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'MST không bao gồm ký tự chữ.'
                            }
                            })}
                            className={`${errors.tax_num ? 'input-error' : ''}`}
                        />
                        {errors.tax_num && (
                            <p className="errorMsg">{errors.tax_num.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ nhà cung cấp"
                            autoComplete="off"
                            ref={register({
                            required: 'Address is required.',
                            pattern: {
                                value: /^[0-9a-zA-Z/,àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Địa chỉ nhà cung cấp chỉ chứa các ký tự chữ và số.'
                            }
                            })}
                            className={`${errors.address ? 'input-error' : ''}`}
                        />
                        {errors.address && (
                            <p className="errorMsg">{errors.address.message}</p>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">Next</Button>
                </div>
            </Form>
        </Rodal>
    )
}

const mapDispatchToProps = dispatch => ({
    addSupplier: supplier => dispatch(addSupplier(supplier))
})

export default connect(null, mapDispatchToProps)(SupplierForm);