# 使用 node 官方映像檔（推薦 LTS）
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製專案檔案
COPY hardhatnode .

# 先給 start.sh 執行權限
RUN chmod +x start.sh

# 安裝依賴
RUN npm install

# 暴露 Hardhat + Express 節點的 port
EXPOSE 8545
EXPOSE 3000

# 預設執行 Hardhat 本地節點
# CMD ["npx", "hardhat", "node"]
# CMD ["npx", "concurrently", "-k", "-n", "hardhat,api", "npx hardhat node", "node api/index.js"]
ENTRYPOINT ["bash", "start.sh"]
