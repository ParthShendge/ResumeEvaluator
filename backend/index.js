const express = require("express");
const app = express();
const port = 8080;


const { Pool } = require("pg");



// Create connection pool
const pool = new Pool({
    user: "postgres",       // your DB username
    host: "localhost",
    database: "mydb",
    password: "Shival@7",
    port: 5432,
});

// Test connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    console.log("Connected to PostgreSQL ");
    release();
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});












app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

