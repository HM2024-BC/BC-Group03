// Import required libraries
const hre = require("hardhat");
const fs = require('fs');

// Function to deploy the Voting contract
async function deployVotingContract() {
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Voting contract with the account:", deployer.address);

  // Get the Voting contract factory
  const votingContract = await hre.ethers.getContractFactory("Voting");
  
  // Deploy the Voting contract
  const deployedVotingContract = await votingContract.deploy();

  // Save deployment information to a text file
  const deploymentInfo = `Deployer Address: ${deployer.address}\nVoting Contract Address: ${deployedVotingContract.target}`;
  console.log(`Voting Contract Address deployed: ${deployedVotingContract.target}`);
  fs.writeFileSync('deploymentInfoVoting.txt', deploymentInfo);

  // Return the deployed Voting contract instance
  return deployedVotingContract;
}

async function deploySuppliersContract() {
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Voting contract with the account:", deployer.address);

  // Get the Voting contract factory
  const suppliersContract = await hre.ethers.getContractFactory("Suppliers");
  
  // Deploy the Voting contract
  const deployedSuppliersContract = await suppliersContract.deploy();

  // Save deployment information to a text file
  const deploymentInfo = `Deployer Address: ${deployer.address}\nVoting Contract Address: ${deployedSuppliersContract.target}`;
  console.log(`Suppliers Contract Address deployed: ${deployedSuppliersContract.target}`);
  fs.writeFileSync('deploymentInfoSupplierd.txt', deploymentInfo);

  // Return the deployed Voting contract instance
  return deployedSuppliersContract;
}

// Function to deploy the ElectionNFT contract
async function deployElectionNFTContract(votingContract) {
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ElectionNFT contract with the account:", deployer.address);

  // Get the ElectionNFT contract factory
  const electionNFTContract = await hre.ethers.getContractFactory("ElectionNFT");
  
  // Deploy the ElectionNFT contract, passing the address of the Voting contract
  const deployedElectionNFTContract = await electionNFTContract.deploy(votingContract.target);

  // Save deployment information to a text file
  const deploymentInfo = `Deployer Address: ${deployer.address}\nElectionNFT Contract Address: ${deployedElectionNFTContract.target}`;
  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.target}`);
  fs.writeFileSync('deploymentInfoNFT.txt', deploymentInfo);

  // Call the setElectionNFTContract function in the Voting contract
  await votingContract.setElectionNFTContract(deployedElectionNFTContract.target);
}

// Main function
async function main() {
  // Deploy the Voting contract
  const votingContract = await deployVotingContract();
  await deploySuppliersContract();
  // Deploy the ElectionNFT contract and set the ElectionNFT contract address in the Voting contract
  await deployElectionNFTContract(votingContract);
}

// Handle errors during deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});