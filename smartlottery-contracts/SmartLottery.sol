// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import standard contracts from openzeppelin
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//imports of the other contracts in CryptoLottery protocol
import "./Partners.sol";
import "./interfaces/iToken.sol";

//Main SmartLottery contract
contract SmartLottery is
    Initializable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable
{
    // Imported contracts  declarations
    Partners partnerContract;
    iToken token;

    //variables, structs and mappings for the contract

    //Storage gap for openzeppelin upgradable contract
    uint256[50] private __gap1;
    uint256[50] private __gap2;
    uint256[50] private __gap3;
    uint256[50] private __gap4;

    uint256 public round;
    uint256 public lastExecution;
    uint256 public interval;

    struct PlayerEntry {
        uint8[5] numbers;
        uint8 supernumber;
        bool entered;
    } // to store the entries for each round

    mapping(uint256 => mapping(address => PlayerEntry[])) public playerEntries; // to store the entries for each round
    mapping(uint256 => uint256) public entriesCount; // to store the number of entries for each round

    struct GeneratedNumbers {
        uint256 round;
        uint8[5] numbers;
        uint8 supernumber;
        uint256 executionTime;
    } // to store the generated numbers for each round

    mapping(uint256 => GeneratedNumbers) generatedNumbers; // to store the generated numbers for each round
    mapping(uint256 => uint256) public roundBalances; // to store the contract balance at the end of each round

    //mapping to store withdrawals info for the round (contains round number, address of the player and amount withdrawn)
    mapping(uint256 => mapping(address => uint256)) public withdrawalsInfo; // to store the withdrawals info for each round
    mapping(uint256 => uint256) roundBalancesWithdrawn; // to store the amount withdrawn from the contract balance for each round
    mapping(uint256 => mapping(address => mapping(uint8 => bool))) public withdrawnInfo; // to store if the address withdrawn already for each round and entry

    uint256 public EntryTicket; // to store the price of the entry ticket


    struct Winner {
        address wallet;
        uint256 amount;
    }

    Winner[10] public winners;

    //Function to initialize the contract
    function initialize(address _tokenAddress) public initializer {
        //require to enter valid address as _tokenAddress
        require(_tokenAddress != address(0), "Invalid address");
        round = 1;
        partnerContract = new Partners();
        __ReentrancyGuard_init();
        __Ownable_init();
        token = iToken(_tokenAddress);
    }

    //function to set interval
    function setInterval (uint256 _interval)
    public
    onlyOwner
    { 
        interval = _interval;
        lastExecution = block.timestamp;
    }

    /** Section to deal with Partners.sol contract 
    to record registrations made by partners 
    and check registrations for each round
    later to be used to distribute partner fees */

    //Function to initialize Partners contract
    function initializePartners() public {
        partnerContract.initialize();
    }

    //Function to recordPartnerRegistrations
    function recordPartnerRegistrations(
        address _partnerAddress,
        uint256 _round,
        address _playerAddress
    ) public onlyOwner {
        partnerContract.recordPartnerRegistrations(
            _partnerAddress,
            _round,
            _playerAddress
        );
    }

    //Function to get players that registered for each round for each partner
    function getPartnerRegistrations(address _partnerAddress, uint256 _round)
        public
        view
        returns (address[] memory)
    {
        return partnerContract.getPartnerRegistrations(_partnerAddress, _round);
    }

    /** Core logic of SmartLottery contract that allows to set parameters, 
    enter the lottery, withdraw prizes and fees 
    _______________________________________________________________________*/

    //Function to set the price of the entry ticket
    function setEntryTicket(uint256 _amount) public onlyOwner {
        EntryTicket = _amount;
    }

    //Function to enter the lottery
    function enter(
    uint256 _numberOfRounds,
    uint8[5] calldata _numbers,
    uint8 _supernumber,
    address _partnerAddress
) public payable {
    require(
        msg.value == EntryTicket * _numberOfRounds,
        "The entry fee is wrong"
    );

    for (uint8 i = 0; i < 5; i++) {
        require(
            _numbers[i] >= 1 && _numbers[i] <= 69,
            "Numbers must be between 1 and 69."
        );
    }
    require(
        _supernumber >= 1 && _supernumber <= 25,
        "Super number must be between 1 and 25."
    );

    uint256 currentRound;
    for (uint256 i = 0; i < _numberOfRounds; i++) {
        currentRound = round + i;
        PlayerEntry memory entry = PlayerEntry({
            numbers: _numbers,
            supernumber: _supernumber,
            entered: true
        });
        playerEntries[currentRound][msg.sender].push(entry);
        partnerContract.setAllowRecord(true);
        partnerContract.recordPartnerRegistrations(
            _partnerAddress,
            currentRound,
            msg.sender
        );
        partnerContract.setAllowRecord(false);
        entriesCount[currentRound]++;
    }
}


    // Function to generate the numbers for the round. Can be called only by the Owner
function generateNumbers() public {
    require((block.timestamp - lastExecution) > interval, "Too early to run the numbers");
    uint8[5] memory numbers;
    for (uint8 i; i < 5; i++) {
        numbers[i] =
            (uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.difficulty,
                            entriesCount[round],
                            i
                        )
                    )
                )
            ) % 68) +
            1;
        for (uint8 j; j < i; j++) {
            require(numbers[i] != numbers[j], "Numbers must be unique.");
        }
    }
    uint8 supernumber;
    supernumber =
        (uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        entriesCount[round]
                    )
                )
            )
        ) % 24) +
        1;

    lastExecution = block.timestamp;
    GeneratedNumbers memory generatedNumber;
    generatedNumber.round = round;
    generatedNumber.supernumber = supernumber;
    generatedNumber.executionTime = lastExecution;
    for (uint8 i; i < 5; i++) {
        generatedNumber.numbers[i] = numbers[i];
    }

    //DELETE THIS LINE - FOR TESTING PURPOSES ONLY!!!
    generatedNumber.numbers[0] = 1;

    generatedNumbers[round] = generatedNumber;
    roundBalances[round] = address(this).balance;
    round++;
}
    //Function to view generated numbers for the round
    function viewGeneratedNumbers(uint256 _round)
        public
        view
        returns (uint8[5] memory, uint8, uint256)
    {
        return (
            generatedNumbers[_round].numbers,
            generatedNumbers[_round].supernumber,
            generatedNumbers[_round].executionTime
        );
    }

    //function to view PlayerEntry struct for the round
    function viewPlayerEntry(
        uint256 _round,
        address _player,
        uint8 _entryIndex
    ) public view returns (PlayerEntry memory) {
        return playerEntries[_round][_player][_entryIndex];
    }

    //function to calculate how many numbers did the player guessed in the round. The function calculates only corretly guessed numbers and additionally reurns bool if the player gussed supernumber.
    function checkPlayerForRoundDetailed(address _player, uint256 _round, uint256 _entryIndex)
    public
    view
    returns (uint8, bool)
{
    require(
        _round > 0 && _round < round,
        "This round hasn't been played yet!"
    );
    require(
        _entryIndex < playerEntries[_round][_player].length,
        "Invalid entry index"
    );

    uint8 guessedNumbers = 0;
    bool guessedSupernumber = false;
    uint8[5] memory playerNumbers = playerEntries[_round][_player][_entryIndex].numbers;
    uint8 playerSupernumber = playerEntries[_round][_player][_entryIndex].supernumber;

    for (uint256 i = 0; i < 5; i++) {
        for (uint256 j = 0; j < 5; j++) {
            if (playerNumbers[i] == generatedNumbers[_round].numbers[j]) {
                guessedNumbers++;
            }
        }
    }
    if (playerSupernumber == generatedNumbers[_round].supernumber) {
        guessedSupernumber = true;
    }
    
    return (guessedNumbers, guessedSupernumber);
}

    //function to check how many entries does the player have for each round
    function checkPlayerEntriesCountForRound(address _player, uint256 _round)
        public
        view
        returns (uint256)
    {
        return playerEntries[_round][_player].length;
    }

    //function to withdraw a prize. If the player guessed 1 or more numbers, he can withdraw the smaller prize
    function withdrawPrize(uint256 _round, uint8 _entryIndex) public nonReentrant {
    require(
        withdrawnInfo[_round][msg.sender][_entryIndex] == false,
        "You already withdrawn your funds for this entry in this round"
    );

    uint8[5] memory playerNumbers;
    uint8 playerSupernumber;
    uint256 payoutAmount;

    for (uint256 i = 0; i < playerEntries[_round][msg.sender].length; i++) {
            playerNumbers = playerEntries[_round][msg.sender][i].numbers;
            playerSupernumber = playerEntries[_round][msg.sender][i]
                .supernumber;
        }

        uint256 guessedNumbers;
        bool guessedSupernumber;
        (guessedNumbers, guessedSupernumber) = checkPlayerForRoundDetailed(
            msg.sender,
            _round, 
        _entryIndex
        );
        
        //require that player guessed at least 1 numbers, otherwise the function will revert and gives and error message
        require(
            guessedNumbers >= 1 || guessedSupernumber == true,
            "You didn't guess any number in this round"
        );

        uint256 jackpot;

        if (guessedNumbers == 0 && guessedSupernumber == true) {
            payoutAmount = 20 * EntryTicket;
        } else if (guessedNumbers == 1 && guessedSupernumber == false) {
            payoutAmount = 5 * EntryTicket;
        } else if (guessedNumbers == 1 && guessedSupernumber == true) {
            payoutAmount = 40 * EntryTicket;
        } else if (guessedNumbers == 2 && guessedSupernumber == false) {
            payoutAmount = 30 * EntryTicket;
        } else if (guessedNumbers == 2 && guessedSupernumber == true) {
            payoutAmount = 200 * EntryTicket;
        } else if (guessedNumbers == 3 && guessedSupernumber == false) {
            payoutAmount = 150 * EntryTicket; 
        } else if (guessedNumbers == 3 && guessedSupernumber == true) {
            payoutAmount = 1000 * EntryTicket;
        } else if (guessedNumbers == 4 && guessedSupernumber == false) {
            payoutAmount = 10000 * EntryTicket;
        } else if (guessedNumbers == 4 && guessedSupernumber == true) {
            payoutAmount = 100000 * EntryTicket;
        } else if (guessedNumbers == 5 && guessedSupernumber == false) {
            payoutAmount = 2000000 * EntryTicket;
        } else if (guessedNumbers == 5 && guessedSupernumber == true) {
            payoutAmount = jackpot;
        }

        // if payoutAmount is bigger than the net balance of the respective round, then the payoutAmount is set to the balance of the round times 70%
        if (
            payoutAmount >
            (((roundBalances[_round] - roundBalancesWithdrawn[_round]) * 70) /
                100)
        ) {
            payoutAmount =
                ((roundBalances[_round] - roundBalancesWithdrawn[_round]) *
                    70) /
                100;
        }

    //record info in mappings withdrawalsInfo and roundBalancesWithdrawn
    withdrawnInfo[_round][msg.sender][_entryIndex] = true;
    withdrawalsInfo[_round][msg.sender] += payoutAmount;
    roundBalancesWithdrawn[_round] += payoutAmount;
    addWinner(msg.sender, payoutAmount);
    payable(msg.sender).transfer(payoutAmount);
}

    //Function that allows SmartLotteryToken holders to withdraw their portion of the fees for the round. The portion of the fees equals to 20% of the balance of the round multiplied by the share of the token holder in the total supply of the token. If the remaining balance is smaller than 20% of round balance, then the fees are calculated based on the remaining balance.
    function withdrawStakersFees(uint256 _round) public nonReentrant {
        require(
            token.balanceOf(msg.sender) > 0,
            "You don't have any tokens to withdraw fees."
        );
        require(
            withdrawnInfo[_round][msg.sender][100] == false,
            "You already withdrawn your funds for this round"
        );
        uint256 tokenBalance = token.balanceOf(msg.sender);
        uint256 totalSupply = token.totalSupply();
        uint256 fees;
        fees = (roundBalances[_round] * 15) / 100;
        uint256 payoutAmount;
        payoutAmount = (fees * tokenBalance) / totalSupply;
        if (
            payoutAmount >
            ((roundBalances[_round] - roundBalancesWithdrawn[_round]) * 15) /
                100
        ) {
            payoutAmount =
                ((roundBalances[_round] - roundBalancesWithdrawn[_round]) *
                    15) /
                100;
        }
        withdrawnInfo[_round][msg.sender][100] = true;
        payable(msg.sender).transfer(payoutAmount);
        withdrawalsInfo[_round][msg.sender] += payoutAmount;
    }

    //Function to withdraw Partner's fee (to be used for e.g. marketing)
    function withdrawPartnersFee(uint256 _round) public nonReentrant {
        require (_round < round, "You can withdraw only when the round has ended");
        require(
            withdrawnInfo[_round][msg.sender][101] == false,
            "You already withdrawn your funds for this round"
        );
        // uint remaining should be minumum of the two: 10% of the round balance and the remaining balance of the contract at the time of withdrawal
        uint256 fees = (entriesCount[_round] * EntryTicket * 15) / 100;
        uint256 numberOfRegistrationsThisRound;
        uint256 totalRegistrationsThisRound;
        uint256 payoutAmount;

        numberOfRegistrationsThisRound = partnerContract
            .getPartnerRegistrationsCount(msg.sender, _round);
        totalRegistrationsThisRound = entriesCount[_round];
        payoutAmount =
            (fees * numberOfRegistrationsThisRound) /
            totalRegistrationsThisRound;
        if (
            payoutAmount >
            ((roundBalances[_round] - roundBalancesWithdrawn[_round]) * 15) /
                100
        ) {
            payoutAmount =
                ((roundBalances[_round] - roundBalancesWithdrawn[_round]) *
                    15) /
                100;
        }
        withdrawnInfo[_round][msg.sender][101] = true;
        payable(msg.sender).transfer(payoutAmount);
        withdrawalsInfo[_round][msg.sender] += payoutAmount;
    }

    //Function to get the balance of the contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function addWinner(address _wallet, uint256 _amount) private {
        // Shift the elements in the winners array to make room for the new winner
        for (uint256 i = 0; i < winners.length - 1; i++) {
            winners[i] = winners[i + 1];
        }

        // Add the new winner to the last position in the array
        winners[winners.length - 1] = Winner(_wallet, _amount);
    }


}