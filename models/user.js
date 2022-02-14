class User {
  constructor(json) {
    this.id = json.id;
    this.username = json.username;
    this.email = json.email;
    this.password = json.password;
    this.insertDate = json.insert_date;
    this.modifyDate = json.modify_date;
    this.isActive = Boolean(json.is_active)
  }
  getId() {
    return this.id;
  }
  getUsername() {
    return this.username;
  }
  getEmail() {
    return this.email;
  }
  getInsertDate() {
    return this.insertDate;
  }
  getModifyDate() {
    return this.modifyDate;
  }
  getIsActive() {
    return this.isActive
  }
}

module.exports = User;
