// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
	string public name;
	string public symbol = "FRT";
	uint256 public decimals = 18;
	//this represents the number of zeros, like btw wei and eth
	uint256 public totalSupply ;
	address public owner;
// we don't use decimals in smart contracts



//CREATE A 	MAP TO HOLD BALANCE
mapping(address=>uint256) public balanceOf;

constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
	// constructor function executed once as th contract is deployed.
	name= _name;
	symbol = _symbol;
	totalSupply = _totalSupply * (10**decimals);
	 balanceOf[msg.sender] = totalSupply;
	owner = msg.sender;
}
}




