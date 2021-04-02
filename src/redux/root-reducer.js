import { combineReducers } from 'redux';
import supplierReducer from './supplier/supplier.reducer';
import userReducer from './user/user.reducer';
import equipmentGroupReducer from './equipment-group/equipment-group.reducer';

const rootReducer = combineReducers({
    supplier: supplierReducer,
    user: userReducer,
    equipmentGroupList: equipmentGroupReducer
});

export default rootReducer;