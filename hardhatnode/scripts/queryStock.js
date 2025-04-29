async function main() {
    // （指定账户）
    const [deployer] = await ethers.getSigners();  // 預設帳戶
    console.log("Deployer account:", deployer.address);

    // 指定已部署的SMContract Address
    //const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    require("dotenv").config();
    const contractAddress = process.env.CONTRACT_ADDRESS;

    // 取得合約原廠
    const StockContract = await ethers.getContractFactory("StockContract");

    // 連結部署的SMContract
    const stockContract = await StockContract.attach(contractAddress);
    //console.log("Connected to StockContract at:", stockContract.address);

    // 查
    let remainingStock = await stockContract.getRemainingStock();
    console.log("Remaining stock:", remainingStock.toString());
}

// RUN查
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
