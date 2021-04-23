import ReceiptActionTypes from './receipt.types';

const INITIAL_STATE = {
    receipts: []
}

const receiptReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReceiptActionTypes.ADD_RECEIPT:
            return {
                ...state,
                receipts: [...state.receipts, action.payload]
            }
        default:
            return state
    }
};

export default receiptReducer;