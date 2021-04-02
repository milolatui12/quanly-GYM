import EquipmentGroupActionTypes from './equipment-group.types';

export const addEquipmentGroup = (eG) => ({
    type: EquipmentGroupActionTypes.ADD_EQUIPMENT_GROUP,
    payload: eG
});