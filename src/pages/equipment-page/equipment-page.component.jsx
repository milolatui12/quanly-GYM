import React from 'react';

import EquipTable from '../../components/equip-table/equip-table.component';

const EquipmentPage = () => {
    return (
        <div>
            <h1>Equipments</h1>
            <EquipTable equips={[]} />
        </div>
    )
}

export default EquipmentPage;