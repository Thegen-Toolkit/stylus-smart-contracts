// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title Memos
 * @dev Memo struct
 */
struct Memo {
    uint256 numCoffees;
    string message;
    uint256 time;
    address userAddress;
}

/**
 * @title Subscribtion
 * @dev Contract to accept payments
 */
contract Subscribtion {
    address payable public owner;
    uint256 public price;
    Memo[] public memos;

    mapping(address => mapping(uint256 => uint256)) public fidToUserSubTimestamp;
    mapping(address => uint256) public userSubAmount;

    error InsufficientFunds(string message);
    error InvalidArguments(string message);
    error OnlyOwner();

    event BuyMeACoffeeEvent(address indexed buyer, uint256 price);
    event NewMemo(address indexed userAddress, uint256 time, uint256 numCoffees, string message);

    constructor() {
        owner = payable(msg.sender);
        price = 0.00004 ether;
    }

    /**
     * WRITE FUNCTIONS *************
     */

    function activateMonthSubscribtion(address to, uint256 fid) public payable  {
        fidToUserSubTimestamp[to][fid] = block.timestamp;

        if (msg.value < price) {
            revert InsufficientFunds("msg value too low");
        }

        userSubAmount[to] += 1;
    }

    function collectMointhSubscribtion(address payable to) public payable  {
        fidToUserSubTimestamp[to][fid] = block.timestamp;

        if (msg.sender != to) {
            revert InsufficientFunds("msg value too low");
        }

        to.transfer(userSubAmount[to] * price);

        userSubAmount[to] = 0;
    }

    /**
     * @dev Function to remove a memo
     * @param  index The index of the memo
     */
    function removeMemo(uint256 index) public {
        if (index >= memos.length) {
            revert InvalidArguments("Invalid index");
        }

        Memo memory memo = memos[index];

        if (memo.userAddress != msg.sender || msg.sender != owner) {
            revert InvalidArguments("Operation not allowed");
        }
        Memo memory indexMemo = memos[index];
        memos[index] = memos[memos.length - 1];
        memos[memos.length - 1] = indexMemo;
        memos.pop();
    }

    /**
     * @dev Function to modify a memo
     * @param  index The index of the memo
     * @param  message The message of the memo
     */
    function modifyMemoMessage(uint256 index, string memory message) public {
        if (index >= memos.length) {
            revert InvalidArguments("Invalid index");
        }

        Memo memory memo = memos[index];

        if (memo.userAddress != msg.sender || msg.sender != owner) {
            revert InvalidArguments("Operation not allowed");
        }

        memos[index].message = message;
    }

    /**
     * @dev Function to withdraw the balance
     */
    function withdrawTips() public {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }

        if (address(this).balance == 0) {
            revert InsufficientFunds("cant withdraw");
        }

        (bool sent,) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    /**
     * @dev Function to get the price of a coffee
     */
    function setPriceForCoffee(uint256 _price) public {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }

        price = _price;
    }

    /**
     * READ FUNCTIONS *************
     */

    /**
     * @dev Function to get the memos
     */
    function getMemos(uint256 index, uint256 size) public view returns (Memo[] memory) {
        if (memos.length == 0) {
            return memos;
        }

        if (index >= memos.length) {
            revert InvalidArguments("Invalid index");
        }

        if (size > 25) {
            revert InvalidArguments("size must be <= 25");
        }

        uint256 effectiveSize = size;
        if (index + size > memos.length) {
            // Adjust the size if it exceeds the array's bounds
            effectiveSize = memos.length - index;
        }

        Memo[] memory slice = new Memo[](effectiveSize);
        for (uint256 i = 0; i < effectiveSize; i++) {
            slice[i] = memos[index + i];
        }

        return slice;
    }

    /**
     * @dev Recieve function to accept ether
     */
    receive() external payable {}
}