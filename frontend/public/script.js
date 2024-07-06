// Address and ABI of the Voting.sol contract
const contractAddress = '0x72a17F6b1bFe07d555528B92DD6CB9BF4FA86471';
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newDuration",
				"type": "uint256"
			}
		],
		"name": "ElectionDurationChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ElectionFinished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ElectionReset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "ElectionStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newDuration",
				"type": "uint256"
			}
		],
		"name": "changeElectionDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkElectionPeriod",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionFinalised",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionNFTContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionTimer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionTitle",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "eligibleVoters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "generateMetadata",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "electionID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "winnerID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "winnerName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					}
				],
				"internalType": "struct Voting.ElectionMetadata",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinnerInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "candidateID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "electionID",
						"type": "uint256"
					}
				],
				"internalType": "struct Voting.Winner",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_participant",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "mintResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "mintResultNFTs",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_eligible_voter",
				"type": "address"
			}
		],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_eligible_voters",
				"type": "address[]"
			}
		],
		"name": "registerVoters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "removeAllCandidates",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "removeCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetAllVoterStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveVotes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfVotes",
						"type": "uint256"
					}
				],
				"internalType": "struct Voting.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_electionNFTContract",
				"type": "address"
			}
		],
		"name": "setElectionNFTContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_electionTitle",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_candidates",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_votingDuration",
				"type": "uint256"
			}
		],
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "voteTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "voterStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingEndTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingStartTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Address and ABI of the ElectionNFT contract
const electionNFTAddress = '0xb866Fe610468F920094b06d276A769EdCB4B9644'; // Address of the deployed ElectionNFT contract
const electionNFTABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_electionContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "NFTMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseTokenURI",
				"type": "string"
			}
		],
		"name": "setBaseTokenURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenIdCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const connectWalletMsg = document.querySelector("#connectWalletMessage");
const connectWalletBtn = document.querySelector("#connectWalletbutton");
const votingStation = document.querySelector("#votingStation");
const timerTime = document.querySelector("#time");
const timerMessage = document.querySelector("#timerMessage");
const mainBoard = document.querySelector("#mainBoard");
const voteForm = document.querySelector("#voteForm");
const vote = document.querySelector("#vote");
const voteBtn = document.querySelector("#sendVote");
const result = document.querySelector("#result");
const admin = document.querySelector("#admin");
const addCandidateInput4 = document.querySelector("#addCandidateInput4");
const specifyDuration = document.querySelector("#specifyDuration");
const startElectionButton = document.querySelector("#startElectionButton");
const addCandidateInputBonus = document.querySelector("#addCandidateInputBonus");
const addCandidateButton = document.querySelector("#addCandidateButton");
const resetBtn = document.querySelector("#resetElectionButton");
const changeElectionDurationInput = document.querySelector("#changeElectionDurationInput");
const changeElectionDurationButton = document.querySelector("#changeElectionDurationButton");
const addVoterInputArray = document.querySelector("#addVoterInputArray");
const addVoterButtonArray = document.querySelector("#addVoterButtonArray");
const connectWalletMessageSpan = document.querySelector("#connectWalletMessageSpan");
const generateAndUploadMetadataButton = document.querySelector("#generateAndUploadMetadataButton");

let contract;
let signer;
let electionNFTContract;
let metadata;

// Function to initialize provider, signer and contract
function initializeProvider() {
    // Create a new Web3Provider with the window.ethereum object
    provider = new ethers.providers.Web3Provider(window.ethereum, 1311);

    // Request user accounts and set up the signer and contract
    return provider.send("eth_requestAccounts", []).then(() => {
        return provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            contract = new ethers.Contract(contractAddress, contractABI, signer);
        });
    });
}

// Function to connect Metamask
async function connectToWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum, 1311);

        provider.send("eth_requestAccounts", []).then(() => {
            console.log("Accounts requested");

            provider.listAccounts().then((accounts) => {
                console.log("List of accounts:", accounts);

                signer = provider.getSigner(accounts[0]);
                contract = new ethers.Contract(contractAddress, contractABI, signer);

                console.log("Signer and Contract set up");

                // Update UI elements and display messages
                connectWalletBtn.textContent = "Connected";
                connectWalletBtn.style.backgroundColor = "#019B83ff"; // Change the background color to light green

                // Display address connected
                connectWalletMessageSpan.innerHTML = `${accounts[0]}`;
                getElectionID();
                fetchElectionTitle();
                                
            });
        });

        votingStation.style.display = "block";
    } catch (error) {
        console.error(error);
        console.log("Error connecting to Metamask. Please make sure it's installed and unlocked.");
    }
}

