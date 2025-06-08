import { query } from "../data/database.js"
import { User } from "../models/user.js";

export { registerUser, getUserByEmail, login }

const Q_REGISTER_USER = "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING id";
const Q_GET_USER = "SELECT * FROM users WHERE id $1";
const Q_GET_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";


async function registerUser(user) {
    const result = await query(Q_REGISTER_USER, [user.email, user.password]);
    user.id = result.rows[0].id;
    return user;
}


async function getUserByEmail(email) {
    const result = await query(Q_GET_USER_BY_EMAIL, [email]);
    if (result.rowCount === 0) return null;
    return new User(result.rows[0]);
}


async function login(email, password) {
    const user = await getUserByEmail(email);
    return user ? user.password === password : false;
}