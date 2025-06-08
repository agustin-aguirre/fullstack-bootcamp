import pg from "pg"

export { query }


function getDbClient() {
   return new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "authentication",
        password: "mysecretpassword",
        port: 5432,
    });
}


function interpolateQuery(query, values) {
  return query.replace(/\$(\d+)/g, (_, index) => {
    const value = values[parseInt(index) - 1];

    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
    // Escapar comillas simples
    return `'${String(value).replace(/'/g, "''")}'`;
  });
}


async function query(queryStr, data) {
    const dbClient = getDbClient();
    const interpolatedQuery = interpolateQuery(queryStr, data);
    try {
        dbClient.connect(() => {
            console.log("DB Connection established");
            console.log(`Executing: ${interpolatedQuery}`);
        });
        return await dbClient.query(queryStr, data);
    } catch (error) {
        console.error(`DB ERROR - Query failed - MESSAGE: ${error.message} - CAUSE: ${error.detail}`);
        throw error;
    }
    finally {
        await dbClient.end(() => console.log("DB Connection ended."));
    }
}