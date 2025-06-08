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
    try {
        dbClient.connect((err) => {
            if (err) {
                console.log("DB Connection couldn't be established because: ", err);
            } else {
                console.log("DB Connection established");
                console.log("Executing: " + interpolateQuery(queryStr, data));
            }
        });
        return await dbClient.query(queryStr, data);
    } catch (error) {
        const dataMsg = {
            query: queryStr,
            data: data
        }
        console.error(`DB ERROR - Query failed: ${JSON.stringify(dataMsg)}.`, error);
        throw error;
    }
    finally {
        await dbClient.end(() => console.log("DB Connection ended."));
    }
}