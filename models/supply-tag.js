class SupplyTag {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.supplyAccountId = json.supply_account_id;
    this.siteId = json.site_id;
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
  getSupplyAccountId() {
    return this.supplyAccountId;
  }
  getSiteId() {
    return this.siteId;
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

module.exports = SupplyTag;
