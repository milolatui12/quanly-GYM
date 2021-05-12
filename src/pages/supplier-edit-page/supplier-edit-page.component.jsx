import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import { selectSupplier } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';

const SupplierEdit = ({ supplier, updateSupplier, history, user }) => {
    const [supp, setSupplier] = useState({
        name: supplier.supplier.name,
        address: supplier.supplier.address,
        tax_id: supplier.supplier.tax_id,
        id: supplier.supplier.id
    })
    const id = supplier.supplier.id
    const handleChange = event => {
        const { value, name } = event.target
        setSupplier({ ...supp, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            const respone = await axios.post('http://localhost:3030/edit-supplier', {
                address: supp.address,
                name: supp.name,
                taxId: supp.tax_id,
                id: id,
                accountId: user.id
            })
            if(respone.status == 200) {
                updateSupplier(supplier.index, supp)
                history.push('/suppliers')
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div>
            <Form className="input-form">
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="tax_id">
                        <Form.Label>Mã thuế</Form.Label>
                        <Form.Control
                            name="tax_id"
                            value={supp.tax_id}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Tên nhà cung cấp</Form.Label>
                        <Form.Control
                            name="name"
                            value={supp.name}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Địa chỉ nhà cung cấp</Form.Label>
                        <Form.Control
                            name="address"
                            value={supp.address}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Button
                        onClick={() => handleSubmit()} 
                        variant="primary" type="button">Submit</Button>
                </div>
            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SupplierEdit));