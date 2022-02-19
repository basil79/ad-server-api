class Account {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.insertDate = json.insert_date;
    this.modifyDate = json.modify_date;
    this.isActive = Boolean(json.is_active)
  }
  getId() {
    return this.id
  }
  getName() {
    return this.name;
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

module.exports = Account;
