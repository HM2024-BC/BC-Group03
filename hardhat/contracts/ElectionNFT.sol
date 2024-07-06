// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ElectionNFT is ERC721 {
    address public electionContractAddress;
    uint256 public electionId;
    uint256 public tokenIdCounter;
    string private baseTokenURI;
    mapping(uint256 => string) private tokenURIs;

    constructor(address _electionContractAddress)
        ERC721("Election NFT", "ENFT")
    {
        electionContractAddress = _electionContractAddress;
    }

    event NFTMinted(address indexed to, uint256 tokenId, string tokenURI);

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) external {
        require(
            msg.sender == electionContractAddress,
            "Only the election contract can set base URI"
        );
        baseTokenURI = _newBaseTokenURI;
    }

    function mintNFT(address _to, string memory _tokenURI) external {
        require(
            msg.sender == electionContractAddress,
            "Only the election contract can mint NFTs"
        );
        tokenIdCounter++;
        _safeMint(_to, tokenIdCounter);
        tokenURIs[tokenIdCounter] = _tokenURI;
        emit NFTMinted(_to, tokenIdCounter, _tokenURI);
    }

    function getTokenURI(uint256 _tokenId)
        external
        view
        returns (string memory)
    {
        return tokenURIs[_tokenId];
    }
}