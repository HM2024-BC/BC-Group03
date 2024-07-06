const { expect } = require("chai");

// Describe block for the Voting Contract test suite
describe("Voting Contract", function () {
    let Voting;  // Declare variable for the Voting contract
    let voting;  // Declare variable for the deployed instance of the Voting contract
    let owner;   // Declare variable for the owner of the contract
    let addr1;   // Declare variable for address 1
    let addr2;   // Declare variable for address 2

    // Before each test case, deploy a fresh instance of the Voting contract
    beforeEach(async function () {
        // Get signers (addresses) from ethers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the Voting contract using the factory
        const VotingFactory = await ethers.getContractFactory("Voting");
        voting = await VotingFactory.deploy();

        // Connect the contract factory to the owner
        Voting = await VotingFactory.connect(owner);
    });

    // Test case 1: Should check if the correct owner is set after deployment
    it("should have the correct owner after deployment", async function () {
        // Assert that the owner of the contract is equal to the expected owner's address
        expect(await voting.owner()).to.equal(owner.address);
    });

    // Test case 2: Should start an election with the correct parameters
    it("should start an election with the correct parameters", async function () {
        const electionTitle = "Test Election";
        const candidates = ["Candidate1", "Candidate2"];
        const votingDuration = 10; // in minutes

        // Start an election with the specified parameters
        await voting.startElection(electionTitle, candidates, votingDuration);

        // Additional assertions related to the election start
        expect(await voting.electionStarted()).to.be.true;
        expect(await voting.votingStartTimeStamp()).to.not.equal(0);
        expect(await voting.votingEndTimeStamp()).to.not.equal(0);
        expect(await voting.electionTitle()).to.equal(electionTitle);
    });

    // Test case 3: Should handle voter registration and voting
    it("should handle voter registration and voting", async function () {

       // Start an election before registering voters and casting votes
        const electionTitle = "Test Election";
        const candidates = ["Candidate1", "Candidate2"];
        const votingDuration = 10; // in minutes
        await voting.startElection(electionTitle, candidates, votingDuration);

        // Register voters for this specific test scenario
        await voting.registerVoter(addr1.address);
        await voting.registerVoter(addr2.address);
        await voting.registerVoter(owner.address);

        // Cast votes for Candidate with ID 0
        await voting.connect(addr1).voteTo(0);
        await voting.connect(addr2).voteTo(0);
        await voting.connect(owner).voteTo(0);

        // Additional assertions related to the voting process
        const voteCountCandidate0 = (await voting.retrieveVotes())[0].numberOfVotes;

        // Assert various conditions for the voting process, here all voters voted for candidate ID 0, so he should get 3 votes.
        expect(voteCountCandidate0).to.equal(3); // Assuming three voters
    });

    // Add more focused test cases as needed
});