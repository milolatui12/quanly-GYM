import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import { updateSupplier } from '../../redux/supplier/supplier.actions';

const EquipmentEdit = ({ user, history, match }) => {
    const [equipment, setEquipment] = useState({})
    
    
    useEffect(async () => {
        const equip = await axios.post('http://localhost:3030/fetch-equipment', {
            id: match.params.equipId
        })
        
        setEquipment({ ...equip.data })
    }, [])
    const options = ["Hư", "Bình thường", "Đang sữa chữa"]
    const index = options.indexOf(options.find(x => x == equipment.state_des))
    const [state, setState] = useState(options[index])
    useEffect(() => {
        setState(options[index])
    }, [equipment.state_des])

    const handleChange = event => {
        const { value, name } = event.target
        setEquipment({ ...equipment, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            const respone = await axios.post('http://localhost:3030/edit-equipment', {
                id: match.params.equipId,
                stateDes: state,
                des: equipment.des, 
                accountId: user.id
            })
            if(respone.status == 200) {
                history.push('/equipment')
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="page">
            <Form className="input-form">
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="tax_id">
                        <Form.Label>Tên thiết bị</Form.Label>
                        <Form.Control
                            name="no"
                            value={equipment.eg_name}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Hạn bảo hành</Form.Label>
                        <Form.Control
                            name="no"
                            value={equipment.warranty}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>Tình trạng<span>(*)</span></Form.Label>
                        <Form.Control as="select" name="state_des" value={state} onChange={(event) => setState(event.target.value)}>
                            {options.map(opt => 
                                    <option value={opt}>{opt}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            name="des"
                            as="textarea"
                            value={equipment.des}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Button
                        onClick={() => handleSubmit()} 
                        variant="primary" type="button">Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EquipmentEdit));