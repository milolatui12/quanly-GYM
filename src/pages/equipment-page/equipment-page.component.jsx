import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchEquips } from '../../redux/equipment/equipment.actions';
 
import EquipTable from '../../components/equip-table/equip-table.component';

const EquipmentPage = ({ equipment, fetchEquip }) => {
    useEffect(async () => {
        try {
            const equipment = await axios.get('http://localhost:3030/fetch-equipments')
            fetchEquip(equipment.data)
        } catch (error) {
            alert(error);
        }
    }, [])
    return (
        <div>
            <h1>Equipments</h1>
            <EquipTable equips={equipment} />
        </div>
    )
}

const mapStateToProps = ({ equipment }) => ({
    equipment: equipment.equipList
})

const mapDispatchToProps = dispatch => ({
    fetchEquip: equipments => dispatch(fetchEquips(equipments))
})

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage);