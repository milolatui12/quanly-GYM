import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-bootstrap';

import { selectSupplierList } from '../../redux/supplier/supplier.selectors';


import SupplierForm from '../../components/supplier-form/supplier-form.componert';
import SupplierTable from '../../components/supplier-table/supplier-table.component';


import './suppliers-page.styles.scss';

const SupplierPage = ({ supplierList }) => {
    const [visible, setVisible] = useState(false);

    const onVisible = () => {
        setVisible(!visible)
    }


    return (
        <div className="suppliers-container">
            <h1>Nhà cung cấp</h1>
            <Button id="suppliers-btn" onClick={() => onVisible()}>Thêm</Button>
            <SupplierTable suppliers={supplierList} />
            <SupplierForm visible={visible} onVisible={onVisible} />
        </div>
    )
};

const mapStateToProps = ({ supplier }) => ({
    supplierList: supplier.suppliers
})



export default connect(mapStateToProps)(SupplierPage);