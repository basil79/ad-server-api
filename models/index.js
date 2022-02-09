const mysql = require('mysql');
const { Client } = require('@elastic/elasticsearch');
const config = require('../config.json');
const {JDBCClient} = require('./jdbc');
const SupplyTags = require('../services/supply-tags');

class AdServe {
  constructor(config) {
    this.config = config;
    // Clients
    this.jdbcClient = new JDBCClient();
    this.elasticClient = new Client(this.getElasticClientConfig(this.config));
    // Services
    this.supplyTagsService = new SupplyTags(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
  }
  supplyTags() {
    return this.supplyTagsService;
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
      console.log('mysql use default');
      return this.getJDBCDefaultClientConfig()
    }
    console.log('mysql use config');
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
    console.log('elastic use config');
    return elasticConfig;
  }
  toString() {
    return JSON.stringify(this.config);
  }
}

const adserve = new AdServe(config);

module.exports = adserve;
