class User {
  constructor(json) {
    this.id = json.id;
    this.username = json.username;
    this.email = json.email;
    this.password = json.password;
    this.twoFactorAuthentication = json.two_factor_authentication;
    this.twoFactorAuthenticationSecret = json.two_factor_authentication_secret;
    this.insertDate = json.insert_date;
    this.modifyDate = json.modify_date;
    this.isActive = Boolean(json.is_active);
  }
  getId() {
    return this.id;
  }
  getUsername() {
    return this.username;
  }
  getEmail() {
    return this.email;
  }
  getTwoFactorAuthentication() {
    return this.twoFactorAuthentication;
  }
  getTwoFactorAuthenticationSecret() {
    return this.twoFactorAuthenticationSecret;
  }
  getInsertDate() {
    return this.insertDate;
  }
  getModifyDate() {
    return this.modifyDate;
  }
  getIsActive() {
    return this.isActive
  }
}

module.exports = User;