// Add an event listener to the connectWalletBtn
connectWalletBtn.addEventListener("click", connectToWallet);

// Function to toggle admin panel visibility
function toggleAdminPanel() {
    const adminDiv = document.getElementById('admin');
    adminDiv.style.display = (adminDiv.style.display === 'block') ? 'none' : 'block';
}

// Function to toggle admin panel visibility
function toggleVotePanel() {
    const voteDiv = document.getElementById('votePanel');
    voteDiv.style.display = (voteDiv.style.display === 'block') ? 'none' : 'block';
}

// Event listener for admin panel button click
document.getElementById('adminPanelButton').addEventListener('click', async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length > 0) {
        const connectedAddress = accounts[0];
        const ownerAddress = await contract.owner();

        if (connectedAddress.toLowerCase() === ownerAddress.toLowerCase()) {
            toggleAdminPanel();
            if (document.getElementById('votePanel').style.display === 'block') {
                toggleVotePanel();
            }
        } else {
            alert("You are not the administrator of the election session.");
        }
    } else {
        alert("Please connect with administrator wallet address.");
    }
});

// Event listener for vote panel button click
document.getElementById('votePanelButton').addEventListener('click', () => {
    toggleVotePanel();
    if (document.getElementById('admin').style.display === 'block') {
        toggleAdminPanel();
    }
    displayCandidates();
    showTimer();
});

// Function to fetch and display the election title
async function fetchElectionTitle() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 1311);

    try {
        await provider.send("eth_requestAccounts", []);

        const accounts = await provider.listAccounts();

        const signer = provider.getSigner(accounts[0]);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const title = await contract.electionTitle();
        console.log('Election Title:', title);

        document.getElementById('electionTitleSpan').textContent = title;
    } catch (error) {
        console.error('Error fetching election title:', error);
        // Handle the error appropriately, e.g., display a default title or show an error message
    }
}

