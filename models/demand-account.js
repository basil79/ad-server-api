class DemandAccount {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.advertiserCount = json.advertiser_count;
    this.demandTagCount = json.demand_tag_count;
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
  getAdvertiserCount() {
    return this.advertiserCount;
  }
  getDemandTagCount() {
    return this.demandTagCount;
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

module.exports = DemandAccount;
