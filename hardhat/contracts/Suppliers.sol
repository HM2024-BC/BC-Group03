// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Suppliers  {
    struct Supplier {
        string name;
        uint sustainabilityScore;
        string description;
    }

    Supplier[] public suppliers;

    event SupplierAdded(uint indexed supplierId, string name, uint sustainabilityScore, string description);
    event SustainabilityScoreUpdated(uint indexed supplierId, uint newScore, string addedDescription);


    /// @notice Initializes the smart contract with 5 dummy suppliers.
    constructor() {
        _addSupplier("Supplier A", 85, "Supplier A is focused on reducing carbon emissions.");
        _addSupplier("Supplier B", 70, "Supplier B uses recycled materials.");
        _addSupplier("Supplier C", 90, "Supplier C has a comprehensive CSR program.");
        _addSupplier("Supplier D", 60, "Supplier D is working on reducing water usage.");
        _addSupplier("Supplier E", 75, "Supplier E supports local communities.");
    }

    /// @notice Adds a new supplier to the blockchain with their sustainability information.
    /// @dev Only the contract owner can add new suppliers.
    /// @param _name The name of the supplier.
    /// @param _sustainabilityScore A score representing the supplier's sustainability practices.
    /// @param _description A brief description of the supplier's sustainability efforts.
    function addSupplier(string memory _name, uint _sustainabilityScore, string  memory _description) public  {
        _addSupplier(_name, _sustainabilityScore, _description);
    }

    /// @dev Internal function to add a supplier.
    /// @param _name Name of the supplier.
    /// @param _sustainabilityScore Sustainability score of the supplier.
    /// @param _description Description of the supplier's sustainability practices.
    function _addSupplier(string memory _name, uint _sustainabilityScore, string memory _description) internal {
        suppliers.push(Supplier(_name, _sustainabilityScore, _description));
        emit SupplierAdded(suppliers.length - 1, _name, _sustainabilityScore, _description);
    }

    /// @notice Fetches details of a specific supplier by their ID.
    /// @param _supplierId The unique ID of the supplier.
    /// @return name Name of the supplier.
    /// @return sustainabilityScore Sustainability score of the supplier.
    /// @return description Description of the supplier's sustainability practices.
    function getSupplier(uint _supplierId) public view returns (string memory name, uint sustainabilityScore, string memory description) {
        Supplier memory supplier = suppliers[_supplierId];
        return (supplier.name, supplier.sustainabilityScore, supplier.description);
    }

    /// @notice Lists all registered suppliers.
    /// @return An array of supplier IDs.
    function listSuppliers() public view returns (uint[] memory) {
        uint[] memory ids = new uint[](suppliers.length);
        for (uint i = 0; i < suppliers.length; i++) {
            ids[i] = i;
        }
        return ids;
    }

    /// @notice Updates the sustainability score of a specific supplier.
    /// @dev Only the contract owner can update the sustainability score.
    /// @param _supplierId The unique ID of the supplier.
    /// @param _newScore The new sustainability score to be updated.
    function updateSustainabilityScore(uint _supplierId, uint _newScore, string memory _addedDescription) public {
        suppliers[_supplierId].sustainabilityScore = _newScore;
        suppliers[_supplierId].description = _addedDescription;
        emit SustainabilityScoreUpdated(_supplierId, _newScore, _addedDescription);
    }
}