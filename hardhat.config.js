require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey ='8cd2a5e9fa83d1153cfbdcb791cad4e2e030dc05175457daff4e371475e8e321';
const ALCHEMY_API_KEY = "pqr-VAfSii011IkFlqrZTxCgzK5fWegs";


module.exports = {
  solidity: "0.8.4",
  networks:{
    matic:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    },
  },

};
