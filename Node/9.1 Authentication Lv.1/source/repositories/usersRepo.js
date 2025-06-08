import { query } from "../data/database.js"
import { User } from "../models/user.js";

/// https://node-postgres.com/


export { addUser, getUserById, getUserByEmail }

const Q_Add_USER = "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING id";
const Q_GET_USER_BY_ID = "SELECT * FROM users WHERE id $1";
const Q_GET_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";


async function addUser(user) {
    const result = await query(Q_Add_USER, [user.email, user.password]);
    user.id = result.rows[0].id;
    return user;
}

async function getUserById(id) {
    const result = await query(Q_GET_USER_BY_ID, [id]);
    return result.rowCount === 0 ? null : new User(result.rows[0]);
}

async function getUserByEmail(email) {
    const result = await query(Q_GET_USER_BY_EMAIL, [email]);
    return result.rowCount === 0 ? null : new User(result.rows[0]);
}