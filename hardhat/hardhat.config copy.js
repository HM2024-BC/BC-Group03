require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  networks: {
    instructoruas: {
      chainId: 1311,
      url: "https://instructoruas-21530.morpheuslabs.io",
      accounts: ["b4aa1ddf32beafca26ea3822529235e16caf4db679e960d421648d1f71c73cd4"],
    },
  },
  

  sourcify: {
    enabled: true
  },
  paths: {
    artifacts: "./src/artifacts",
    contracts: './src/contracts',
  }
};