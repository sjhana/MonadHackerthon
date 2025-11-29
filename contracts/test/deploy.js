const hre = require("hardhat");

async function main() {
  // 1. 获取部署者的钱包账号
  // 默认使用 hardhat.config.js 中配置的 accounts 数组的第一个私钥
  const [deployer] = await hre.ethers.getSigners();

  console.log("==================================================");
  console.log("🚀 开始部署合约...");
  console.log("👛 部署账户地址:", deployer.address);
  
  // 获取账户余额 (可选，用于检查是否有足够的 Gas)
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 账户余额:", hre.ethers.formatEther(balance), "ETH");
  console.log("==================================================");

  // 2. 获取合约工厂
  // ⚠️ 注意：这里的 "CipherHuntV1" 必须和你 .sol 文件里 contract 关键字后面的名字完全一致！
  // 如果你的合约叫 contract TreasureMap { ... }，这里就写 "TreasureMap"
  const ContractName = "TreasureMap"; 
  const ContractFactory = await hre.ethers.getContractFactory(ContractName);

  // 3. 发送部署交易
  // 如果你的构造函数 constructor 有参数，请在 deploy() 的括号里填入参数
  // 例如: await ContractFactory.deploy("参数1", "参数2");
  console.log(`正在把 ${ContractName} 发送到区块链网络...`);
  const contract = await ContractFactory.deploy();

  // 4. 等待合约部署完成 (上链确认)
  await contract.waitForDeployment();

  // 5. 获取合约地址
  // 在 Ethers v6 中，使用 contract.target 获取地址
  const contractAddress = contract.target;

  console.log("==================================================");
  console.log("🎉 部署成功!");
  console.log(`📍 合约地址: ${contractAddress}`);
  console.log("⚠️  请立即复制上方地址并保存到你的前端配置文件中！");
  console.log("==================================================");
}

// 执行部署函数，并处理可能的错误
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});