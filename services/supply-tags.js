const { JDBCRepository, SqlParam } = require('../models/jdbc');

class SupplyTags extends JDBCRepository {
  constructor(jdbcClient, elasticClient) {
    super(jdbcClient);
    this.elasticClient = elasticClient;

    this.ID = '$id';
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
        }

        // Data
        console.log(rows, rows[0].length);
        res([]);

      });

    });
  }
}

module.exports = SupplyTags;
