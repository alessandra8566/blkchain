// scripts/TransferStock.js
const { ethers } = require("hardhat");

async function main() {
    const args = process.argv.slice(2);

    // 簡單解析參數
    const fromIndex = args.indexOf("--from");
    const toIndex = args.indexOf("--to");
    const amountIndex = args.indexOf("--amount");

    if (fromIndex === -1 || toIndex === -1 || amountIndex === -1) {
        console.error("❌ 用法錯誤！請使用 --from --to --amount");
        console.error("範例: npx hardhat run scripts/TransferStock.js --network localhost --from 0x... --to 0x... --amount 1");
        process.exit(1);
    }

    const fromAddress = args[fromIndex + 1];
    const toAddress = args[toIndex + 1];
    const amount = parseInt(args[amountIndex + 1]);

    // 連接合約
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 替換成部署的地址
    const contractABI = [
        "function transferStock(address to, uint256 amount) external",
        "function getBalance(address account) view returns (uint256)"
    ];

    // 從 Hardhat 的私鑰建立 signer
    const signer = await ethers.getSigner(fromAddress);
    const stockContract = new ethers.Contract(contractAddress, contractABI, signer);

    // 檢查 from 有沒有足夠的股票
    const fromBalance = await stockContract.getBalance(fromAddress);
    if (fromBalance < amount) {
        console.error(`❌ 餘額不足！${fromAddress} 只有 ${fromBalance} 張`);
        process.exit(1);
    }

    console.log(`������ ${fromAddress} 正在轉移 ${amount} 張股票給 ${toAddress}...`);
    const tx = await stockContract.transferStock(toAddress, amount);
    await tx.wait();

    console.log("✅ 轉移成功！");

    const newFrom = await stockContract.getBalance(fromAddress);
    const newTo = await stockContract.getBalance(toAddress);

    console.log(`������ 轉移後餘額:`);
    console.log(`From: ${newFrom} 張`);
    console.log(`To: ${newTo} 張`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
