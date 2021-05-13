import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import RecordTable from '../../components/record-table/record-table.component';
import RecordStateTable from '../../components/state-table/state-table.component';



import './homepage.styles.scss';

const HomePage = ({ user }) => {
    const [staffRecords, setStaffRecords] = useState([])
    const [stateRecords, setStateRecords] = useState([])
    const [btnState, setBtn] = useState('staff');
    useEffect(async () => {
        try {
            const record = await axios.post('http://localhost:3030/fetch-record', {
                rol: user.rol
            })
            const stateRecord = await axios.post('http://localhost:3030/fetch-state', {
                rol: user.rol
            })

            setStaffRecords([...record.data])
            setStateRecords([...stateRecord.data])
        } catch (error) {
            alert(error);
        }
    }, [])
    const handleClick = () => {
        alert('PRINTING')
    }
    const handleChange = event => {
        setBtn(event.target.name)
    }
    
    return (
        <div className="homepage">
            {
                (user.rol == 'admin')?
                <div>
                    <div className="btn-group">
                        <Button className={`${btnState == 'staff'? "chose": ""}`} type="button" name="staff" onClick={(e) => handleChange(e)}>Nhân viên</Button>
                        <Button className={`${btnState == 'equip'? "chose": ""}`} type="button" name="equip" onClick={(e) => handleChange(e)}>Thiết bị</Button>
                    </div>
                    {
                        btnState == 'staff'?
                        <RecordTable records={staffRecords}/>:
                        <RecordStateTable records={stateRecords}/>
                        
                    }
                    <Button>In</Button>
                </div>
                : 
                "Không có quyền thực hiện hành động này"
            }    
        </div>
    )
}

const mapStateToProps =({ user }) => ({
    user: user.currentUser
})

export default connect(mapStateToProps)(HomePage);