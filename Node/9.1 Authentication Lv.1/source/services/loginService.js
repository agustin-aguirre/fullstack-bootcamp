import { addUser, getUserByEmail } from "../repositories/usersRepo.js";

export { register, login, DataLayerError, NotFoundError, UserAlreadyExistsError }


async function register(email, password) {
    try {
        if (await getUserByEmail(email)) throw new UserAlreadyExistsError("User already registered.");
        return await addUser(new User({email: email, password: password}));
    }
    catch(err) {
        throw new DataLayerError("Database error")
    }
}


async function login(email, password) {
    try {
        const targetUser = await getUserByEmail(email);
        if (!targetUser) throw new NotFoundError("User is not registered.");
        return targetUser.password === password;
    }
    catch (err) {
        throw new DataLayerError("Database error.");
    }
}


class DataLayerError extends Error {
    constructor(message) {
        super(message);
        this.name = "Data Layer Error";
    }
}

class NotFoundError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "Not Found Error";
    }
}

class UserAlreadyExistsError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "User Already Exists";
    }
}