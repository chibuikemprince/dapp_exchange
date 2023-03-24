// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange{
address public feeAccount;
uint256 public feePercent;

mapping(address=>mapping(address=>uint256)) public wallet;
constructor(address _feeAccount, uint _feePercent){
feeAccount = _feeAccount;
feePercent = _feePercent;

}

event Deposit(address token, address user, uint256 amount, uint256 balance);

function depositToken(address _token, uint256 _amount) public{
    //transfer token to exchange
    require(Token(_token).transferFrom(msg.sender,address(this),_amount));
    // update balance
    wallet[_token][msg.sender]= wallet[_token][msg.sender] + _amount;
    // emit 
    uint256 balance =  wallet[_token][msg.sender];

emit Deposit(_token, msg.sender, _amount, balance);


}



function balanceOf(address _token, address _user) 
public view returns(uint256 bal)
{
return wallet[_token][_user];
}




}