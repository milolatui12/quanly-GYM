import EquipmentActionTypes from './equipment.types';

export const fetchEquips = (equips) => ({
    type: EquipmentActionTypes.FETCH_EQUIPS,
    payload: equips
})