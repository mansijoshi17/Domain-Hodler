require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const fs = require("fs");
const privateKey = process.env.PRIVATE_KEY;
const ALCHEMY_API_KEY1 = process.env.ALCHEMY_API_KEY;


module.exports = {
  solidity: "0.8.4",
  networks:{
    matic:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY1}`,
      accounts:[privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    },
  },

};
