const { JDBCRepository, SqlParam } = require('../models/jdbc');
const Advertiser = require('../models/advertiser');
const AdvertisersResult = require('../models/advertisers-result');

class Advertisers extends JDBCRepository {
  constructor(jdbcClient, elasticClient) {
    super(jdbcClient);
    this.elasticClient = elasticClient;

    this.ID = '$id';
    this.NAME = '$name';
    this.DEMAND_ACCOUNT_ID = '$demand_account_id';
    this.ACCOUNT_ID = '$account_id';
    this.IS_ACTIVE = '$is_active';
    this.FROM = '$from';
    this.SIZE = '$size';
    this.SORT_COLUMN = '$sort_column';
    this.SORT_ORDER = '$sort_order';
  }
  get(id, demandAccountId, accountId) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_advertisers', [
        new SqlParam(this.ID, id),
        new SqlParam(this.DEMAND_ACCOUNT_ID, demandAccountId),
        new SqlParam(this.ACCOUNT_ID, accountId),
        new SqlParam(this.FROM, null),
        new SqlParam(this.SIZE, null),
        new SqlParam(this.SORT_COLUMN, null),
        new SqlParam(this.SORT_ORDER, null)
      ], function(err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows[0].length != 0) {
            res(new Advertiser(rows[0][0]));
          } else {
            res(null);
          }
        }
      });
    });
  }
  getMany(id, demandAccountId, accountId, from, size, sortColumn, sortOrder) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_advertisers', [
        new SqlParam(this.ID, id),
        new SqlParam(this.DEMAND_ACCOUNT_ID, demandAccountId),
        new SqlParam(this.ACCOUNT_ID, accountId),
        new SqlParam(this.FROM, from),
        new SqlParam(this.SIZE, size),
        new SqlParam(this.SORT_COLUMN, sortColumn),
        new SqlParam(this.SORT_ORDER, sortOrder)
      ], function (err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 3) {
            res(new AdvertisersResult(rows[0].map((row) => new Advertiser(row)), rows[1][0]['@row_num']));
          } else {
            res(null);
          }
        }
      });
    });
  }
  set(id, name, domain, demandAccountId, accountId, isActive) {
    return new Promise((res, rej) => {
      this.procedureQuery('set_advertiser', [
        new SqlParam(this.ID, id),
        new SqlParam(this.NAME, name),
        new SqlParam(this.DOMAIN, domain),
        new SqlParam(this.DEMAND_ACCOUNT_ID, demandAccountId),
        new SqlParam(this.ACCOUNT_ID, accountId),
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
      this.procedureQuery('delete_advertiser', [
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

module.exports = Advertisers;
