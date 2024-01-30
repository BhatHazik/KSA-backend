const mongoose = require('mongoose');

const KsaUser = mongoose.model("KsaUser",
{
    username:"string",
    password:"string"
});

module.exports = KsaUser;