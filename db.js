const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'pyramid',
    port: 5432,
})

module.exports = pool;