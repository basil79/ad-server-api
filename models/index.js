const mysql = require('mysql');
const { Client } = require('@elastic/elasticsearch');
const config = require('../config.json');
const {JDBCClient} = require('./jdbc');
const SupplyTags = require('../services/supply-tags');
const Users = require('../services/users');
const DemandTags = require('../services/demand-tags');
const Accounts = require('../services/accounts');
const UserAccounts = require('../services/user-accounts');
const SupplyAccounts = require('../services/supply-accounts');
const Sites = require('../services/sites');
const DemandAccounts = require('../services/demand-accounts');
const Advertisers = require('../services/advertisers');

class AdServe {
  constructor(config) {
    this.config = config;
    // Clients
    this.jdbcClient = new JDBCClient();
    this.elasticClient = new Client(this.getElasticClientConfig(this.config));
    // Services
    this.usersService = new Users(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)));
    this.accountsService = new Accounts(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)));
    this.userAccountsService = new UserAccounts(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)));
    this.supplyAccountsService = new SupplyAccounts(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
    this.sitesService = new Sites(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
    this.supplyTagsService = new SupplyTags(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
    this.demandAccountsService = new DemandAccounts(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
    this.advertisersService = new Advertisers(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
    this.demandTagsService = new DemandTags(this.jdbcClient.createShared(this.getJDBCClientConfig(this.config)), this.elasticClient);
  }
  users() {
    return this.usersService;
  }
  accounts() {
    return this.accountsService;
  }
  userAccounts() {
    return this.userAccountsService;
  }
  supplyAccounts() {
    return this.supplyAccountsService;
  }
  sites() {
    return this.sitesService;
  }
  supplyTags() {
    return this.supplyTagsService;
  }
  demandAccounts() {
    return this.demandAccountsService;
  }
  advertisers() {
    return this.advertisersService;
  }
  demandTags() {
    return this.demandTagsService;
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
