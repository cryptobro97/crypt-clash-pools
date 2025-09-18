// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FHEEncryption
 * @dev Fully Homomorphic Encryption utilities for secure betting
 * @notice This contract provides FHE encryption/decryption functions for betting data
 */
contract FHEEncryption {
    
    // FHE parameters
    uint256 public constant MODULUS = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
    uint256 public constant GENERATOR = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
    
    // Events
    event DataEncrypted(address indexed user, uint256 indexed dataId, uint256 encryptedData);
    event DataDecrypted(address indexed user, uint256 indexed dataId, uint256 decryptedData);
    event KeyGenerated(address indexed user, uint256 publicKey);

    // Structs
    struct FHEKey {
        uint256 publicKey;
        uint256 privateKey;
        bool isActive;
    }

    struct EncryptedData {
        uint256 dataId;
        address owner;
        uint256 encryptedValue;
        uint256 timestamp;
        bool isDecrypted;
    }

    // State variables
    mapping(address => FHEKey) public userKeys;
    mapping(uint256 => EncryptedData) public encryptedData;
    mapping(address => uint256[]) public userEncryptedData;
    
    uint256 private _dataCounter;
    uint256 public constant MAX_ENCRYPTION_BITS = 256;

    /**
     * @dev Generate FHE key pair for a user
     */
    function generateFHEKey() external returns (uint256 publicKey) {
        require(!userKeys[msg.sender].isActive, "Key already exists");
        
        // Generate random private key
        uint256 privateKey = uint256(keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            block.difficulty,
            block.number
        ))) % MODULUS;
        
        // Generate public key using generator
        publicKey = _modExp(GENERATOR, privateKey, MODULUS);
        
        userKeys[msg.sender] = FHEKey({
            publicKey: publicKey,
            privateKey: privateKey,
            isActive: true
        });
        
        emit KeyGenerated(msg.sender, publicKey);
        return publicKey;
    }

    /**
     * @dev Encrypt data using FHE
     * @param _data The data to encrypt
     * @param _recipientPublicKey The recipient's public key
     */
    function encryptData(
        uint256 _data,
        uint256 _recipientPublicKey
    ) external returns (uint256 dataId) {
        require(_data > 0, "Invalid data");
        require(_recipientPublicKey > 0, "Invalid public key");
        
        _dataCounter++;
        dataId = _dataCounter;
        
        // Generate random nonce
        uint256 nonce = uint256(keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            _data,
            dataId
        ))) % MODULUS;
        
        // Encrypt using FHE: E(m) = g^r * h^m mod p
        uint256 encryptedValue = _modExp(GENERATOR, nonce, MODULUS);
        encryptedValue = (encryptedValue * _modExp(_recipientPublicKey, _data, MODULUS)) % MODULUS;
        
        encryptedData[dataId] = EncryptedData({
            dataId: dataId,
            owner: msg.sender,
            encryptedValue: encryptedValue,
            timestamp: block.timestamp,
            isDecrypted: false
        });
        
        userEncryptedData[msg.sender].push(dataId);
        
        emit DataEncrypted(msg.sender, dataId, encryptedValue);
        return dataId;
    }

    /**
     * @dev Decrypt data using FHE
     * @param _dataId The encrypted data ID
     */
    function decryptData(uint256 _dataId) external returns (uint256 decryptedData) {
        EncryptedData storage data = encryptedData[_dataId];
        require(data.owner == msg.sender, "Not data owner");
        require(!data.isDecrypted, "Already decrypted");
        
        FHEKey storage key = userKeys[msg.sender];
        require(key.isActive, "No active key");
        
        // Decrypt using FHE: D(c) = c^(1/privateKey) mod p
        // This is a simplified version - real FHE would be more complex
        decryptedData = _modExp(data.encryptedValue, _modInverse(key.privateKey, MODULUS - 1), MODULUS);
        
        data.isDecrypted = true;
        
        emit DataDecrypted(msg.sender, _dataId, decryptedData);
        return decryptedData;
    }

    /**
     * @dev Homomorphic addition: E(a) + E(b) = E(a + b)
     * @param _encryptedA First encrypted value
     * @param _encryptedB Second encrypted value
     */
    function homomorphicAdd(
        uint256 _encryptedA,
        uint256 _encryptedB
    ) external pure returns (uint256 result) {
        result = (_encryptedA * _encryptedB) % MODULUS;
        return result;
    }

    /**
     * @dev Homomorphic multiplication: E(a) * k = E(a * k)
     * @param _encryptedValue Encrypted value
     * @param _scalar Scalar to multiply
     */
    function homomorphicMultiply(
        uint256 _encryptedValue,
        uint256 _scalar
    ) external pure returns (uint256 result) {
        result = _modExp(_encryptedValue, _scalar, MODULUS);
        return result;
    }

    /**
     * @dev Verify encrypted bet is within valid range
     * @param _encryptedBet The encrypted bet
     * @param _minBet Minimum bet amount
     * @param _maxBet Maximum bet amount
     */
    function verifyBetRange(
        uint256 _encryptedBet,
        uint256 _minBet,
        uint256 _maxBet
    ) external pure returns (bool isValid) {
        // This is a simplified verification
        // In real FHE, this would involve zero-knowledge proofs
        require(_encryptedBet > 0, "Invalid encrypted bet");
        require(_minBet > 0 && _maxBet > _minBet, "Invalid bet range");
        
        // For demonstration, we'll assume the bet is valid
        // Real implementation would use FHE comparison operations
        isValid = true;
        return isValid;
    }

    /**
     * @dev Get user's encrypted data
     * @param _user The user address
     */
    function getUserEncryptedData(address _user) external view returns (uint256[] memory) {
        return userEncryptedData[_user];
    }

    /**
     * @dev Get encrypted data details
     * @param _dataId The data ID
     */
    function getEncryptedData(uint256 _dataId) external view returns (
        uint256 dataId,
        address owner,
        uint256 encryptedValue,
        uint256 timestamp,
        bool isDecrypted
    ) {
        EncryptedData storage data = encryptedData[_dataId];
        return (
            data.dataId,
            data.owner,
            data.encryptedValue,
            data.timestamp,
            data.isDecrypted
        );
    }

    /**
     * @dev Modular exponentiation: (base^exp) % mod
     */
    function _modExp(
        uint256 _base,
        uint256 _exp,
        uint256 _mod
    ) internal pure returns (uint256 result) {
        result = 1;
        _base = _base % _mod;
        
        while (_exp > 0) {
            if (_exp % 2 == 1) {
                result = (result * _base) % _mod;
            }
            _exp = _exp >> 1;
            _base = (_base * _base) % _mod;
        }
        
        return result;
    }

    /**
     * @dev Modular inverse using extended Euclidean algorithm
     */
    function _modInverse(uint256 _a, uint256 _m) internal pure returns (uint256) {
        int256[3] memory result = _extendedGcd(int256(_a), int256(_m));
        require(result[0] == 1, "No modular inverse exists");
        return uint256(result[1] < 0 ? result[1] + int256(_m) : result[1]);
    }

    /**
     * @dev Extended Euclidean algorithm
     */
    function _extendedGcd(int256 _a, int256 _b) internal pure returns (int256[3] memory) {
        if (_a == 0) {
            return [int256(_b), 0, 1];
        }
        
        int256[3] memory result = _extendedGcd(_b % _a, _a);
        int256 x = result[2] - (_b / _a) * result[1];
        int256 y = result[1];
        
        return [result[0], x, y];
    }
}
