const { JDBCRepository, SqlParam} = require('../models/jdbc');
const AccountsResult = require('../models/accounts-result');
const Account = require('../models/account');

class UserAccounts extends JDBCRepository {
  constructor(jdbcClient) {
    super(jdbcClient);

    this.ID = '$id';
    this.USER_ID = '$user_id';
    this.NAME = '$name';
    this.IS_ACTIVE = '$is_active';
    this.FROM = '$from';
    this.SIZE = '$size';
    this.SORT_COLUMN = '$sort_column';
    this.SORT_ORDER = '$sort_order';

  }
  getMany(userId, from, size, sortColumn, sortOrder) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_user_accounts', [
        new SqlParam(this.USER_ID, userId),
        new SqlParam(this.FROM, from),
        new SqlParam(this.SIZE, size),
        new SqlParam(this.SORT_COLUMN, sortColumn),
        new SqlParam(this.SORT_ORDER, sortOrder)
      ], function (err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 3) {
            res(new AccountsResult(rows[0].map((row) => new Account(row)), rows[1][0]['@row_num']));
          } else {
            res(null);
          }
        }
      });
    });
  }
}

module.exports = UserAccounts;
