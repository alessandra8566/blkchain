# 台積電股票管理系統 (TSMC Stock Management System)
這是一個使用 Hardhat 開發框架、nodejs 後端服務與 React + Typescript 前端框架的以太坊智能合約應用。該應用允許用戶購買、轉移和查詢台積電股票的餘額和交易歷史。
## 專案結構
``` 
├── blkchain/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── api           # API 呼叫列表
│   │   │   ├── components    # UI 組件
│   │   │   │   ├── ui        # shadcn 組件庫安裝位置
│   │   │   │   ├── others    # 其他自定義組件
│   │   │   ├── utils/types   # types 定義
│   │   │   ├── pages         # 顯示頁面
│   │   │   ├── App.tsx       # 前端路由設定
│   │   │   ├── .env          # 正式環境的環境變量
│   │   │   ├── Dockerfile
│   ├── hardhatnode/
│   │   ├── api/
│   │   │   ├── index.js      # API Server 入口
│   │   │   ├── routes        # API 路由表
│   │   ├── script/
│   │   ├── Dockerfile
│   ├── nginx/                # http/https 轉址設定
├── docker-compose.yml        # docker compose 設定檔
└── README.md                 # 專案說明
```