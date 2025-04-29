const hre = require("hardhat");
const { formatEther } = require("ethers");
const { getContract } = require("./common");


exports.transferStock = async (req, res) => {
  try {
    const { from_account = "", to_account = "", amounts = 1 } = req.body;
    const { contract, provider } = await getContract()
    const fromAccount = await provider.getSigner(from_account);

    // 轉移股票
    const tx = await contract.connect(fromAccount).transferStock(to_account, amounts);
    await tx.wait();  // 等交易上鏈

    res.json({})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `帳戶 ${req.body.buyer} 轉移股票失敗` });
  }
}

