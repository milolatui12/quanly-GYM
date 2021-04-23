import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

import DeviceTable from '../../components/device-table/device-table.component';
import ReceiptForm from '../../components/receipt-form/receipt-form.component';

import { addEquipmentGroup, cleanEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';
import { addReceipt } from '../../redux/receipt/receipt.actions';

import './add-device-page.styles.scss';

const AddDevicePage = ({ suppliers, eGList, addEG, cleanEG, addRcp, history }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [visible, setVisible] = useState(false);
    const [supp, setSupp] = useState(suppliers[0].id);

    const onVisible = () => {
        setVisible(!visible)
    }
    const onSubmit = (data) => {
        const total = eGList.reduce((acc, currItem) => (acc + (currItem.quantity*currItem.price)), 0)
        const supplier = suppliers.find(x => x.id == supp)
        addRcp({
                rcpCode: data.rcp_code,
                date: data.date,
                supplier: supplier,
                equipments: [...eGList],
                total: total
        })
        history.push('/receipt')
    };
    useEffect(() => {
        return () => cleanEG()
    }, [])

    return (
        <div className="container-add-page">
                <Form  onSubmit={handleSubmit(onSubmit)}>
                    <div id="headerr">
                        <Form.Group controlId="supplier">
                            <Form.Label>Nhà cung cấp</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="supplier" 
                                value={supp} 
                                onChange={event => setSupp(event.target.value)}
                                ref={register({
                                    required: 'Supplier is required.',
                                })}>
                                {suppliers.map(supplier => 
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="date">
                            <Form.Label>Ngày nhập</Form.Label>
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
                            <Form.Label>Mã phiếu</Form.Label>
                            <Form.Control
                                type="number"
                                name="rcp_code"
                                autoComplete="false"
                                ref={register({
                                    required: 'Invalid.',
                                    min:0
                                })}
                                className={`${errors.rcp_code ? 'input-error' : ''}`}
                            />
                        </Form.Group>
                        <Button id="add-btn" type="button" onClick={() => onVisible()}>Thêm từ danh mục</Button>
                    </div>
                    <DeviceTable devices={eGList} />
                    <Button id="save-btn" type="submit">Lưu</Button>
                </Form>
                <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} />
        </div>
    )
}

const mapStateToProps = ({supplier, equipmentGroupList}) => ({
    suppliers: supplier.suppliers,
    eGList: equipmentGroupList.eGList
});

const mapDispatchToProps = dispatch => ({
    addEG: (eG) => dispatch(addEquipmentGroup(eG)),
    addRcp: (rcp) => dispatch(addReceipt(rcp)), 
    cleanEG: () =>  dispatch(cleanEquipmentGroup())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevicePage);