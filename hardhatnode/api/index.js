const { exec } = require('child_process');
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const stockRoutes = require("./routes/stock");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/stocks", stockRoutes);

app.listen(3000, () => {
  console.log("API server is running on port 3000");
});


// async function startServer() {
//   // Start API server on port 3000 (or any port you choose)
//   app.listen(3000, () => {
//     console.log("API server is running on port 3000");
//   });

//   // Execute hardhat deploy script after the server starts
//   exec('npx hardhat run scripts/deploy.js --network localhost', (err, stdout, stderr) => {
//     if (err) {
//       console.error("Error executing deploy script:", err);
//       return;
//     }
//     if (stderr) {
//       console.error("Deploy script stderr:", stderr);
//       return;
//     }
//     console.log("Deploy script stdout:", stdout);
//   });
// }

// startServer();