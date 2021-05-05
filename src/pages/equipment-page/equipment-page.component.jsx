import React from 'react';
import { connect } from 'react-redux';

import EquipTable from '../../components/equip-table/equip-table.component';

const EquipmentPage = ({ equipment }) => {
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

export default connect(mapStateToProps)(EquipmentPage);