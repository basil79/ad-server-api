const {JDBCRepository, SqlParam} = require('../models/jdbc');
const DemandTag = require('../models/demand-tag');
const DemandTagsResult = require('../models/demand-tags-result');

class DemandTags extends JDBCRepository {
  constructor(jdbcClient, elasticClient) {
    super(jdbcClient);
    this.elasticClient = elasticClient;

    this.ID = '$id';
    this.NAME = '$name';
    this.SUPPLY_TAG_ID = '$supply_tag_id';
    this.VAST_URL = '$vast_url';
    this.BIDDER = '$bidder';
    this.TIER = '$tier';
    this.PRIORITY = '$priority';
    this.CPM = '$cpm';
    this.FLOOR = '$floor';
    this.FREQUENCY = '$frequency';
    this.TRACKING_EVENTS = '$tracking_events';
    this.TIMEOUT = '$timeout';
    this.IS_ACTIVE = '$is_active';
    this.FROM = '$from';
    this.SIZE = '$size';
    this.SORT_COLUMN = '$sort_column';
    this.SORT_ORDER = '$sort_order';

  }
  get(id) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_demand_tags', [
        new SqlParam(this.ID, id),
        new SqlParam(this.FROM, null),
        new SqlParam(this.SIZE, null),
        new SqlParam(this.SORT_COLUMN, null),
        new SqlParam(this.SORT_ORDER, null)
      ], function(err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows[0].length != 0) {
            res(new DemandTag(rows[0][0]));
          } else {
            res(null);
          }
        }
      });
    });
  }
  getMany(id, supplyTagId, from, size, sortColumn, sortOrder) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_demand_tags', [
        new SqlParam(this.ID, id),
        new SqlParam(this.SUPPLY_TAG_ID, supplyTagId),
        new SqlParam(this.FROM, from),
        new SqlParam(this.SIZE, size),
        new SqlParam(this.SORT_COLUMN, sortColumn),
        new SqlParam(this.SORT_ORDER, sortOrder)
      ], function (err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 3) {
            res(new DemandTagsResult(rows[0].map((row) => new DemandTag(row)), rows[1][0]['@row_num']));
          } else {
            res(null);
          }
        }
      });
    });
  }
  set(id, name, supplyTagId, vastUrl, bidder, tier, priority, cpm, floor, frequency, trackingEvents, timeout, isActive) {
    return new Promise((res, rej) => {
      this.procedureQuery('set_demand_tag', [
        new SqlParam(this.ID, id),
        new SqlParam(this.NAME, name),
        new SqlParam(this.SUPPLY_TAG_ID, supplyTagId),
        new SqlParam(this.VAST_URL, vastUrl),
        //new SqlParam(this.BIDDER, bidder), // TODO:
        new SqlParam(this.TIER, tier),
        new SqlParam(this.PRIORITY, priority),
        new SqlParam(this.CPM, cpm),
        new SqlParam(this.FLOOR, floor),
        //new SqlParam(this.FREQUENCY, frequency), // TODO:
        //new SqlParam(this.TRACKING_EVENTS, trackingEvents), // TODO:
        new SqlParam(this.TIMEOUT, timeout),
        new SqlParam(this.IS_ACTIVE, isActive)
      ], function(err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 2) {
            res(rows[0][0]['id']);
          } else {
            res(null);
          }
        }
      });
    });
  }
  delete(id) {
    return new Promise((res, rej) => {
      this.procedureQuery('delete_demand_tag', [
        new SqlParam(this.ID, id)
      ], function(err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 2) {
            res(rows[0][0]['id']);
          } else {
            res(null);
          }
        }
      });
    });
  }
}

module.exports = DemandTags;
