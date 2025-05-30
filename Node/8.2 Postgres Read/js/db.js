export { getAllFlags }

import pg from "pg"

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "mysecretpassword",
    port: 5432
});


db.on("error", (err) => {
    console.error("Error fetching data.", err.stack);
});


const Q_ALL_FLAGS = "SELECT country, flag FROM flags ORDER BY id ASC;";

async function queryDb(queryStr) {
    await db.connect();
    const result = await db.query(queryStr);
    await db.end();
    return result.rows;
}


async function getAllFlags() {
    return await queryDb(Q_ALL_FLAGS);
}