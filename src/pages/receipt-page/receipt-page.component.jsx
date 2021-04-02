import React, { useState } from 'react';
import { connect } from 'react-redux';

import ReceiptTable from '../../components/receipt-table/receipt-table.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './receipt-page.styles.scss';

const ReceiptPage = ({ history, match }) => {
    return (
        <div className="device-container">
            <CustomButton id="device-btn" onClick={() => history.push(`${match.url}/adddevice`)}>Thêm</CustomButton>
            <ReceiptTable receipts={[1]}/>
        </div>
    )
}

export default ReceiptPage;