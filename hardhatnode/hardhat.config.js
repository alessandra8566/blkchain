require("@nomicfoundation/hardhat-toolbox");

task("transferStock", "Transfer stock between accounts")
  .addParam("accounta", "The sender's address") // 全部小寫
  .addParam("accountb", "The receiver's address")
  .addParam("amount", "The amount of stock to transfer")
  .setAction(async (taskArgs, hre) => {
    const { accounta, accountb, amount } = taskArgs;
    const script = require("./scripts/transferStock.js");
    await script.main(accounta, accountb, amount);
  });




/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://localhost:8545", // Hardhat 本地網絡
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // 賬戶 0 Account 0 的私鑰
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d" // 賬戶 1
      ]
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};


