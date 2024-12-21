// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  provider: String, // GitHub, GitLab, Bitbucket
  repositories: Array,
});

module.exports = mongoose.model('User', UserSchema);
