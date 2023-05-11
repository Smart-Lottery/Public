// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//Interface with ERC20 token CryptoLotteryToken.sol contract to be used in CryptoLottery.sol contract and externally
interface iToken {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;
    function pause() external;
    function unpause() external;
    function snapshot() external;
    function getPriorVotes(address account, uint256 blockNumber) external view returns (uint256);
    function getCurrentVotes(address account) external view returns (uint256);
    function delegate(address delegatee) external;
    function delegates(address delegator) external view returns (address);
    function numCheckpoints(address account) external view returns (uint32);
    function getVotes(address account) external view returns (uint256);
    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);
    function getChainId() external view returns (uint256);
    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external view returns (bytes32);
    function nonces(address owner) external view returns (uint256);
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function DOMAIN_TYPEHASH() external view returns (bytes32);
    function DELEGATION_TYPEHASH() external view returns (bytes32);
    function transferWithAuthorization(address from, address to, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, bytes calldata signature) external;
    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
    function transferFromWithAuthorization(address sender, address recipient, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, bytes calldata signature) external;
    function increaseAllowanceWithAuthorization(address spender, uint256 addedValue, uint256 validAfter, uint256 validBefore, bytes32 nonce, bytes calldata signature) external;
    function decreaseAllowanceWithAuthorization(address spender, uint256 subtractedValue, uint256 validAfter, uint256 validBefore, bytes32 nonce, bytes calldata signature) external;
    function _mint(address account, uint256 amount) external;
    function _burn(address account, uint256 amount) external;
    function _approve(address owner, address spender, uint256 amount) external;
    function _moveDelegates(address srcRep, address dstRep, uint256 amount) external;
    function _setupDecimals(uint8 decimals_) external;
    function _beforeTokenTransfer(address from, address to, uint256 amount) external;
    function _afterTokenTransfer(address from, address to, uint256 amount) external;
    function _checkAuthorization(address owner, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, bytes calldata signature) external view returns (bool);
    function _authorizeUpgrade(address newImplementation) external;
}
