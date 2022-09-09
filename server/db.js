const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    host: process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_PORT,
    database: process.env.REACT_APP_DATABASE
});

module.exports = pool;