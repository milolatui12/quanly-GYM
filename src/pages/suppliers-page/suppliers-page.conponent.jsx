import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import SupplierForm from '../../components/supplier-form/supplier-form.componert';
import SupplierTable from '../../components/supplier-table/supplier-table.component';


import './suppliers-page.styles.scss';

const SupplierPage = ({ suppliers }) => {
    const [visible, setVisible] = useState(false);

    const onVisible = () => {
        setVisible(!visible)
    }
    return (
        <div className="suppliers-container">
            <Button id="suppliers-btn" onClick={() => onVisible()}>Thêm</Button>
            <SupplierTable suppliers={suppliers} />
            <SupplierForm visible={visible} onVisible={onVisible} />
        </div>
    )
};

const mapStateToProps = ({supplier}) => ({
    suppliers: supplier.suppliers
})


export default connect(mapStateToProps)(SupplierPage);