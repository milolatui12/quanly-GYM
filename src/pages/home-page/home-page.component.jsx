import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import RecordTable from '../../components/record-table/record-table.component';



import './homepage.styles.scss';

const HomePage = ({ user }) => {
    const [records, setRecords] = useState([])
    useEffect(async () => {
        try {
            const record = await axios.post('http://localhost:3030/fetch-record', {
                rol: user.rol
            })
            if(record.status == 200) return setRecords([...record.data])
            setRecords(undefined)
        } catch (error) {
            alert(error);
        }
    }, [])
    const handleClick = () => {
        alert('PRINTING')
    }
    return (
        <div className="homepage">
            {
                (records)?
                <div>
                    <Button type="button" onClick={() => handleClick()}>In</Button>
                    <RecordTable records={records}/>
                </div>
                : 
                "No permission"
            }
        </div>
    )
}

const mapStateToProps =({ user }) => ({
    user: user.currentUser
})

export default connect(mapStateToProps)(HomePage);