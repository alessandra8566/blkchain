const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const [sender, deployer] = await ethers.getSigners();
  console.log("部署合約的帳戶：", deployer.address);

  // 檢查 deployer 帳戶是否有足夠餘額
  const balance = await ethers.provider.getBalance(deployer.address);
  const requiredBalance = ethers.parseEther("0.1"); // 設定最小所需餘額
  console.log("部署者餘額：", ethers.formatEther(balance), "ETH");

  if (balance < requiredBalance) {
    console.log("部署者餘額不足，從發送者帳戶轉帳...");
    const tx = await sender.sendTransaction({
      to: deployer.address,
      value: ethers.parseEther("100"),
    });
    await tx.wait();
    console.log("✅ 已轉帳 100 ETH 至部署者帳戶。");
  }

  const StockContract = await ethers.getContractFactory("StockContract");
  const stockContract = await StockContract.deploy();
  
  // 等待部署交易完成並獲取合約地址
  const deploymentTx = await stockContract.waitForDeployment();
  const contractAddress = await stockContract.getAddress(); // ethers.js v6 推薦方式

  // 儲存到 .env
  fs.appendFileSync(".env", `CONTRACT_ADDRESS=${contractAddress}\n`);

  console.log("StockContract 部署至：", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("部署失敗：", error);
    process.exit(1);
  });