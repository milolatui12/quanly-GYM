const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'QLPG'
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected!')
        return pool
    })
    .catch(err => console.log('Connection failed!', err.message))

module.exports = {
    sql, poolPromise
}