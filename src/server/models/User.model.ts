
const users = [];

export default class User {
  id: string;
  login:string;
  password: string;
  age: number;
  isDeleted: boolean;
  constructor(id, login, password, age, isDeleted){
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
  save(){
    users.push(this);
  }

  static update(id, user) {
    const userToUpdate  = users.find(user => user.id === id);

    if (!userToUpdate ) {
      return false;
    } else {
      userToUpdate.login = user.login;
      userToUpdate.password = user.password;
      userToUpdate.age = user.age;
      return userToUpdate;
    }
  }
  static find(id) {
    return users.find(user => user.id === id);
  }
  static getAll(){
    return users;
  }
}