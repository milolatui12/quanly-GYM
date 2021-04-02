import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';


import 'rodal/lib/rodal.css';
import './receipt-form.styles.scss';

const ReceiptForm = ({ visible, onVisible, addEG }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const unitOptions = ["Cái", "Máy", "Cặp"];
    const [unit, setUnit] = useState(unitOptions[0]);

    const onSubmit = async (data) => {
        addEG({
            name: data.name,
            batch: data.batch,
            warrantyPeriod: data.warranty_period,
            unit: unit,
            quantity: data.quantity,
            price: data.price
        });
        reset();
    };

    return (
        <Rodal className="rodal" height={700} width={800} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Form.Group controlId="name">
                        <Form.Label>Thiết bị<span>(*)</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên thiết bị"
                            autoComplete="off"
                            ref={register({required: 'Name is required.'})}
                            className={`${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="batch">
                        <Form.Label>Lô hàng<span>(*)</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="batch"
                            placeholder="Nhập lô hàng"
                            autoComplete="off"
                            ref={register({required: 'Batch is required.'})}
                            className={`${errors.batch ? 'input-error' : ''}`}
                        />
                        {errors.batch && (
                            <p className="errorMsg">{errors.batch.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="warranty_period">
                        <Form.Label>Hạn bảo hành của nhà cung cấp(tháng)<span>(*)</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="warranty_period"
                            placeholder="Nhập hạn bảo hành"
                            autoComplete="off"
                            ref={register({required: 'Warranty is required.'})}
                            className={`${errors.warranty_period ? 'input-error' : ''}`}
                        />
                        {errors.warranty_period && (
                            <p className="errorMsg">{errors.warranty_period.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="unit">
                        <Form.Label>Đơn vị tính<span>(*)</span></Form.Label>
                        <Form.Control as="select" name="unit" value={unit} onChange={(event) => setUnit(event.target.value)}>
                            {unitOptions.map(opt => 
                                    <option value={opt}>{opt}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Số lượng<span>(*)</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="Nhập số lượng"
                            autoComplete="off"
                            ref={register({required: 'Quantity is required.'})}
                            className={`${errors.quantity ? 'input-error' : ''}`}
                        />
                        {errors.quantity && (
                            <p className="errorMsg">{errors.quantity.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Đơn giá<span>(*)</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Nhập đơn giá"
                            autoComplete="off"
                            ref={register({required: 'Price is required.'})}
                            className={`${errors.price ? 'input-error' : ''}`}
                        />
                        {errors.price && (
                            <p className="errorMsg">{errors.price.message}</p>
                        )}
                    </Form.Group>
                </div>
                <div className="btn-grp">
                    <Button variant="primary" type="submit">Thêm và tiếp tục</Button>
                    {/* <Button variant="primary" type="submit">Thêm và đóng</Button> */}
                </div>
            </Form>
        </Rodal>
    )
}

export default ReceiptForm;