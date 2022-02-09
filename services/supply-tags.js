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
        new SqlParam(this.ID, id)
      ], function(err, rows) {
        if(err) {
          rej(err);
        }

        // Data
        console.log(rows);

      });

    });
  }
}

module.exports = SupplyTags;
