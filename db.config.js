var Client = require("mysql-pro");

var db = {};

db.client = new Client({
    mysql: {
        host: "localhost",
        port: 3306,
        database: "api_connect",
        user: "root",
        password: "123456"
    }
});

db.query = async sql => {
    await db.client.startTransaction();
    var result = await db.client.executeTransaction(sql,[])
    await db.client.stopTransaction()
    return result
}

module.exports = db