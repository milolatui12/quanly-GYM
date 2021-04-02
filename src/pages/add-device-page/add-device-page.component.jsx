import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

import DeviceTable from '../../components/device-table/device-table.component';
import ReceiptForm from '../../components/receipt-form/receipt-form.component';

import { addEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';

import './add-device-page.styles.scss';

const AddDevicePage = ({ suppliers, eGList, addEG }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [visible, setVisible] = useState(false);
    const [submitInfo, setSubmitInfo] = useState({supplier: '', date: '', rcpCode: '', eGList: eGList});

    const onVisible = () => {
        setVisible(!visible)
    }
    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <div className="container-add-page">
                <Form  onSubmit={handleSubmit(onSubmit)}>
                    <div id="headerr">
                        <Form.Group controlId="supplier">
                            <Form.Label>Nhà cung cấp</Form.Label>
                            <Form.Control as="select" name="supplier">
                                {suppliers.map(supplier => 
                                        <option value={supplier.taxId}>{supplier.name}</option>
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
                                required: 'Name is required.',
                                })}
                            />
                        </Form.Group>
                        <Form.Group controlId="rcp_code">
                            <Form.Label>Mã phiếu</Form.Label>
                            <Form.Control
                                type="number"
                                name="rcp_code"
                                autoComplete="false"
                                ref={register({
                                required: 'Name is required.',
                                })}
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
    addEG: (eG) => dispatch(addEquipmentGroup(eG))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevicePage);