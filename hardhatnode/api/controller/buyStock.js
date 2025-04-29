const hre = require("hardhat");
const { formatEther } = require("ethers");
const { getContract } = require("./common");


exports.buyStock = async (req, res) => {
  try {
    const { buyer = "", amounts = 1 } = req.body;
    const { contract, provider } = await getContract()
    const buyerAccount = await provider.getSigner(buyer);
    console.log("Buyer account:", buyer);
    console.log("Calling buyStock with amount:", amounts, "type:", typeof amounts);
    console.log("Buyer account address:", buyerAccount);


    // 查股數
    let remainingStock = await contract.getRemainingStock();
    console.log("Remaining stock before purchase:", remainingStock.toString());

    // 買股票
    const tx = await contract.connect(buyerAccount).buyStock(amounts);
    const receipt = await tx.wait();  // 等交易上鏈
    console.log("receipt:", receipt);

    // 買完查一次
    remainingStock = await contract.getRemainingStock();
    console.log("Remaining stock after purchase:", remainingStock.toString());

    const buyerBalance = await contract.getBalance(buyerAccount.address);
    const buyerHistory = await contract.getTransactionHistory(buyerAccount.address);

    res.json({
      address: buyerAccount.address,
      ethBalance: formatEther(await provider.getBalance(buyerAccount.address)),
      stockBalance: buyerBalance.toString(),
      history: buyerHistory.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `帳戶 ${req.body.buyer} 購買股票失敗` });
  }
}

