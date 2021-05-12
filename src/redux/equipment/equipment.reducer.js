import EquipmentActionTypes from './equipment.types';

const INTIAL_STATE = {
    equipList: []
}

const equipmentReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EquipmentActionTypes.FETCH_EQUIPS:
            return {
                ...state,
                equipList: [...action.payload]
            }
        case EquipmentActionTypes.ADD_EQUIP:
            return {
                ...state,
                equipList: [...state.equipList, action.payload]
            }
        default:
            return state;
    }
}

export default equipmentReducer;