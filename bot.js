const dotenv = require("dotenv").config("./.env")
module.exports = {
    owner: '974323647177191425',
    discord: {
        token: process.env.token,
        prefix: '%',
    },
};