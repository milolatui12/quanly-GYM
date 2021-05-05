import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ReceiptTable from '../../components/receipt-table/receipt-table.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { fetchReceipt } from '../../redux/receipt/receipt.actions';

import './receipt-page.styles.scss';

const ReceiptPage = ({ history, match, receipts, fetchReceipts }) => {

    useEffect(async () => {
        try {
            const receipt = await axios.get('http://localhost:3030/fetch-receipt')
            fetchReceipts(receipt.data)
        } catch (error) {
            alert(error);
        }
    }, [])
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

const mapDispatchToProps = dispatch => ({
    fetchReceipts: receipts => dispatch(fetchReceipt(receipts))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptPage);