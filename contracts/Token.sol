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
mapping(address=>mapping(address=>uint256)) public allowance;

 
event Transfer(
address indexed _from,
address indexed _to,
uint256 _value

);

event Approval(
	address indexed owner, 
	address indexed spender, 
	uint256 value
	);

constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
	// constructor function executed once as th contract is deployed.
	name= _name;
	symbol = _symbol;
	totalSupply = _totalSupply * (10**decimals);
	 balanceOf[msg.sender] = totalSupply;
	owner = msg.sender;
}

function approve(address _spender, uint256 _value) 
public 
returns (bool success){

// ensure that address is not zero address like 0x0000000000
require(_spender != address(0), "Zero address is not allowed");

uint256 current_val = allowance[msg.sender][_spender];
if(current_val !=0){
	 _value = 0;
}
 
allowance[msg.sender][_spender] = _value;
	emit Approval(msg.sender, _spender, _value);
	return true;
}

/* 
function allowance(address _owner, address _spender) 
public 
view 
returns (uint256 remaining){

}

 */

 
function transfer(address _to, uint256 _value) 
	public
	returns(bool)
{
//require that sender has enough token to send
require(balanceOf[msg.sender]  >= _value, "Insufficient Balance.");
// require takes a boolean expression which must evaluate to true before it continues to the next line

_transfer( msg.sender,  _to,  _value) ;
return true;
}


function transferFrom(address _from,
 address _to, 
 uint256 _value
 )
public 
returns (bool success)
{
	//console.log (_from , _to, _value);
require(allowance[_from][msg.sender] >= _value, "You are not permitted to access this account.");	
require(balanceOf[_from]  >= _value, "Insufficient Balance.");

allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;

_transfer( _from,  _to,  _value) ;

return true;

}

function _transfer(address _from, address _to, uint256 _value) 
internal returns(bool success){

// ensure that address is not zero address like 0x0000000000
require(_to != address(0), "Zero address is not allowed.");


//deduct from spender
balanceOf[_from] = balanceOf[_from] - _value;
// credit receiver
balanceOf[_to] = balanceOf[_to] + _value;
//emit events

emit Transfer(_from, _to, _value);
return true;

}

}




