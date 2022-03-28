class Advertiser {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.demandTagCount = json.demand_tag_count;
    this.demandAccountId = json.demand_account_id;
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
  getDemandTagCount() {
    return this.demandTagCount;
  }
  getDemandAccountId() {
    return this.demandAccountId;
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
    return this.isActive;
  }
}

module.exports = Advertiser;
