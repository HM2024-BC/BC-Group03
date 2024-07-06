// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22; // Specifies the compiler version
import "./ElectionNFT.sol"; // Import the future NFT contract


contract Voting {
    address public electionNFTContract;

    // Create a structure template for each candidates
    struct Candidate {
        uint256 id; // Unique identifier for the candidate
        string name; // Name of the candidate
        uint256 numberOfVotes; // Number of votes received by the candidate
    }

    // Election ID ( is never deleted and increment at every starting new election )
    uint256 public electionID = 0;

    // Election Title
    string public electionTitle;

    // List of all candidates
    Candidate[] public candidates;

    // This will be the owner's address
    address public owner;

    // Mapp all voter addresses
    mapping(address => bool) public voters;
    mapping(address => bool) public eligibleVoters;

    // List of voters
    address[] internal hasVotedList;
    address[] internal registeredVoters;

    // voting start and end session
    uint256 public votingStartTimeStamp;
    uint256 public votingEndTimeStamp;

    // Create an election status
    bool public electionStarted;
    bool public electionFinalised;

    // Restrict creating vote to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized to start election");
        _;
    }

    // Check if an election is ongoing
    modifier electionOnGoing() {
        require(electionStarted, "no election yet");
        _;
    }

    // Event emitted when the election starts
    event ElectionStarted(
        address indexed owner,
        uint256 startTimestamp,
        uint256 endTimestamp,
        string title
    );

    // Event emitted when a vote is cast
    event VoteCast(address indexed voter, uint256 candidateId);

    // Event emitted when a new Candidate is added
    event CandidateAdded(uint256 indexed id, string name);

    // Event emitted when time has been added to the election period
    event ElectionDurationChanged(uint256 newDuration);

    // Event emitted when the election finishes
    event ElectionFinished(address indexed owner);

    // Event emitted when the election is reset
    event ElectionReset(address indexed owner);

    constructor() {
        // Initialize owner
        owner = msg.sender;
    }

    function startElection(
        string memory _electionTitle,
        string[] memory _candidates,
        uint256 _votingDuration
    ) public onlyOwner {
        require(electionStarted == false, "Election is currently ongoing");
        require(
            electionFinalised == false,
            "Election is not yet Reinitialized"
        );

        // Increment electionID
        electionID += 1;

        // Clear existing candidates
        while (candidates.length > 0) {
            removeCandidate(0);
        }

        // Add new candidates
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(
                Candidate({id: i, name: _candidates[i], numberOfVotes: 0})
            );
        }

        // Set the election title
        electionTitle = _electionTitle;

        electionStarted = true;
        votingStartTimeStamp = block.timestamp;
        votingEndTimeStamp = block.timestamp + (_votingDuration * 1 minutes);

        emit ElectionStarted(
            owner,
            votingStartTimeStamp,
            votingEndTimeStamp,
            electionTitle
        );
    }

    // Check voter's status
    function voterStatus(address _voter)
        public
        view
        electionOnGoing
        returns (bool)
    {
        if (voters[_voter] == true) {
            return true;
        }
        return false;
    }

    // To vote function
    function voteTo(uint256 _id) public electionOnGoing {
        require(checkElectionPeriod(), "Election period has ended");
        require(
            !voterStatus(msg.sender),
            "You already voted. You can only vote once."
        );
        require(_id < candidates.length, "Invalid candidate ID");
        require(eligibleVoters[msg.sender], "You are not an eligible voter.");

        candidates[_id].numberOfVotes++;
        voters[msg.sender] = true;

        // Add to the has voted voters list
        hasVotedList.push(msg.sender);

        emit VoteCast(msg.sender, _id);
    }

    // Get the number of votes
    function retrieveVotes() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Monitor the election time
    function electionTimer() public view returns (uint256) {
        if (block.timestamp >= votingEndTimeStamp) {
            return 0;
        }
        return (votingEndTimeStamp - block.timestamp);
    }

    // Check if election period is still ongoing
    function checkElectionPeriod() public view returns (bool) {
        return electionTimer() > 0;
    }

    // Reset all voters status
    function resetAllVoterStatus() public onlyOwner {
        for (uint256 i = 0; i < hasVotedList.length; i++) {
            voters[hasVotedList[i]] = false;
        }
        delete hasVotedList;

        emit ElectionReset(owner);
    }

    // Completely resetting the entire election process
    function resetElection() public onlyOwner {
        require(!electionStarted, "Election is currently ongoing");

        // Reset registeredVoters mappings
        for (uint256 i = 0; i < registeredVoters.length; i++) {
            eligibleVoters[registeredVoters[i]] = false;
        }

        // Clear registeredVoters
        delete registeredVoters;

        // Reset voter status
        resetAllVoterStatus();

        // Reset election status and timers
        electionStarted = false;
        votingStartTimeStamp = 0;
        votingEndTimeStamp = 0;
        electionFinalised = false;

        // Remove all candidates
        removeAllCandidates();

        // Reset the election title to the default value
        electionTitle = "No title yet";

        // emit Election Reset
        emit ElectionReset(owner);
    }

    function endElection() public onlyOwner electionOnGoing {
        electionStarted = false;
        votingEndTimeStamp = block.timestamp;
        electionFinalised = true;

        emit ElectionFinished(owner);
    }

    function removeCandidate(uint256 _candidateId) public onlyOwner {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        require(!electionStarted, "Election is ongoing");

        for (uint256 i = _candidateId; i < candidates.length - 1; i++) {
            candidates[i] = candidates[i + 1];
        }

        delete candidates[candidates.length - 1];
        candidates.pop();
    }

    function removeAllCandidates() public onlyOwner {
        require(!electionStarted, "Election is currently ongoing");
        while (candidates.length > 0) {
            removeCandidate(0);
        }
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }

    function changeElectionDuration(uint256 _newDuration)
        public
        onlyOwner
        electionOnGoing
    {
        require(_newDuration > 0, "Invalid duration");

        votingEndTimeStamp = votingStartTimeStamp + (_newDuration * 1 minutes);

        emit ElectionDurationChanged(_newDuration);
    }

    function addCandidate(string memory _name)
        public
        onlyOwner
        electionOnGoing
    {
        require(
            hasVotedList.length == 0,
            "Cannot add new candidates once votes have been cast."
        );
        candidates.push(
            Candidate({id: candidates.length, name: _name, numberOfVotes: 0})
        );

        emit CandidateAdded(candidates.length - 1, _name);
    }

    function registerVoter(address _eligible_voter) public onlyOwner {
        eligibleVoters[_eligible_voter] = true;
        registeredVoters.push(_eligible_voter); // Add the voter to the registeredVoters
    }

    function registerVoters(address[] memory _eligible_voters)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < _eligible_voters.length; i++) {
            eligibleVoters[_eligible_voters[i]] = true;
            registeredVoters.push(_eligible_voters[i]);
        }
    }

    function mintResultNFTs(string memory _tokenURI) public onlyOwner {
        require(!electionStarted, "Election is ongoing, cannot mint NFTs yet");
        require(
            votingStartTimeStamp != 0,
            "Timestamp is 0, election not even started"
        );

        for (uint256 i = 0; i < registeredVoters.length; i++) {
            // Mint NFT to each eligible voter
            ElectionNFT(electionNFTContract).mintNFT(
                registeredVoters[i],
                _tokenURI
            );
        }
    }

    function mintResult(address _participant, string memory _tokenURI)
        public
        onlyOwner
    {
        require(!electionStarted, "Election is ongoing, cannot mint NFTs yet");
        require(
            votingStartTimeStamp != 0,
            "Timestamp is 0, election not even started"
        );
        // Mint an NFT for the participant
        ElectionNFT(electionNFTContract).mintNFT(_participant, _tokenURI);

        // Mark the participant as having received an NFT
        // voters[_participant] = true;
    }

    // Function to set ElectionNFT contract address
    function setElectionNFTContract(address _electionNFTContract)
        public
        onlyOwner
    {
        electionNFTContract = _electionNFTContract;
    }

    // Structure template for election metadata
    struct ElectionMetadata {
        uint256 electionID;
        uint256 winnerID;
        string winnerName;
        uint256 numberOfVotes;
        uint256 startTime;
        uint256 endTime;
        string title;
    }

    struct Winner {
        uint256 candidateID;
        string name;
        uint256 numberOfVotes;
        uint256 electionID;
    }

    function getWinnerInfo() public view returns (Winner memory) {
        require(!electionStarted, "Election is still ongoing");
        require(candidates.length > 0, "No candidates available");

        uint256 maxVotes = 0;
        uint256 winningCandidateIndex;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].numberOfVotes > maxVotes) {
                maxVotes = candidates[i].numberOfVotes;
                winningCandidateIndex = i;
            }
        }

        Winner memory winner = Winner({
            candidateID: candidates[winningCandidateIndex].id,
            name: candidates[winningCandidateIndex].name,
            numberOfVotes: maxVotes,
            electionID: electionID
        });

        return winner;
    }

    function generateMetadata() public view returns (ElectionMetadata memory) {
        require(!electionStarted, "Election is still ongoing");
        require(candidates.length > 0, "No candidates available");

        uint256 maxVotes = 0;
        uint256 winningCandidateIndex;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].numberOfVotes > maxVotes) {
                maxVotes = candidates[i].numberOfVotes;
                winningCandidateIndex = i;
            }
        }

        Winner memory winner = Winner({
            candidateID: candidates[winningCandidateIndex].id,
            name: candidates[winningCandidateIndex].name,
            numberOfVotes: maxVotes,
            electionID: electionID
        });

        // Create ElectionMetadata struct
        ElectionMetadata memory metadata = ElectionMetadata({
            electionID: electionID,
            winnerID: winner.candidateID,
            winnerName: winner.name,
            numberOfVotes: winner.numberOfVotes,
            startTime: votingStartTimeStamp,
            endTime: votingEndTimeStamp,
            title: electionTitle
        });

        return metadata;
    }
}
