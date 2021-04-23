import EquipmentGroupActionTypes from './equipment-group.types';

const INTIAL_STATE = {
    eGList: []
}

const equipmentGroupReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EquipmentGroupActionTypes.ADD_EQUIPMENT_GROUP:
            return {
                ...state,
                eGList: [...state.eGList, action.payload]
            }
        case EquipmentGroupActionTypes.CLEAN_EQUIPMENT_GROUP:
            return {
                ...state,
                eGList: []
            }
        default:
            return state;
    }
}

export default equipmentGroupReducer;