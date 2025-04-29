async function main() {
    const [deployer, buyer] = await ethers.getSigners();
    // 取得帳戶
    console.log("Deployer account:", deployer.address);
    console.log("Buyer account:", buyer.address);

    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 已部署地址
    //const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";    // 已部署地址
    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    require("dotenv").config();
    const contractAddress = process.env.CONTRACT_ADDRESS;

    const StockContract = await ethers.getContractFactory("StockContract");

    // 取得指定位置的contract
    const stockContract = await StockContract.attach(contractAddress);
    //console.log("StockContract at:", stockContract.address);

    // 查股數
    let remainingStock = await stockContract.getRemainingStock();
    console.log("Remaining stock before purchase:", remainingStock.toString());

    // 買股票，假設每次買一股
    const amountToBuy = 1;
    const tx = await stockContract.connect(buyer).buyStock(amountToBuy);  // 使用买家账户调用 buyStock
    await tx.wait();  // 等待交易確認

    // 取得買後的剩餘股數
    remainingStock = await stockContract.getRemainingStock();
    console.log("Remaining stock after purchase:", remainingStock.toString());

    // 取得買家的股票数量
    const buyerBalance = await stockContract.getBalance(buyer.address);
    console.log("Buyer's stock balance:", buyerBalance.toString());

    // 取得買家的歷史
    const buyerHistory = await stockContract.getTransactionHistory(buyer.address);
    console.log("Buyer's transaction history:", buyerHistory.toString());

    // return
    return contractAddress;
}

main()
    .then((contractAddress) => {
        console.log("Contract address saved:", contractAddress);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
