import pg from "pg"

export { query, DataLayerError }


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
        await dbClient.connect(() => console.log(`Executing: ${interpolatedQuery}`));
        const result = await dbClient.query(queryStr, data);
        return result;
    }
    catch (error) {
        console.error(`DB ERROR - Query failed - CAUSE: ${error.detail}`);
        throw new DataLayerError(`Database error. Cause: ${error.detail}.`);
    }
    finally {
        await dbClient.end(() => console.log("DB Connection ended."));
    }
}


class DataLayerError extends Error {
    constructor(message) {
        super(message);
        this.name = "Data Layer Error";
    }
}