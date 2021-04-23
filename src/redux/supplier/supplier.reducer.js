import SupplierActionTypes from './supplier.types';
import { addSupplier, updateSupplier } from './supplier.utils';

const INITIAL_STATE = {
    suppliers: []
}

const supplierReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SupplierActionTypes.ADD_SUPPLIER:
            return {
                ...state,
                suppliers: addSupplier(state.suppliers, action.payload)
            }
        case SupplierActionTypes.FETCH_SUPPLIERS:
            return {
                ...state,
                suppliers: action.payload
            }
        case SupplierActionTypes.UPDATE_SUPPLIER:         
            return {
                ...state,
                suppliers: updateSupplier(state.suppliers, action.payload.index, action.payload.supp)
            }
        default:
            return state;
    }
}

export default supplierReducer;