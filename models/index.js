const mysql = require('mysql');
const { Client } = require('@elastic/elasticsearch');
const config = require('../config.json');
const {JDBCClient} = require('./jdbc');
const SupplyTags = require('../services/supply-tags');
const Users = require('../services/users');

class AdServe {
  constructor(config) {
    this.config = config;
    // Clients
    this.jdbcClient = new JDBCClient();
    this.elasticClient = new Client(this.getElasticClientConfig(this.config));
    // Services
    this.usersService = new Users(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)));
    this.supplyTagsService = new SupplyTags(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
  }
  users() {
    return this.usersService;
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
