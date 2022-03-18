class SupplyAccount {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.siteCount = json.site_count;
    this.accountId = json.account_id;
    this.insertDate = json.insert_date;
    this.modifyDate = json.modify_date;
    this.isActive = Boolean(json.is_active)
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSiteCount() {
    return this.siteCount;
  }
  getAccountId() {
    return this.accountId;
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

module.exports = SupplyAccount;
