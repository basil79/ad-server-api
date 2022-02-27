class DemandTag {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.accountId = json.account_id;
    this.supplyTagId = json.supply_tag_id;
    this.vastUrl = json.vast_url;
    this.bidder = json.bidder;
    this.tier = json.tier;
    this.priority = json.priority;
    this.cpm = json.cpm;
    this.floor = json.floor;
    this.frequency = json.frequency;
    this.trackingEvents = json.tracking_events;
    this.timeout = json.timeout;
    this.insertDate = json.insert_date;
    this.modifyDate = json.modify_date;
    this.isActive = Boolean(json.is_active);
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getAccountId() {
    return this.accountId;
  }
  getSupplyTagId() {
    return this.supplyTagId;
  }
  getVastUrl() {
    return this.vastUrl;
  }
  getBidder() {
    return this.bidder
  }
  getTier() {
    return this.tier;
  }
  getPriority() {
    return this.priority;
  }
  getCPM() {
    return this.cpm;
  }
  getFloor() {
    return this.floor;
  }
  getFrequency() {
    return this.frequency;
  }
  getTrackingEvents() {
    return this.trackingEvents;
  }
  getTimeout() {
    return this.timeout;
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

module.exports = DemandTag;
