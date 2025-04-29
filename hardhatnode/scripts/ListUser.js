const { Wallet, HDNode } = require("ethers");
const { mnemonicToAccount } = require("viem/accounts");

const mnemonic = "test test test test test test test test test test test junk"; // Hardhat 預設

async function main() {
  const hdNode = HDNode.fromMnemonic(mnemonic);
  for (let i = 0; i < 10; i++) {
    const node = hdNode.deriveChild(i);
    const wallet = new Wallet(node.privateKey);
    console.log(`Account ${i}: ${wallet.address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    console.log('---');
  }
}

main();
