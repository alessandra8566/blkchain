
const { ethers } = require("ethers");
require("dotenv").config();
exports.getContract = async () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  console.log(`合約地址: ${contractAddress}\n`);
  if (!contractAddress) throw new Error("合約地址未設定");

  // 指定provider，如果要指定為本地節點 (例如：hardhat node)
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const network = await provider.getNetwork();
  console.log("Network Name:", network.name);
  console.log("Network Chain ID:", network.chainId);

  // 取得合約 ABI，這裡需要從 artifacts 取得 ABI (或是直接寫在程式碼裡)
  const abi = require("../../artifacts/contracts/StockContract.sol/StockContract.json").abi;

  // 註冊合約與指定 provider
  const contract = new ethers.Contract(contractAddress, abi, provider);
  console.log(contract);
  return { contract, provider };
}
