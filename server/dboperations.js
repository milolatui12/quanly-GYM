let config = require('./configs');
let sql = require('mssql');


const getAccount = async () => {
    try {
        let pool = await sql.connect(config)
        let account = pool.request().query("SELECT * FROM ACCOUNT");
        console.log(account.recordsets)
        return account.recordsets;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAccount: getAccount
}