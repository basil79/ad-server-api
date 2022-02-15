const { JDBCRepository, SqlParam } = require('../models/jdbc');
const SupplyTag = require('../models/supply-tag');
const SupplyTagsResult = require('../models/supply-tags-result');

class SupplyTags extends JDBCRepository {
  constructor(jdbcClient, elasticClient) {
    super(jdbcClient);
    this.elasticClient = elasticClient;

    this.ID = '$id';
    this.NAME = '$name';
    this.IS_ACTIVE = '$is_active';
    this.FROM = '$from';
    this.SIZE = '$size';
    this.SORT_COLUMN = '$sort_column';
    this.SORT_ORDER = '$sort_order';

  }
  get(id) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_supply_tags', [
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
            res(new SupplyTag(rows[0][0]));
          } else {
            res(null);
          }
        }
      });
    });
  }
  getMany(id, from, size, sortColumn, sortOrder) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_supply_tags', [
        new SqlParam(this.ID, id),
        new SqlParam(this.FROM, from),
        new SqlParam(this.SIZE, size),
        new SqlParam(this.SORT_COLUMN, sortColumn),
        new SqlParam(this.SORT_ORDER, sortOrder)
      ], function (err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 3) {
            res(new SupplyTagsResult(rows[0].map((row) => new SupplyTag(row)), rows[1][0]['@row_num']));
          } else {
            res(null);
          }
        }
      });
    });
  }
  set(id, name, isActive) {
    return new Promise((res, rej) => {
      this.procedureQuery('set_supply_tag', [
        new SqlParam(this.ID, id),
        new SqlParam(this.NAME, name),
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
      this.procedureQuery('delete_supply_tag', [
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

module.exports = SupplyTags;
