const mySql=require("mysql")
const db =mySql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: 'bbc7fa19a58375',
    password: "4b754095",
    database: "heroku_b08d77ac4836841",
    port:"3306"

})
module.exports =db
