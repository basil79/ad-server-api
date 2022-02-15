const { JDBCRepository, SqlParam } = require('../models/jdbc');
const User = require('../models/user');
const UsersResult = require('../models/users-result');

class Users extends JDBCRepository {
  constructor(jdbcClient) {
    super(jdbcClient);

    this.ID = '$id';
    this.USERNAME = '$username';
    this.EMAIL = '$email';
    this.PASSWORD = '$password';
    this.IS_ACTIVE = '$is_active';
    this.FROM = '$from';
    this.SIZE = '$size';
    this.SORT_COLUMN = '$sort_column';
    this.SORT_ORDER = '$sort_order';

  }
  get(id, username, email, password) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_users', [
        new SqlParam(this.ID, id),
        new SqlParam(this.USERNAME, username),
        new SqlParam(this.EMAIL, email),
        new SqlParam(this.PASSWORD, password),
        new SqlParam(this.FROM, null),
        new SqlParam(this.SIZE, null),
        new SqlParam(this.SORT_COLUMN, null),
        new SqlParam(this.SORT_ORDER, null)
      ], function(err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows[0].length != 0) {
            res(new User(rows[0][0]));
          } else {
            res(null);
          }
        }
      });
    });
  }
  getMany(id, username, email, password, from, size, sortColumn, sortOrder) {
    return new Promise((res, rej) => {
      this.procedureQuery('get_users', [
        new SqlParam(this.ID, id),
        new SqlParam(this.USERNAME, username),
        new SqlParam(this.EMAIL, email),
        new SqlParam(this.PASSWORD, password),
        new SqlParam(this.FROM, from),
        new SqlParam(this.SIZE, size),
        new SqlParam(this.SORT_COLUMN, sortColumn),
        new SqlParam(this.SORT_ORDER, sortOrder)
      ], function (err, rows) {
        if(err) {
          rej(err);
        } else {
          if(rows.length == 3) {
            res(new UsersResult(rows[0].map((row) => new User(row)), rows[1][0]['@row_num']));
          } else {
            res(null);
          }
        }
      });
    });
  }
  set(id, username, email, password, isActive) {
    return new Promise((res, rej) => {
      this.procedureQuery('set_user', [
        new SqlParam(this.ID, id),
        new SqlParam(this.USERNAME, username),
        new SqlParam(this.EMAIL, email),
        new SqlParam(this.PASSWORD, password),
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
      this.procedureQuery('delete_user', [
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

module.exports = Users;
