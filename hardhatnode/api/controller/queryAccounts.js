const hre = require("hardhat");
const { formatEther } = require("ethers");
const { getContract } = require("./common");


// exports.getAllAccount = async (req, res) => {
//   try {
//     const accounts = await hre.ethers.getSigners();
//     const stockContract = await getContract();
//     const remainingStock = await stockContract.getRemainingStock();

//     const results = await Promise.all(accounts.map(async (account) => {
//       const address = account.address;
//       const balance = await hre.ethers.provider.getBalance(address);
//       const ethBalance = formatEther(balance);
//       const stockBalance = await stockContract.getBalance(address);

//       return {
//         address,
//         ethBalance,
//         stockBalance: stockBalance.toString()
//       };
//     }));
//     res.json({ remainingStock: remainingStock.toString(), accounts: results });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "讀取所有帳戶股票失敗" });
//   }
// }

exports.getAllAccount = async (req, res) => {
  try {
    const { provider, contract } = await getContract();
    const accounts = await provider.listAccounts();
    const result = await Promise.all(accounts.map(async (account) => {
      const balance = await provider.getBalance(account);
      const ethBalance = formatEther(balance);
      const stockBalance = await contract.getBalance(account);
      const history = await contract.getTransactionHistory(account.address);
      return {
        address: account.address,
        ethBalance,
        stockBalance: stockBalance.toString(),
        history: history.toString()
      };
    }));
    const remainingStock = await contract.getRemainingStock();
    res.json({ remainingStock: remainingStock.toString(), accounts: result });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "讀取所有帳戶股票失敗" });
  }
}

