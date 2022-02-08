const mysql = require('mysql');
const { Client } = require('@elastic/elasticsearch');
const config = require('../config.json');

class JDBCClient {
  createShared(config) {
    if(this.conn == undefined) {
      this.conn = mysql.createConnection(config);
      this.conn.connect((err) => {
        if (err) {
          console.log('Error connection to MySQL');
          return;
        }
        console.log('Connection established');
      });
    }
    return this;
  }
  getConnection(callback) {
    if(callback != undefined
      && typeof callback == 'function') {
      callback(this.conn);
    }
  }
  close() {
    this.conn.end((err) => {
      // The connection is terminated gracefully
      // Ensure all previously enqueued are still
      // before sending a COM_QUIT packet to the MySQL server
    });
  }
}

class JDBCRepository {
  constructor(jdbcClient) {
    this.jdbcClient = jdbcClient;
  }
  procedureQuery(procedureName, params, callback) {
    let query = `CALL ${procedureName}(${params.map(() => '?')})`;
    this.jdbcClient.getConnection(function(conn) {
      // check conn
      conn.query(query, params.map(param => param.value), (err, rows) => {
        //if(err) throw err;
        //console.log('Data received from MySQL\n');
        if(callback != undefined
          && typeof callback == 'function') {
          callback(err, rows);
        }
      });

    });
  }
}

class AdServe {
  constructor(config) {
    this.config = config;
    this.jdbcClient = new JDBCClient();
    this.elasticClient = new Client(this.getElasticClientConfig(this.config));
  }
  getJDBCDefaultClientConfig() {
    return {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'adserve',
      multipleStatements : true
    }
  }
  getJDBCClientConfig(config) {
    const jdbcConfig = config.jdbc;
    if(!jdbcConfig) {
      return this.getJDBCDefaultClientConfig()
    }
    return jdbcConfig;
  }
  getElasticDefaultClientConfig() {
    return {
      node: 'http://localhost:9200'
    }
  }
  getElasticClientConfig(config) {
    const elasticConfig = config.elastic;
    if(!elasticConfig) {
      return this.getElasticDefaultClientConfig()
    }
    return elasticConfig;
  }
  toString() {
    return JSON.stringify(this.config);
  }
}

const adserve = new AdServe(config);

module.exports = adserve;
