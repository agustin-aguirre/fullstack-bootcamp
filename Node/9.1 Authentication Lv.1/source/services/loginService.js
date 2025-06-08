import { addUser, getUserById, getUserByEmail } from "../repositories/usersRepo.js";
import { User } from "../models/user.js";

export { register, login, NotFoundError, UserAlreadyExistsError }



async function register(email, password) {
    if (await getUserByEmail(email)) {
        const err = new UserAlreadyExistsError(`User already registered. Cause: User already exists.`);
        console.error(err);
        throw err;
    }
    const newUser = new User({email: email, password: password});
    await addUser(newUser);
    console.log(`New user registered: ${JSON.stringify(newUser)}.`);
    return newUser;
}


async function login(email, password) {
    const targetUser = await getUserByEmail(email);
    if (targetUser === null) throw new NotFoundError("User is not registered.");
    const passwordValid = targetUser.password === password;
    const logMsg = passwordValid ? "User logged in successfully" : "Invalid credentials";
    console.log(`${logMsg} - ${JSON.stringify(targetUser)}.`);
    return passwordValid;
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