const { HDNodeWallet } = require("ethers/wallet");
const { Mnemonic } = require("ethers");

const mnemonic = "test test test test test test test test test test test junk"; // Hardhat 預設助記詞

async function main() {
  const hd = Mnemonic.fromPhrase(mnemonic);
  for (let i = 0; i < 10; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = HDNodeWallet.fromMnemonic(hd, path);
    console.log(`�� Account ${i}: ${wallet.address}`);
    console.log(`�� Private Key: ${wallet.privateKey}`);
    console.log("-------------");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
