require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://data-seed-prebsc-1-s1.binance.org:8545`
      ),
      network_id: 97,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://bsc-dataseed1.binance.org`
      ),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 300,
      skipDryRun: true
    },

    Avax_mainnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://api.avax.network/ext/bc/C/rpc`
      ),
      network_id: 43114,
      confirmations: 10,
      timeoutBlocks: 500,
      skipDryRun: true
    },

    Avax_testnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://api.avax-test.network/ext/bc/C/rpc`
      ),
      network_id: 43113,
      confirmations: 10,
      timeoutBlocks: 500,
      skipDryRun: true
    }

  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  compilers: {
    solc: {
      version: "0.8.2"
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
};