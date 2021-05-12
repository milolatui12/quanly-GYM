import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import { selectReceipt } from '../../redux/receipt/receipt.selectors';
import { selectSupplierList } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';
import { addEquipmentGroup, cleanEquipmentGroup, fetchEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';
import { addReceipt } from '../../redux/receipt/receipt.actions';
import { addEquip } from '../../redux/equipment/equipment.actions';

import ReceiptForm from '../../components/receipt-form/receipt-form.component';
import DeviceTable from '../../components/device-table/device-table.component';

import './receipt-edit-page.styles.scss';

const SupplierEdit = ({ receipt, suppliers, eGList, addEG, cleanEG, history, fetchEG }) => {
    const [rcp, setReceipt] = useState({
        name: receipt.receipt.name,
        rcp_code: receipt.receipt.rcp_code,
        rcp_date: receipt.receipt.rcp_date,
        supplier_id: receipt.receipt.supplier_id,
        id: receipt.receipt.id
    })
    const [supp, setSupp] = useState(suppliers.find(x => x.id == rcp.supplier_id).id)
    const [visible, setVisible] = useState(false)
    
    useEffect(async () => {
        try {
            const response = await axios.post('http://localhost:3030/fetch-eg', {
                rcp_code: rcp.rcp_code 
            })
            fetchEG(response.data)
        } catch (error) {
            alert(error);
        }
    }, [])
    const onVisible = () => {
        setVisible(!visible)
    }
    const id = receipt.receipt.id
    const handleChange = event => {
        const { value, name } = event.target
        setReceipt({ ...rcp, [name]: value})
    }
    useEffect(() => {
        return () => cleanEG()
    }, [])
    const handleSubmit = async () => {
        const total = eGList.reduce((acc, currItem) => (acc + (currItem.quantity*currItem.price)), 0)
        try {
            const respone = await axios.post('http://localhost:3030/edit-receipt', {
                id: id,
                rcp_code: rcp.rcp_code,
                rcp_date: rcp.rcp_date,
                supplierId: supp,
                staffId: 1,
                total: total
            })
            // if(respone.status == 200) {
            //     try {
            //         await axios.post('http://localhost:3030/delete-eg', {
            //             rcpCode: rcp.rcp_code
            //         })
            //         eGList.forEach(async eG => {
            //             try {
            //                 const res = await axios.post('http://localhost:3030/add-eg', {
            //                     name: eG.name, 
            //                     warranty: eG.warrantyPeriod, 
            //                     unit: eG.unit, 
            //                     batch: eG.batch, 
            //                     rcpCode: rcp.rcp_code, 
            //                     quantity: eG.quantity, 
            //                     price: eG.price
            //                 })
            //             } catch (error) {
            //                 alert(error.message)
            //             }
            //         })
            //     } catch (error) {
            //         alert(error.message)
            //     }
            // }
            history.push('/receipt')
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="container-add-page">
            <Form>
                <div className="headerr">
                    <Form.Group controlId="name">
                        <Form.Label>Tên nhà cung cấp</Form.Label>
                        <Form.Control
                            as="select"
                            name="name"
                            value={supp}
                            onChange={event => setSupp(event.target.value)}
                        >
                            {suppliers.map(supplier => 
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="rcp_date">
                        <Form.Label>Ngày nhập</Form.Label>
                        <Form.Control
                            type="date"
                            name="rcp_date"
                            value={rcp.rcp_date}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rcp_code">
                        <Form.Label>Mã phiếu</Form.Label>
                        <Form.Control
                            name="rcp_code"
                            value={rcp.rcp_code}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    {/* <Button id="add-btn" type="button" onClick={() => onVisible()}>Thêm từ danh mục</Button> */}
                    <Button
                        onClick={() => handleSubmit()} 
                        variant="primary" type="button">Lưu</Button>
                </div>
                <DeviceTable devices={eGList} />
            </Form>
            <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} />
        </div>
    )

    // return (
    //     <div className="container-add-page">
    //             <Form  >
    //                 <div id="headerr">
    //                     <Form.Group controlId="supplier">
    //                         <Form.Label>Nhà cung cấp</Form.Label>
    //                         <Form.Control 
    //                             as="select" 
    //                             name="supplier" 
    //                             value={supp} 
    //                             onChange={event => setSupp(event.target.value)}
    //                             ref={register({
    //                                 required: 'Supplier is required.',
    //                             })}>
    //                             {suppliers.map(supplier => 
    //                                     <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
    //                             )}
    //                         </Form.Control>
    //                     </Form.Group>
                        
    //                     <Form.Group controlId="date">
    //                         <Form.Label>Ngày nhập</Form.Label>
    //                         <Form.Control
    //                             type="date"
    //                             name="date"
    //                             autoComplete="off"
    //                             ref={register({
    //                                 required: 'Date is required.',
    //                             })}
    //                             className={`${errors.date ? 'input-error' : ''}`}
    //                         />
    //                     </Form.Group>
    //                     <Form.Group controlId="rcp_code">
    //                         <Form.Label>Mã phiếu</Form.Label>
    //                         <Form.Control
    //                             type="number"
    //                             name="rcp_code"
    //                             autoComplete="false"
    //                             ref={register({
    //                                 required: 'Invalid.',
    //                                 min:0
    //                             })}
    //                             className={`${errors.rcp_code ? 'input-error' : ''}`}
    //                         />
    //                     </Form.Group>
    //                     <Button id="add-btn" type="button" onClick={() => onVisible()}>Thêm từ danh mục</Button>
    //                 </div>
    //                 <DeviceTable devices={eGList} />
    //                 <Button id="save-btn" type="submit">Lưu</Button>
    //             </Form>
    //             <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} />
    //     </div>
    // )
}

const mapStateToProps = (state, ownProps) => ({
    receipt: selectReceipt(ownProps.match.params.rcpId)(state),
    suppliers: selectSupplierList(state),
    eGList: state.equipmentGroupList.eGList,
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data)),
    addEG: (eG) => dispatch(addEquipmentGroup(eG)),
    addRcp: (rcp) => dispatch(addReceipt(rcp)), 
    cleanEG: () =>  dispatch(cleanEquipmentGroup()),
    addEquip: (equip) => dispatch(addEquip(equip)), 
    fetchEG: (eG) => dispatch(fetchEquipmentGroup(eG))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SupplierEdit));