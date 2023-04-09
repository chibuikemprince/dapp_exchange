// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange{
address public feeAccount;
uint256 public feePercent;
uint256 public orderCount;
mapping(address=>mapping(address=>uint256)) public wallet;
mapping(uint256 => _Orders) public Order ;
mapping(uint256 => bool) public OrderCancelled ;
mapping(uint256 => bool) public OrderFilled ;

struct _Orders{
    uint256 id; // unique id for each order
    address user; // ser who performed the order transaction
    address tokenGet; // address of the token to receive
    uint256 amountGet; // amount to receive
    address tokenGive; // address of token to give
    uint256 amountGive; // amount to give
    uint256  timestamp; // when order was created
}




constructor(address _feeAccount, uint _feePercent){
feeAccount = _feeAccount;
feePercent = _feePercent;

}

event Deposit(address token, address user, uint256 amount, uint256 balance);
event Withdraw(address token, address user, uint256 amount, uint256 balance);
event OrdersEvent(
 uint256 id, // unique id for each order
    address user, // ser who performed the order transaction
    address tokenGet, // address of the token to receive
    uint256 amountGet, // amount to receive
    address tokenGive, // address of token to give
    uint256 amountGive, // amount to give
    uint256  timestamp // when order was created

);

event CancelOrdersEvent(
 uint256 id, // unique id for each order
    address user, // ser who performed the order transaction
    address tokenGet, // address of the token to receive
    uint256 amountGet, // amount to receive
    address tokenGive, // address of token to give
    uint256 amountGive, // amount to give
    uint256  timestamp // when order was created

);



event FillOrdersEvent(
 uint256 id, // unique id for each order
    address user, // ser who performed the order transaction
    address tokenGet, // address of the token to receive
    uint256 amountGet, // amount to receive
    address tokenGive, // address of token to give
    uint256 amountGive, // amount to give
    uint256  timestamp // when order was created

);

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


function withdraw(address token, uint256 _amount) 
public{
require(balanceOf(token, msg.sender)>= _amount, "Insufficient Ex Balance");
require(Token(token).transfer(msg.sender, _amount));

wallet[token][msg.sender] = wallet[token][msg.sender] -_amount;
 uint256 balance =  wallet[token][msg.sender];

emit Withdraw(token, msg.sender, _amount, balance);

}


/**

 */
function makeOrder(
    address tokenGet, 
    uint256 amountGet, 
    address tokenGive, 
    uint256 amountGive
    
    ) public {

        
require(balanceOf(tokenGive, msg.sender)>= amountGive, "Insufficient Ex Balance");
orderCount = orderCount+1;

Order[orderCount] = _Orders(
orderCount, 
msg.sender,
tokenGet,
amountGet,
tokenGive,
amountGive,
block.timestamp
);

emit OrdersEvent(
orderCount, 
msg.sender,
tokenGet,
amountGet,
tokenGive,
amountGive,
block.timestamp
);


}



function cancelOrder(uint256 _id) public {
     

_Orders storage _order = Order[_id];
 
require(_order.id>0 && _order.id >= orderCount,"Invalid Order");
require(_order.user==msg.sender,"Unauthorized access");

OrderCancelled[_id] = true;
// console.log("id: ", _order.id, "SignedUser: ", msg.sender);
// console.log( "Owner: ", _order.user );
emit CancelOrdersEvent(
_order.id, 
msg.sender,
_order.tokenGet,
_order.amountGet,
_order.tokenGive,
_order.amountGive,
block.timestamp
);
}



function fillOrder(uint256 _id) public {


_Orders storage _order = Order[_id];

uint256 feeAmount = (feePercent*_order.amountGet)/100;

/* 
console.log(feeAmount, " Sum ", _order.amountGet+feeAmount );
console.log(  " Balance ", _order.tokenGet,  " Balance " , balanceOf(_order.tokenGet, msg.sender) );
console.log(balanceOf(_order.tokenGet, msg.sender)>= (_order.amountGet+feeAmount), " feePercent ", feePercent);
 */
 // console.log("Cancelled: ",OrderCancelled[_order.id]) ;
//  console.log( "Filed: ",OrderFilled[_order.id], "ID: ", _order.id) ;
require(_order.id>0 && _order.id >= orderCount,"Invalid Order");
require(_order.user != msg.sender,"You cannot fill your order");
require(OrderCancelled[_order.id]==false, "Order Cancelled");
require(OrderFilled[_order.id]==false, "Order Filled");
require(balanceOf(_order.tokenGet, msg.sender)>= (_order.amountGet+feeAmount), "Insufficient Ex Balance for trade filler");
require(balanceOf(_order.tokenGive, _order.user)>= _order.amountGive, "Insufficient Ex Balance for trade owner");


wallet[_order.tokenGet][_order.user] = wallet[_order.tokenGet][_order.user] + _order.amountGet ;
wallet[_order.tokenGive][_order.user] = wallet[_order.tokenGive][_order.user] - _order.amountGive ;


wallet[_order.tokenGet][msg.sender] = wallet[_order.tokenGet][msg.sender]  - (_order.amountGet+feeAmount) ;
wallet[_order.tokenGive][msg.sender] = wallet[_order.tokenGive][msg.sender] + _order.amountGive ;

wallet[_order.tokenGet][feeAccount] = wallet[_order.tokenGet][feeAccount]  + (feeAmount) ;


OrderFilled[_order.id] = true;

emit FillOrdersEvent(
_order.id, 
msg.sender,
_order.tokenGive,
_order.amountGive,
_order.tokenGet,
_order.amountGet,
block.timestamp
);

}



}