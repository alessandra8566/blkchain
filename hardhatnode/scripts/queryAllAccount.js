const hre = require("hardhat"); // Hardhat 的 ethers 物件
const { formatEther } = require("ethers"); // Ethers v6 的 formatEther
require("dotenv").config();

console.log("ethers version:", hre.ethers.version); // 顯示 Hardhat 內建 ethers 的版本

async function main() {
    const [deployer, ...others] = await hre.ethers.getSigners();
    const accounts = [deployer, ...others];

    console.log("查詢帳戶與股數狀況...\n");

    const contractAddress = process.env.CONTRACT_ADDRESS;
    const StockContract = await hre.ethers.getContractFactory("StockContract");
    const stockContract = await StockContract.attach(contractAddress);

    const remainingStock = await stockContract.getRemainingStock();
    console.log(`合約剩餘股票數: ${remainingStock.toString()}\n`);

    for (let account of accounts) {
        const address = account.address;
        const balance = await hre.ethers.provider.getBalance(address);
        const balanceInEth = formatEther(balance);  // ✅ 使用 v6 的格式化方法

        //const stocks = await stockContract.getStocksByAddress(address);
        const stocks = await stockContract.getBalance(address);

        console.log(`帳戶: ${address}`);
        //console.log(`   ETH 餘額: ${balanceInEth}`);
        console.log(`   持有股數: ${stocks.toString()}\n`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
