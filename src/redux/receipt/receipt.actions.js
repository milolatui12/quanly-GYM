import ReceiptActionTypes from './receipt.types';

export const addReceipt = (receipt) => ({
    type: ReceiptActionTypes.ADD_RECEIPT,
    payload: receipt
})