const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Crypt Clash Pools contracts...");

  // Get the contract factories
  const CryptClashPools = await ethers.getContractFactory("CryptClashPools");
  const FHEEncryption = await ethers.getContractFactory("FHEEncryption");

  // Deploy FHE Encryption contract first
  console.log("Deploying FHE Encryption contract...");
  const fheEncryption = await FHEEncryption.deploy();
  await fheEncryption.deployed();
  console.log("FHE Encryption deployed to:", fheEncryption.address);

  // Deploy a mock ERC20 token for testing
  const MockToken = await ethers.getContractFactory("MockERC20");
  const mockToken = await MockToken.deploy("Crypt Clash Token", "CCT", ethers.utils.parseEther("1000000"));
  await mockToken.deployed();
  console.log("Mock Token deployed to:", mockToken.address);

  // Deploy main Crypt Clash Pools contract
  console.log("Deploying Crypt Clash Pools contract...");
  const cryptClashPools = await CryptClashPools.deploy(mockToken.address);
  await cryptClashPools.deployed();
  console.log("Crypt Clash Pools deployed to:", cryptClashPools.address);

  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    fheEncryption: fheEncryption.address,
    mockToken: mockToken.address,
    cryptClashPools: cryptClashPools.address,
    deployer: await ethers.getSigners().then(signers => signers[0].address),
    timestamp: new Date().toISOString()
  };

  console.log("\n=== Deployment Summary ===");
  console.log("FHE Encryption:", deploymentInfo.fheEncryption);
  console.log("Mock Token:", deploymentInfo.mockToken);
  console.log("Crypt Clash Pools:", deploymentInfo.cryptClashPools);
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Timestamp:", deploymentInfo.timestamp);

  // Verify contracts on Etherscan (if on mainnet/testnet)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("\nVerifying contracts on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: fheEncryption.address,
        constructorArguments: [],
      });
      console.log("FHE Encryption verified");
    } catch (error) {
      console.log("FHE Encryption verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: mockToken.address,
        constructorArguments: ["Crypt Clash Token", "CCT", ethers.utils.parseEther("1000000")],
      });
      console.log("Mock Token verified");
    } catch (error) {
      console.log("Mock Token verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: cryptClashPools.address,
        constructorArguments: [mockToken.address],
      });
      console.log("Crypt Clash Pools verified");
    } catch (error) {
      console.log("Crypt Clash Pools verification failed:", error.message);
    }
  }

  console.log("\nDeployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
