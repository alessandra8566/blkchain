#!/bin/bash

# 🧹 清掉占用 8545 port 的 process
PID=$(lsof -ti tcp:8545)

if [ ! -z "$PID" ]; then
  echo "🔴 Port 8545 is in use by PID $PID. Killing..."
  kill -9 $PID
  echo "✅ Killed process $PID using port 8545."
else
  echo "🟢 Port 8545 is free."
fi

# 🧹 清掉 hardhat cache
npx hardhat clean
npx hardhat compile

# 1. 啟動 Hardhat node
npx hardhat node &

# 2. 等3秒，確保節點啟動
sleep 3

# 3. 部署合約
npx hardhat run scripts/deploy.js --network localhost

# 4. 啟動 API Server
node api/index.js