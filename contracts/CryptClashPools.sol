// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title CryptClashPools
 * @dev FHE-Encrypted PvP Betting Platform
 * @notice This contract manages encrypted betting pools where bets remain encrypted until match completion
 */
contract CryptClashPools is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    // Events
    event PoolCreated(uint256 indexed poolId, address indexed creator, uint256 entryFee, uint256 maxParticipants);
    event PlayerJoined(uint256 indexed poolId, address indexed player, uint256 encryptedBet);
    event MatchStarted(uint256 indexed poolId, uint256 matchId);
    event MatchCompleted(uint256 indexed poolId, uint256 matchId, address indexed winner, uint256 prize);
    event BetRevealed(uint256 indexed poolId, address indexed player, uint256 betAmount);
    event PoolClosed(uint256 indexed poolId, address indexed winner, uint256 totalPrize);

    // Structs
    struct Pool {
        uint256 id;
        address creator;
        uint256 entryFee;
        uint256 maxParticipants;
        uint256 currentParticipants;
        bool isActive;
        bool isMatchStarted;
        uint256 totalPrize;
        uint256 createdAt;
        uint256 matchStartTime;
        address[] participants;
        mapping(address => uint256) encryptedBets;
        mapping(address => bool) hasRevealed;
    }

    struct Match {
        uint256 id;
        uint256 poolId;
        address[] players;
        uint256 startTime;
        uint256 endTime;
        bool isCompleted;
        address winner;
        uint256 prize;
    }

    // State variables
    Counters.Counter private _poolIds;
    Counters.Counter private _matchIds;
    
    mapping(uint256 => Pool) public pools;
    mapping(uint256 => Match) public matches;
    mapping(address => uint256[]) public playerPools;
    
    IERC20 public immutable token;
    uint256 public platformFee = 250; // 2.5% in basis points
    uint256 public constant BASIS_POINTS = 10000;
    
    // FHE-related constants
    uint256 public constant MIN_BET = 0.001 ether;
    uint256 public constant MAX_BET = 10 ether;
    uint256 public constant MATCH_DURATION = 300; // 5 minutes in seconds

    constructor(address _token) {
        token = IERC20(_token);
    }

    /**
     * @dev Create a new betting pool
     * @param _entryFee The entry fee for the pool
     * @param _maxParticipants Maximum number of participants
     */
    function createPool(
        uint256 _entryFee,
        uint256 _maxParticipants
    ) external nonReentrant returns (uint256) {
        require(_entryFee >= MIN_BET && _entryFee <= MAX_BET, "Invalid entry fee");
        require(_maxParticipants >= 2 && _maxParticipants <= 8, "Invalid max participants");

        _poolIds.increment();
        uint256 poolId = _poolIds.current();

        Pool storage pool = pools[poolId];
        pool.id = poolId;
        pool.creator = msg.sender;
        pool.entryFee = _entryFee;
        pool.maxParticipants = _maxParticipants;
        pool.isActive = true;
        pool.createdAt = block.timestamp;

        emit PoolCreated(poolId, msg.sender, _entryFee, _maxParticipants);
        return poolId;
    }

    /**
     * @dev Join a betting pool with encrypted bet
     * @param _poolId The pool ID to join
     * @param _encryptedBet The encrypted bet amount (FHE-encrypted)
     */
    function joinPool(
        uint256 _poolId,
        uint256 _encryptedBet
    ) external nonReentrant {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool not active");
        require(pool.currentParticipants < pool.maxParticipants, "Pool full");
        require(pool.encryptedBets[msg.sender] == 0, "Already joined");
        require(_encryptedBet > 0, "Invalid encrypted bet");

        // Transfer entry fee
        token.safeTransferFrom(msg.sender, address(this), pool.entryFee);
        
        // Add player to pool
        pool.participants.push(msg.sender);
        pool.encryptedBets[msg.sender] = _encryptedBet;
        pool.currentParticipants++;
        pool.totalPrize += pool.entryFee;
        
        playerPools[msg.sender].push(_poolId);

        emit PlayerJoined(_poolId, msg.sender, _encryptedBet);

        // Auto-start match if pool is full
        if (pool.currentParticipants == pool.maxParticipants) {
            _startMatch(_poolId);
        }
    }

    /**
     * @dev Start a match for a full pool
     * @param _poolId The pool ID to start match for
     */
    function _startMatch(uint256 _poolId) internal {
        Pool storage pool = pools[_poolId];
        require(pool.currentParticipants == pool.maxParticipants, "Pool not full");
        require(!pool.isMatchStarted, "Match already started");

        _matchIds.increment();
        uint256 matchId = _matchIds.current();

        Match storage match_ = matches[matchId];
        match_.id = matchId;
        match_.poolId = _poolId;
        match_.players = pool.participants;
        match_.startTime = block.timestamp;
        match_.endTime = block.timestamp + MATCH_DURATION;

        pool.isMatchStarted = true;
        pool.matchStartTime = block.timestamp;

        emit MatchStarted(_poolId, matchId);
    }

    /**
     * @dev Reveal a player's bet (called after match completion)
     * @param _poolId The pool ID
     * @param _betAmount The actual bet amount (decrypted)
     */
    function revealBet(
        uint256 _poolId,
        uint256 _betAmount
    ) external nonReentrant {
        Pool storage pool = pools[_poolId];
        require(pool.isMatchStarted, "Match not started");
        require(pool.encryptedBets[msg.sender] > 0, "Not a participant");
        require(!pool.hasRevealed[msg.sender], "Already revealed");
        require(_betAmount > 0, "Invalid bet amount");

        pool.hasRevealed[msg.sender] = true;
        
        emit BetRevealed(_poolId, msg.sender, _betAmount);
    }

    /**
     * @dev Complete a match and determine winner
     * @param _poolId The pool ID
     * @param _matchId The match ID
     * @param _winner The winner address
     */
    function completeMatch(
        uint256 _poolId,
        uint256 _matchId,
        address _winner
    ) external onlyOwner {
        Pool storage pool = pools[_poolId];
        Match storage match_ = matches[_matchId];
        
        require(pool.isMatchStarted, "Match not started");
        require(!match_.isCompleted, "Match already completed");
        require(block.timestamp >= match_.endTime, "Match not finished");
        require(pool.participants.length > 0, "No participants");

        // Verify winner is a participant
        bool isWinner = false;
        for (uint256 i = 0; i < pool.participants.length; i++) {
            if (pool.participants[i] == _winner) {
                isWinner = true;
                break;
            }
        }
        require(isWinner, "Winner not a participant");

        match_.isCompleted = true;
        match_.winner = _winner;
        match_.prize = pool.totalPrize;

        // Calculate platform fee
        uint256 fee = (pool.totalPrize * platformFee) / BASIS_POINTS;
        uint256 winnerPrize = pool.totalPrize - fee;

        // Transfer prize to winner
        token.safeTransfer(_winner, winnerPrize);
        
        // Transfer fee to platform
        if (fee > 0) {
            token.safeTransfer(owner(), fee);
        }

        // Close pool
        pool.isActive = false;

        emit MatchCompleted(_poolId, _matchId, _winner, winnerPrize);
        emit PoolClosed(_poolId, _winner, pool.totalPrize);
    }

    /**
     * @dev Emergency function to close a pool
     * @param _poolId The pool ID to close
     */
    function emergencyClosePool(uint256 _poolId) external onlyOwner {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool not active");

        pool.isActive = false;

        // Refund all participants
        for (uint256 i = 0; i < pool.participants.length; i++) {
            address participant = pool.participants[i];
            token.safeTransfer(participant, pool.entryFee);
        }

        emit PoolClosed(_poolId, address(0), 0);
    }

    /**
     * @dev Get pool information
     * @param _poolId The pool ID
     */
    function getPoolInfo(uint256 _poolId) external view returns (
        uint256 id,
        address creator,
        uint256 entryFee,
        uint256 maxParticipants,
        uint256 currentParticipants,
        bool isActive,
        bool isMatchStarted,
        uint256 totalPrize,
        uint256 createdAt,
        address[] memory participants
    ) {
        Pool storage pool = pools[_poolId];
        return (
            pool.id,
            pool.creator,
            pool.entryFee,
            pool.maxParticipants,
            pool.currentParticipants,
            pool.isActive,
            pool.isMatchStarted,
            pool.totalPrize,
            pool.createdAt,
            pool.participants
        );
    }

    /**
     * @dev Get match information
     * @param _matchId The match ID
     */
    function getMatchInfo(uint256 _matchId) external view returns (
        uint256 id,
        uint256 poolId,
        address[] memory players,
        uint256 startTime,
        uint256 endTime,
        bool isCompleted,
        address winner,
        uint256 prize
    ) {
        Match storage match_ = matches[_matchId];
        return (
            match_.id,
            match_.poolId,
            match_.players,
            match_.startTime,
            match_.endTime,
            match_.isCompleted,
            match_.winner,
            match_.prize
        );
    }

    /**
     * @dev Get player's pools
     * @param _player The player address
     */
    function getPlayerPools(address _player) external view returns (uint256[] memory) {
        return playerPools[_player];
    }

    /**
     * @dev Update platform fee
     * @param _newFee The new fee in basis points
     */
    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = _newFee;
    }

    /**
     * @dev Withdraw tokens (emergency only)
     * @param _amount The amount to withdraw
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        token.safeTransfer(owner(), _amount);
    }
}
