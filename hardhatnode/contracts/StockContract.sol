// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StockContract {

    string public stockName = "2330";
    uint256 public totalStock = 1000;
    mapping(address => uint256) public balances; //last value 
    mapping(address => uint256) public stockHistory; //his value

    event StockBought(address indexed buyer, uint256 amount, uint256 remainingStock);
    event StockTransferred(address indexed from, address indexed to, uint256 amount);

    //but stock func
    function buyStock(uint256 amount) public {
        require(amount == 1, "just buy 1 coin");
        require(totalStock >= amount, "not enough");

        totalStock -= amount; //stock less 
        balances[msg.sender] += amount; // now stock add
        stockHistory[msg.sender] += amount; // trade list 

        emit StockBought(msg.sender, amount, totalStock); //touch ement 
    }
    //Transaction
    function transferStock(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough stock to transfer");
        require(to != address(0), "Invalid address");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit StockTransferred(msg.sender, to, amount);
    }

    //event StockTransferred(address indexed from, address indexed to, uint256 amount);

    //search last stock value 
    function getRemainingStock() external view returns (uint256) {
        return totalStock;
    }

    //search account money
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    //search account stock trade 
    function getTransactionHistory(address account) external view returns (uint256) {
        return stockHistory[account];
    }
    // ✅ 新增：取得帳戶目前持有股數
    function getStocksByAddress(address account) external view returns (uint256) {
        return balances[account];
    }

   //ERC20
    function name() public pure returns (string memory) {
        return "TSMC";
    }

    function symbol() public pure returns (string memory) {
        return "2330";
    }

    function decimals() public pure returns (uint8) {
   	    return 0; // 每股當作1單位（不用小數點）
    }

   //function totalSupply() public view returns (uint256) {
   //	return 1000; // 總供應量
   //}
    function totalSupply() public pure returns (uint256) {
        return 1000;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

}
