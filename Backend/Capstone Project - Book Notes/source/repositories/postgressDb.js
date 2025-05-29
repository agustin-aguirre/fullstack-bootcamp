import pg  from "pg";

export { Book, getAll, create, update, remove }

const Q_GET_ALL_BOOKS = 'SELECT * FROM books ORDER BY id ASC;';
const Q_CREATE_ITEM = 'INSERT INTO items(title) VALUES($1) RETURNING id;';
const Q_UPDATE_ITEM = 'UPDATE items SET title = $1 WHERE id = $2;';
const Q_DELETE_ITEM = 'DELETE FROM items WHERE id = $1;';


function Book(title, author, genre, review, coverUrl, id = 0) {
    this.id = parseInt(id);
    this.title = new String(title).trim();
    this.author = new String(author).trim();
    this.genre = new String(genre).trim();
    this.review = new String(review).trim();
    if (coverUrl)
        this.coverUrl = new String(coverUrl).trim();
}


function getDbClient() {
   return new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "bookblog",
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


async function query(queryFunction, query, data) {
    const dbClient = getDbClient();
    try {
        dbClient.connect().then(() => console.log("Executing: " + interpolateQuery(query, data)));
        const result = await queryFunction(dbClient);
        return result;
    } catch (error) {
        const dataMsg = {
            query: query,
            data: data
        }
        console.error(`DB ERROR - Query failed: ${JSON.stringify(dataMsg)}.`, error);
        throw error;
    }
    finally {
        dbClient.end().then(() => console.log("DB Connection ended."));
    }
}



async function getAll() {
    const result = await query((dbClient) => dbClient.query(Q_GET_ALL_BOOKS), Q_GET_ALL_BOOKS, null);
    console.log(result.rows);
    return result.rows.map(({id, title, author, genre, review, cover_url}) => new Book(title, author, genre, review, cover_url, id));
}

async function create(newItem) {
    console.log("Performing add...")
    newItem.id = await query((dbClient) => dbClient.query(Q_CREATE_ITEM, [newItem.title]), Q_CREATE_ITEM, newItem);
    console.log(newItem);
    return newItem;
}

async function update(updatedItem) {
    console.log("Performing update with: " + JSON.stringify(updatedItem));
    await query((dbClient) => dbClient.query(Q_UPDATE_ITEM,[updatedItem.title, updatedItem.id]), Q_UPDATE_ITEM, updatedItem);
}

async function remove(id) {
    console.log("Performing delete of: " + id);
    await query((dbClient) => dbClient.query(Q_DELETE_ITEM, [id]), Q_DELETE_ITEM, id);
}