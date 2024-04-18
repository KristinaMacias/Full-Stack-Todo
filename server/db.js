// connect server to database

const Pool= require("pg").Pool; // import Pool class from pg module to connect to postgres database

// create a new Pool object and pass the connection details
const pool = new Pool({
    user: 'postgres',
    password: 'Gobeach2017!',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool; // export the pool object to use in other files