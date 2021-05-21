const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { poolPromise } = require('./configs');


const app = express();
const PORT  = process.PORT || 3030;
app.use(express.json());
app.use(cors());
//app.use(userRouter);
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await poolPromise
        await pool.request()
            .input("username", sql.NVarChar(20), username)
            .input("password", sql.NVarChar(20), password)
            .execute("GetAccount")
            .then(data => {
                if(data.recordset[0]) {
                    return res.status(200).json(data.recordset[0])
                }
                return res.status(204).send('sai!')
            })
            .catch(err => res.status(204).send('sai!!'))
    } catch (error) {
        res.status(204).send('sai!!')
    }
})

app.post('/logup', async (req, res) => {
    const { accountId, idCode, firstName, lastName, birthDate, username, role } = req.body;
    try {
        const pool = await poolPromise
        await pool.request()
            .input("account_id", sql.Int, accountId)
            .input("id_code", sql.NVarChar(20), idCode)
            .input("first_name", sql.NVarChar(10), firstName)
            .input("last_name", sql.NVarChar(20), lastName)
            .input("birth_date", sql.Date, birthDate)
            .input("username", sql.NVarChar(20), username)
            .input("rol", sql.NVarChar(20), role)
            .execute("InsertAccount").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.get('/fetch-suppliers', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request().query(`select * from suppliers`, (err, record) => {
            if(err) return res.status(500).send(err.message)
            return res.json(record.recordset)
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/add-supplier', async (req, res) => {
    const { address, name, taxId, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("ten", sql.NVarChar(50), name)
            .input("diachi", sql.NVarChar(50), address)
            .input("mathue", sql.NVarChar(20), taxId)
            .input("account_id", sql.Int, accountId)
            .execute("InsertNcc").then(record => {
                return res.status(200).json(record.recordset[0])
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/edit-supplier', async (req, res) => {
    const { address, name, taxId, id, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, id)
            .input("tenncc", sql.NVarChar(50), name)
            .input("mathue", sql.NVarChar(20), taxId)
            .input("diachi", sql.NVarChar(50), address)
            .input("account_id", sql.Int, accountId)
            .execute("EditNcc").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/delete-supplier', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("account_id", sql.Int, req.body.accountId)
            .execute("DeleteNcc").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status.send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/add-receipt', async (req, res) => {
    const { rcpCode, date, supplierId, staffId, total } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rcp_code", sql.NVarChar(20), rcpCode)
            .input("rcp_date", sql.Date, date)
            .input("supplier_id", sql.Int, supplierId)
            .input("staff_id", sql.Int, staffId)
            .input("total", sql.Money, total)
            .input("account_id", sql.Int, staffId)
            .execute("InsertReceipt").then(record => {
                return res.status(200).json(record.recordset[0])
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})  

app.get('/fetch-receipt', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request().query(`select receipt.id, rcp_code, rcp_date, supplier_id, name, staff_id, total from receipt inner join suppliers on receipt.supplier_id = suppliers.id`, (err, record) => {
            if(err) return res.status(500).send(err.message)
            return res.json(record.recordset)
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/delete-receipt', async (req, res) => {
    const { rcp_code, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rcp_code", sql.NVarChar(20), rcp_code)
            .input("account_id", sql.Int, accountId)
            .execute("DeleteReceipt").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/edit-receipt', async (req, res) => {
    const { id, rcp_code, rcp_date, supplierId, staffId, total } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, id)
            .input("rcp_code", sql.NVarChar(20), rcp_code)
            .input("rcp_date", sql.Date, rcp_date)
            .input("supplier_id", sql.Int, supplierId)
            .input("staff_id", sql.Int, staffId)
            .input("total", sql.Money, total)
            .input("account_id", sql.Int, staffId)
            .execute("EditReceipt").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/add-eg', async (req, res) => {
    const { name, warranty, unit, batch, rcpCode, quantity, price } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("eg_name", sql.NVarChar(20), name)
            .input("warranty", sql.Int, warranty)
            .input("unit", sql.NVarChar(10), unit)
            .input("batch", sql.NVarChar(10), batch)
            .input("rcp_code", sql.NVarChar(20), rcpCode)
            .input("quantity", sql.Int, quantity)
            .input("price", sql.Money, price)
            .execute("InsertEg").then(record => {
                return res.status(200).json(record.recordset[0])
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/delete-eg', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rcp_code", sql.NVarChar(20), req.body.rcpCode)
            .execute("DeleteEG").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/fetch-eg', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rcp_code", sql.NVarChar(20), req.body.rcp_code)
            .execute("FetchEG").then(record => {
                return res.status(200).json(record.recordset)
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/add-equipment', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("eg_id", sql.Int, req.body.egId)
            .execute("InsertEquipment").then(record => {
                return res.status(200).send('success')
            }).catch(err => res.status(500).send(err.message))
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.get('/fetch-equipments', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .execute("GetEquipment").then(record => {
                return res.status(200).json(record.recordset)
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/fetch-equipment', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, req.body.id)
            .execute("FetchEquipment").then(record => {
                return res.status(200).json(record.recordset[0])
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/edit-equipment', async (req, res) => {
    const { id, stateDes, des, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, id)
            .input("state_des", sql.NVarChar(20), stateDes)
            .input("des", sql.NVarChar(50), des)
            .input("account_id", sql.Int, accountId)
            .execute("EditEquipment").then(record => {
                return res.status(200).send("success")
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/delete-equipment', async (req, res) => {
    const { id, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("id", sql.Int, id)
            .input("account_id", sql.Int, accountId)
            .execute("DeleteEquipment").then(record => {
                return res.status(200).send("success")
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/fetch-record', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rol", sql.NVarChar(10), req.body.rol)
            .execute("FetchRecord").then(record => {
                if(!record.recordset[0].msg) return res.status(200).json(record.recordset)
                return res.status(200).json(record.recordset)
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.post('/fetch-state', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
        .input("rol", sql.NVarChar(10), req.body.rol)
        .execute("GetStateRecord").then(record => {
            return res.status(200).json(record.recordset)
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/fetch-accounts', async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rol", sql.NVarChar(10), req.body.rol)
            .execute("GetAccounts").then(record => {
                if(!record.recordset[0].msg) return res.status(200).json(record.recordset)
                return res.status(200).json(record.recordset)
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/reset-password', async (req, res) => {
    const { role, id, accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("rol", sql.NVarChar(10), role)
            .input("id", sql.Int, id)
            .input("account_id", sql.Int, accountId)
            .execute("ResetPwd").then(record => {
                return res.status(200).send("success")
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/fetch-profile', async (req, res) => {
    const { accountId } = req.body
    try {
        const pool = await poolPromise
        await pool.request()
            .input("account_id", sql.Int, accountId)
            .execute("GetProfile").then(record => {
                return res.status(200).json(record.recordset[0])
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/', (req, res) => {
    res.send('<h1>SERVER RUN</h1>');
});

app.listen(PORT, () => {
    console.log('server running on ', PORT);
})