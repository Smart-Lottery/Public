// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./interfaces/iToken.sol";

/** Contract that helps to sell CryptoLotteryTokens to any wallet */

contract CryptoLotteryTokenSale is Initializable, OwnableUpgradeable, PausableUpgradeable, ReentrancyGuardUpgradeable {
    iToken public token;
    uint256 public tokenPrice;

    event TokensPurchased(address buyer, uint256 amount);
    event TokensWithdrawn(address to, uint256 amount);
    event tokenAddressSet(address tokenAddress);
    event TokenPriceSet(uint256 newPrice);

    // Initialize the contract with token address
    function initialize(address _tokenAddress) public initializer {
        require(_tokenAddress != address(0), "Invalid token address");
        __Ownable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        token = iToken(_tokenAddress);
        emit tokenAddressSet(_tokenAddress);
    }

    // Set the token price
    function setTokenPrice(uint256 _tokenPrice) public onlyOwner {
        tokenPrice = _tokenPrice;
        emit TokenPriceSet(_tokenPrice);
    }

    // Add token balance to the contract
    function addTokenBalance(uint256 _amount) public onlyOwner {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }

    // Buy tokens with Ether
    function buyTokens(uint256 _amount) public payable whenNotPaused nonReentrant {
        require(tokenPrice > 0, "Token price not set");
        require(msg.value >= _amount * tokenPrice, "Insufficient payment");
        require(token.balanceOf(address(this)) >= _amount, "Insufficient tokens in the contract");
        require(_amount > 0, "Amount must be greater than zero");

        uint256 refund = msg.value - (_amount * tokenPrice);

        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        token.transfer(msg.sender, _amount);
        emit TokensPurchased(msg.sender, _amount);
    }

    // Withdraw tokens from the contract
    function withdrawTokens(uint256 _amount) public onlyOwner {
        require(token.balanceOf(address(this)) >= _amount, "Insufficient tokens in the contract");

        token.transfer(msg.sender, _amount);
        emit TokensWithdrawn(msg.sender, _amount);
    }

    // Withdraw Ether from the contract
    function withdrawEther() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    // Unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}
