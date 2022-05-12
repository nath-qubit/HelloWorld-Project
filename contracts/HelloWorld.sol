// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

interface HelloWorldInterface {
    function readText() external view returns (string memory returnedText);
    function setText(string calldata newText) external;
}

contract HelloWorld is HelloWorldInterface {
    string private text;
    address public owner;

    constructor() {
        text = "Hello, World!";
        owner = msg.sender;
    }

    function readText() public view override returns (string memory) {
        return text;
    }

    function setText(string calldata newText) public override onlyOwner {
        text = newText;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }    

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;       
    }

    function whoIsCalling() public view returns(address) {
        return msg.sender;
    }

    function isTheOwnerCalling() public view returns (bool) {
        return msg.sender == owner;
    }
}