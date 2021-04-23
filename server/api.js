const db = require('./dboperations');
const Account = require('./account');

db.getAccount().then(result => {
    console.log(result);
})