// Function to call the election ID
async function getElectionID() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 1311);

    try {
        await provider.send("eth_requestAccounts", []);

        const accounts = await provider.listAccounts();

        const signer = provider.getSigner(accounts[0]);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const startTimestamp = await contract.votingStartTimeStamp();
        if (startTimestamp.toNumber() === 0) {
            document.getElementById('electionID').textContent = "Not started yet";
            return;
        }

        const electionID = await contract.electionID();
        console.log('Election ID:', electionID.toString());

        document.getElementById('electionID').textContent = electionID.toString();
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = "Error generate metadata: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// Function to vote
voteBtn.addEventListener("click", async () => {
    try {
        const candidateId = vote.value;
        await contract.voteTo(candidateId);
        console.log("Vote cast successfully!");
    } catch (error) {
        console.error(error);
        console.log("Error casting vote: " + error.message);
        const errorMessage = "Error casting vote: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to display main voting board with candidate and timer
async function displayCandidates() {
    if (contract) {
        const candidates = await contract.retrieveVotes();
        const candidateBoard = document.querySelector("#candidateBoard");
        const rows = candidateBoard.querySelectorAll("tr");

        for (let i = 1; i < rows.length; i++) {
            candidateBoard.removeChild(rows[i]);
        }

        if (candidates.length === 0) {
            const noCandidatesRow = document.createElement("tr");
            noCandidatesRow.innerHTML = `
        <td colspan="3">No candidates yet</td>
      `;
            candidateBoard.appendChild(noCandidatesRow);
        } else {
            candidates.forEach(candidate => {
                const row = document.createElement("tr");
                row.innerHTML = `
            <th style="word-break: break-all;">${candidate.id || "No ID yet"}</th>
            <th style="word-break: break-all;">${candidate.name || "No name yet"}</th>
            <th style="word-break: break-all;">${candidate.numberOfVotes || "No vote yet"}</th>
            <th><button class="voteBtnRow">Vote</button></th>
        `;
                candidateBoard.appendChild(row);

                const voteRowButton = row.querySelector('.voteBtnRow');
                voteRowButton.addEventListener('click', async () => {
                    try {
                        const candidateId = candidate.id;
                        await contract.voteTo(candidateId);
                        console.log("Vote cast successfully!");
                    } catch (error) {
                        console.error(error);
                        console.log("Error casting vote: " + error.message);
                        const errorMessage = "Error casting vote: " + extractErrorMessage(error);
                        console.log(errorMessage);
                        alert(errorMessage);

                    }
                });
                getElectionID();
            });
        }
    }
}

// Event listening button to Display Candidate
showCandidateList.addEventListener("click", async () => {
    try {

        displayCandidates();
        console.log("display successfully!");

    } catch (error) {
        console.error(error);
        console.log("Error display: " + error.message);
    }
});

// Function to check if account is already connected
async function checkAccountConnection() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            connectWalletBtn.textContent = "Connected";
            connectWalletBtn.style.backgroundColor = "var(--persian-green)";
            votingStation.style.display = "block";
            connectWalletMessageSpan.innerHTML = `${accounts[0]}`;


        } else {
            connectWalletMessageSpan.textContent = "Click connect button please";

            // Account is not connected
            // Wait for the user to connect the wallet
        }
    } catch (error) {
        console.error(error);
        alert("Error checking account connection. Please make sure Metamask is installed and unlocked.");
    }
}

// Function to update the timer message
function updateTimerMessage(seconds) {
    const timerMessage = document.getElementById("time");
    timerMessage.textContent = seconds;
    timerMessage.innerHTML = `<span id="time">${seconds}</span> left Hallo`;
}

// Function to call the timer value
async function showTimer() {
    try {
        let secondsLeft = await contract.electionTimer();
        console.log("Seconds left:", secondsLeft);
        let formattedDuration = formatDuration(secondsLeft); // <-- Corrected this line
        console.log("Formatted Duration:", formattedDuration);
        updateTimerMessage(formattedDuration);

        // ...
    } catch (error) {
        console.error("Error:", error); // Added console.error
        // Handle errors
    }
}

// Function to format the timer value in more readeable values
function formatDuration(seconds) {
    let years = Math.floor(seconds / (60 * 60 * 24 * 365));
    let days = Math.floor((seconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24));
    let hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((seconds % (60 * 60)) / 60);
    let remainingSeconds = seconds % 60;

    let result = "";

    if (years > 0) {
        result += years + (years === 1 ? " year" : " years") + " ";
    }

    if (days > 0) {
        result += days + (days === 1 ? " day" : " days") + " ";
    }

    if (hours > 0) {
        result += hours + (hours === 1 ? " h" : " h") + " ";
    }

    if (minutes > 0) {
        result += minutes + (minutes === 1 ? " min" : " min") + " ";
    }

    if (remainingSeconds > 0 || result === "") { // Added condition to always show seconds
        result += remainingSeconds + (remainingSeconds === 1 ? " s" : " s");
    }

    return result.trim();
}

// Function to start the election
startElectionButton.addEventListener("click", async () => {
    try {

        const electionTitle = document.querySelector("#electionTitleInput").value;

        const candidates = [
            addCandidateInput.value,
            addCandidateInput2.value,
            addCandidateInput3.value,
            ...addCandidateInput4.value.split(",")
        ].filter(Boolean);
        console.log(candidates);
        const votingDuration = specifyDuration.value;

        const provider = new ethers.providers.Web3Provider(window.ethereum, 1311);


        provider.send("eth_requestAccounts", []).then(() => {

            provider.listAccounts().then((accounts) => {
                console.log("List of accounts:", accounts);

                signer = provider.getSigner(accounts[0]);
                contract = new ethers.Contract(contractAddress, contractABI, signer);

            });
        });

        await contract.startElection(electionTitle, candidates, votingDuration);
        console.log("Election is starting, wait for blockchain confirmation");
    } catch (error) {
        console.error(error);
        console.log("Error starting the election: " + error.message);
        const errorMessage = "Error starting the election: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to change election duration
changeElectionDurationButton.addEventListener("click", async () => {
    try {
        const duration = changeElectionDurationInput.value;
        await contract.changeElectionDuration(duration);
        console.log("Duration changed successfully!");
    } catch (error) {
        const errorMessage = "Error change duration: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to reset Election
resetBtn.addEventListener("click", async () => {
    try {
        await contract.resetElection();
        console.log("Reset successfully!");
    } catch (error) {
        console.error(error);
        console.log("Error reseting: " + error.message);
        const errorMessage = "Error reseting: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to add candidate after election start but before anyone voted
addCandidateButton.addEventListener("click", async () => {
    try {
        const candidateName = addCandidateInputBonus.value;
        await contract.addCandidate(candidateName);
        console.log("Candidate added successfully!");
    } catch (error) {
        console.error(error);
        console.log("Error adding candidate: " + error.message);
        const errorMessage = "Error adding candidate: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Aim to provide usefull 'Alert' error message
function extractErrorMessage(error) {
    const match = /"execution reverted: ([^"]*)/.exec(error.message);
    if (match && match.length > 1) {
        return match[1];
    }
    return "Unknown error";
}

// Event listening election end
endElectionButton.addEventListener("click", async () => {
    try {
        await contract.endElection();
        console.log("Election ending in progress and called to the blockchain");
    } catch (error) {
        // console.error(error);
        const errorMessage = "Error ending the election: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to connect to the ElectionNFT contract
async function connectToElectionNFTContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 1311);

    provider.send("eth_requestAccounts", []).then(() => {

        provider.listAccounts().then((accounts) => {

            signer = provider.getSigner(accounts[0]);
            electionNFTContract = new ethers.Contract(electionNFTAddress, electionNFTABI, signer);

            console.log("ElectionNFT Contract connected");
        });
    });
}

// Function to mint the results as an NFT by interacting with ElectionNFT contract
async function mintResultNFTs(tokenURI) {
    try {
        // Assuming you've already set up the connection to the Election contract and the ElectionNFT contract

        const ListOfVoters = await contract.ListOfVoters(); // Assuming ListOfVoters is a public state variable
        for (let i = 0; i < ListOfVoters.length; i++) {
            const voterAddress = ListOfVoters[i];
            const isEligible = await contract.eligibleVoters(voterAddress);

            if (isEligible) {
                await electionNFTContract.mintNFT(voterAddress, tokenURI);
                console.log(`NFT minted for voter at address ${voterAddress}`);
            }
        }
    } catch (error) {
        console.error(error);
        console.log("Error minting NFT: " + error.message);
        const errorMessage = "Error minting NFT: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// Event listening to registering of voter
addVoterButtonArray.addEventListener("click", async () => {
    try {
        const voterAddresses = addVoterInputArray.value.split(',').map(address => address.trim());
        await contract.registerVoters(voterAddresses);
        console.log(`Voters registered successfully!`);
    } catch (error) {
        console.error(error);
        console.log(`Error registering voters: ${error.message}`);
        const errorMessage = "Error registering voters: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
});

// Function to generate the metadata of the NFT
async function generateAndUploadMetadata2() {
    try {
        const winner = await contract.getWinnerInfo();
        const startTimestamp = await contract.votingStartTimeStamp();
        const endTimestamp = await contract.votingEndTimeStamp();
        const title = await contract.electionTitle();

        metadata = {
            electionTitle: title,
            electionID: parseInt(winner.electionID._hex, 16),
            winnerID: parseInt(winner.candidateID._hex, 16),
            winnerName: winner.name,
            numberOfVotes: parseInt(winner.numberOfVotes._hex, 16),
            startTime: parseInt(startTimestamp._hex, 16),
            endTime: parseInt(endTimestamp._hex, 16)
        };

        console.log("Metadata generated successfully!", metadata);

        // Convert metadata to string and set it as the tokenURI
        const tokenURI = JSON.stringify(metadata);

        // Assuming you have a function to mint NFTs, update it to use tokenURI
        await contract.mintResultNFTs(tokenURI);

        console.log("NFT mint initialized, work in progress...");
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = "Error generate metadata: " + extractErrorMessage(error);
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// Event mint button clicked
generateAndUploadMetadataButton.addEventListener("click", async () => {
    await getElectionID();
    console.log("Button clicked!");
    generateAndUploadMetadata2();
    console.log("Metadata generated successfully!", metadata);
});


// JavaScript to refresh the page when the logo is clicked
document.getElementById('logo').addEventListener('click', function() {
	window.location.replace("index.html"); // Replace 'index.html' with your actual homepage URL
  });
  



