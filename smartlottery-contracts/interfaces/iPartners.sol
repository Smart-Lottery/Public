// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//interface to Partners.sol contract to be used externally
interface iPartners {
    function initialize() external;
    function recordPartnerRegistrations(address  _partnerAddress, uint256 _round, address _playerAddress) external;
    function getPartnerRegistrations(address  _partnerAddress, uint256 _round) external view returns (address[] memory);
    function getPartnerRegistrationsCount(address _partnerAddress, uint256 _round) external view returns (uint256);
}  