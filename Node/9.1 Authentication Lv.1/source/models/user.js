export { User }


class User {
  constructor({id = 0, email, password}) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}