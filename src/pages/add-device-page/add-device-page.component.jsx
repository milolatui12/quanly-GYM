import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import DeviceTable from '../../components/device-table/device-table.component';
import ReceiptForm from '../../components/receipt-form/receipt-form.component';

import { addEquipmentGroup, cleanEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';
import { addReceipt } from '../../redux/receipt/receipt.actions';
import { addEquip } from '../../redux/equipment/equipment.actions';

import './add-device-page.styles.scss';

const AddDevicePage = ({ suppliers, eGList, addEG, cleanEG, addRcp, history, accountId, addEquip }) => {
    const { register, handleSubmit, errors } = useForm();
    const [visible, setVisible] = useState(false);
    const [supp, setSupp] = useState(suppliers[0].id);


    const onVisible = () => {
        setVisible(!visible)
    }
    const onSubmit = async (data) => {
        const total = eGList.reduce((acc, currItem) => (acc + (currItem.quantity*currItem.price)), 0)
        const supplier = suppliers.find(x => x.id == supp)
        try {
            const response = await axios.post('http://localhost:3030/add-receipt', {
                rcpCode: data.rcp_code,
                date: data.date,
                supplierId: supplier.id,
                accountId: accountId,
                total: total
            })
            if(response.status === 200) {
                addRcp({
                    ...response.data,
                    equipments: [...eGList],
                    rcp_date: response.data.rcp_date.slice(0, 10)
                })
                eGList.forEach(async eG => {
                    try {
                        const res = await axios.post('http://localhost:3030/add-eg', {
                            name: eG.name, 
                            warranty: eG.warrantyPeriod, 
                            unit: eG.unit, 
                            batch: eG.batch, 
                            rcpCode: data.rcp_code, 
                            quantity: eG.quantity, 
                            price: eG.price
                        })
                        for(let i = 1; i <= eG.quantity; i++) {
                            try {
                                await axios.post('http://localhost:3030/add-equipment', {
                                    egId: res.data.id
                                })
                            } catch (error) {
                                alert(error.message)
                            }
                        }
                    } catch (error) {
                        alert(error.message)
                    }
                })
                history.push('/receipt')
            } else {
                alert(response.data)
            }
        } catch (error) {
            alert("tr??ng m?? h??a ????n")
        }
    };
    useEffect(() => {
        return () => cleanEG()
    }, [])

    return (
        <div className="container-add-page page">
                <Form  onSubmit={handleSubmit(onSubmit)}>
                    <div id="headerr">
                        <div className="i-p">
                            <Form.Group controlId="supplier">
                                <Form.Label>Nh?? cung c???p</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="supplier" 
                                    value={supp} 
                                    onChange={event => setSupp(event.target.value)}
                                    ref={register()}>
                                    {suppliers.map(supplier => 
                                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Ng??y nh???p</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    autoComplete="off"
                                    ref={register({
                                        required: 'Date is required.',
                                    })}
                                    className={`${errors.date ? 'input-error' : ''}`}
                                />
                            </Form.Group>
                            <Form.Group controlId="rcp_code">
                                <Form.Label>M?? phi???u</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rcp_code"
                                    placeholder="M?? phi???u"
                                    autoComplete="false"
                                    ref={register({
                                        required: 'Kh??ng h???p l???.',
                                        min:0
                                    })}
                                    className={`${errors.rcp_code ? 'input-error' : ''}`}
                                />
                                {errors.rcp_code && (
                                    <p className="errorMsg">{errors.rcp_code.message}</p>
                                )}
                            </Form.Group>
                        </div>
                        <Button id="add-btn" type="button" onClick={() => onVisible()}>Th??m t??? danh m???c</Button>
                    </div>
                    <DeviceTable devices={eGList} />
                    <Button id="save-btn" type="submit">L??u</Button>
                </Form>
                <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} />
        </div>
    )
}

const mapStateToProps = ({ user, supplier, equipmentGroupList }) => ({
    suppliers: supplier.suppliers,
    eGList: equipmentGroupList.eGList,
    accountId: user.currentUser.id
});

const mapDispatchToProps = dispatch => ({
    addEG: (eG) => dispatch(addEquipmentGroup(eG)),
    addRcp: (rcp) => dispatch(addReceipt(rcp)), 
    cleanEG: () =>  dispatch(cleanEquipmentGroup()),
    addEquip: (equip) => dispatch(addEquip(equip))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevicePage);