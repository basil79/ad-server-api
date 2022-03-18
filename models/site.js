class Site {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.domain = json.domain;
    this.supplyTagCount = json.supply_tag_count;
    this.supplyAccountId = json.supply_account_id;
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
  getDomain() {
    return this.domain;
  }
  getSupplyTagCount() {
    return this.supplyTagCount;
  }
  getSupplyAccountId() {
    return this.supplyAccountId;
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

module.exports = Site;
