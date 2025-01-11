const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'pyramid_be',
    port: 5432,
})

module.exports = pool;