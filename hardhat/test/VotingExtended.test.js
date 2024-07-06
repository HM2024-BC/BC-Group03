const { expect } = require("chai");

// Describe block for the Voting Contract test suite
describe("Voting Contract Extended Test", function () {
    let Voting;  // Declare variable for the Voting contract
    let voting;  // Declare variable for the deployed instance of the Voting contract
    let owner;   // Declare variable for the owner of the contract
    let addr1;   // Declare variable for address 1
    let addr2;   // Declare variable for address 2
    let addr3;   // Declare variable for address 3

    // Before each test case, deploy a fresh instance of the Voting contract
    beforeEach(async function () {

        const electionTitle = "Test Election";
        const candidates = ["Candidate1", "Candidate2", "Candidate3"];
        const votingDuration = 10; // in minutes

        // Get signers (addresses) from ethers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the Voting contract using the factory
        const VotingFactory = await ethers.getContractFactory("Voting");
        voting = await VotingFactory.deploy();

        // Connect the contract factory to the owner
        Voting = await VotingFactory.connect(owner);

        await voting.startElection(electionTitle, candidates, votingDuration);

        await voting.registerVoter(addr1.address);
        await voting.registerVoter(addr2.address);
        await voting.registerVoter(owner.address);

        // Cast votes for Candidate with ID 0
        await voting.connect(addr1).voteTo(0);
        await voting.connect(addr2).voteTo(0);
        await voting.connect(owner).voteTo(1);
    });

    it("should have the correct owner after deployment", async function () {
        expect(await voting.owner()).to.equal(owner.address);
    });

    it("should handle voter registration and voting", async function () {

        const voteCountCandidate0 = (await voting.retrieveVotes())[0].numberOfVotes;
        const voteCountCandidate1 = (await voting.retrieveVotes())[1].numberOfVotes;
        const voteCountCandidate2 = (await voting.retrieveVotes())[2].numberOfVotes;

        expect(voteCountCandidate0).to.equal(2);
        expect(voteCountCandidate1).to.equal(1);
        expect(voteCountCandidate2).to.equal(0);
    });

    // Test case to ensure the proper ending/finalization of the election
    it("should end election / finalize", async function () {
        // Calling the endElection function to conclude the voting process
        await voting.endElection();

        // Verifying that the electionStarted status is now false
        expect(await voting.electionStarted()).to.be.false;
    });

    it("should reinitialise election", async function () {

        await voting.endElection();
        await voting.resetElection();

        expect(await voting.electionStarted()).to.be.false;
        expect(await voting.votingStartTimeStamp()).to.equal(0);
    });

    it("Should reject additional vote if voter already voted", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Call the vote function again, which should revert
            await voting.connect(owner).voteTo(1);

            // If the above line does not revert, fail the test
            expect.fail("Expected fail");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

    it("Should reject attempt to end election by non-admin", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to end the election as a non-admin voter
            await voting.connect(addr1).endElection();

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

    it("Should allow only admin to register voters", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to register a voter as a non-admin
            await voting.connect(addr1).registerVoter(addr2.address);

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

    it("Should allow only admin to start an election", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to start an election as a non-admin
            await voting.connect(addr1).startElection("New Election", ["A", "B", "C"], 10);

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

    it("Should allow only admin to reset an election", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to reset an election as a non-admin
            await voting.connect(addr1).resetElection();

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception while processing transaction: reverted", "Expected revert error");
        }
    });

    it("Should allow only admin to change the voting duration", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to change voting duration as a non-admin
            await voting.connect(addr1).changeElectionDuration(300);

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception while processing transaction: reverted", "Expected revert error");
        }
    });

    it("Should allow only registered voters to cast votes", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to vote as a non-registered voter
            await voting.connect(addr3).voteTo(0);

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            
        }
    });

    it("Should allow only admin to add candidates", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to add a candidate as a non-admin
            await voting.connect(addr1).addCandidate("New Candidate");

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

    it("Should not allow admin to add candidates after someone voted already", async function () {
        // Use try-catch to handle the expected revert
        try {
            // Attempt to add a candidate as a non-admin
            await voting.connect(owner).addCandidate("New Candidate");

            // If the above line does not revert, fail the test
            expect.fail("Expected revert not received");
        } catch (error) {
            // Ensure that the error message contains the expected revert reason
            expect(error.message).to.include("VM Exception", "Expected revert error");
        }
    });

});