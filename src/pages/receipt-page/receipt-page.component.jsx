import React, { useState } from 'react';
import { connect } from 'react-redux';

import ReceiptTable from '../../components/receipt-table/receipt-table.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './receipt-page.styles.scss';

const ReceiptPage = ({ history, match, receipts }) => {
    return (
        <div className="device-container">
            <CustomButton id="device-btn" onClick={() => history.push(`${match.url}/adddevice`)}>Thêm</CustomButton>
            <ReceiptTable receipts={receipts}/>
        </div>
    )
}

const mapStateToProps = ({receipt}) => ({
    receipts: receipt.receipts
})

export default connect(mapStateToProps)(ReceiptPage);