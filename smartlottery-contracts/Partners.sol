// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Partners is Initializable, ReentrancyGuardUpgradeable, PausableUpgradeable, OwnableUpgradeable { 
    function initialize() initializer public {
        __ReentrancyGuard_init();
        __Pausable_init();
        __Ownable_init();
    }

    bool private allowRecord;

    modifier onlyEnter() {
        require(allowRecord, "Only callable from the enter function");
    _;
}

    mapping (address => mapping (uint256 => address[])) public partnerRegistrations; // mapping to store how many entries did affiliate bring for every round of the lottery

    //function to record how many entries did partner bring for every round of the lottery
    function recordPartnerRegistrations(address _partnerAddress, uint256 _round, address _playerAddress) public onlyEnter {
        partnerRegistrations[_partnerAddress][_round].push(_playerAddress);
    }

    //function to get the list of entries partner brought for every round of the lottery
    function getPartnerRegistrations(address _partnerAddress, uint256 _round) public view returns (address[] memory) {
        return partnerRegistrations[_partnerAddress][_round];
    }

    //function to get the number of registrations that parnter brought for every round of the lottery
    function getPartnerRegistrationsCount(address _partnerAddress, uint256 _round) public view returns (uint256) {
        return partnerRegistrations[_partnerAddress][_round].length;
    }

    //Function to pause the contract using openzeppelin's Pausable contract
    function pause() public onlyOwner {
        _pause();
    }

    //Function to unpause the contract using openzeppelin's Pausable contract
    function unpause() public onlyOwner {
        _unpause();
    }

    function setAllowRecord(bool _allow) external onlyOwner {
    allowRecord = _allow;
}

}