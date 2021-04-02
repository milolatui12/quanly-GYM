import SupplierActionTypes from './supplier.types';
import { addSupplier } from './supplier.utils';
import SUPPLIERS from './DATA'

const INITIAL_STATE = {
    suppliers: SUPPLIERS
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
        default:
            return state;
    }
}

export default supplierReducer;