const {ethers} = require("hardhat")
const {expect} = require("chai")


//convert eth to wei

const convertToWei = async (num)=>{
	num = num.toString();

	let eth = await ethers.utils.parseUnits(num,"ether")
	//console.log({num, eth})
return eth;
}


describe("Token Contract", async ()=>{

	let Token ;
	let token ;
	let accounts ;
	let receiver, receiver_account;
	let deployer ;
	let deployer_account ;
	let exchange ;
	let exchange_account, user_account, second_user_account ;
	let invalid_account, user, second_user;
beforeEach(async ()=>{
let name ="Fort";
let symbol = "FRT";
let totalSupply = 1000000;
		// fetch token from blockchain
		 Token = await ethers.getContractFactory("Token")
		//read token name
 token  = await Token.deploy(name,symbol, totalSupply);// the deploy method invokes the constructor ofthe contract, so the args of the constructor should be passed to deploy()
accounts = await ethers.getSigners();
receiver_account= accounts[1]
receiver = receiver_account.address;

deployer = accounts[0].address;
deployer_account =  accounts[0];
exchange_account =  accounts[2];
user_account =  accounts[3];
second_user_account =  accounts[4]; 

user  = user_account.address;
second_user  = user_account.address;
exchange =  exchange_account.address;
invalid_account = "0x0000000000000000000000000000000000000000";
 
})

//beforeEach is executed before each it()

describe("Deployment",()=>{
//each test block is initialized with it
	it("has a name",  async ()=>{





// check if all name is correct

let name = await token.name() 
		// check if name is correct


expect(name).to.equal("Fort")


	})


	it("has a symbol",  async ()=>{
		let symbol = await token.symbol() 
		 
		expect(symbol).to.equal("FRT")
			})

			it("has a decimal",  async ()=>{
				let decimals = await token.decimals() 
				 
				expect(decimals).to.equal(18)
					})
					it("has a million total supply",  async ()=>{
						let totalSupply = await token.totalSupply() 
						// console.log(totalSupply)
						expect(totalSupply).to.equal(1000000000000000000000000n)
							})
				})


			describe("wallet",()=>{
			
			
				it("has all eths assigned to first account in the hardhat node",  async ()=>{
					let balance = await token.balanceOf(deployer) 
					let totalSupply = await token.totalSupply() 
						 
					expect(balance).to.equal(totalSupply)
						})
				


							
						it("first account was used to deploy contract ",  async ()=>{
							let owner = await token.owner() 
								 
							expect(owner).to.equal(deployer) 
								})
			})

describe("Transfer", ()=>{
									 
describe("Success", ()=>{


	describe("sending tokens",()=>{
		let send_amount, events, base_bal, receiver_bal, deployer_bal, transaction, result  
	


beforeEach(async ()=>{

send_amount = await convertToWei(100);
base_bal = await token.balanceOf(deployer);

 transaction = await token.connect(deployer_account).transfer(receiver,send_amount);
  result = await transaction.wait();
 receiver_bal = await token.balanceOf(receiver)
 //console.log({receiver_bal});
 deployer_bal = await token.balanceOf(deployer)
  events = result.events;



})

		   it("transfer token balance ",  async ()=>{
			   
			   
			   
				expect(receiver_bal).to.equal(await convertToWei(100)) 
				expect(deployer_bal).to.equal(await convertToWei(999900)) 
				   //expect(receiver_bal).to.equal(expected_balance) 
				   })

				   it("Is event emitted", ()=>{
					   let transferEvt = events[0];
					   let args = transferEvt.args;
					   expect(transferEvt.event).to.equal("Transfer"); 
					   expect(args._from).to.equal(deployer); 
					   expect(args._to).to.equal(receiver); 
					   expect(args._value).to.equal(send_amount); 
						//console.log({result, events:result.events[0]} )
				   })


})
		   


})



describe("Failure", ()=>{

	
	it("Reject Insufficient Balances: ", async ()=>{
	let invalid_amount = convertToWei(10000000);

	//let transfer = await token.connect(deployer_account).transfer(receiver, invalid_amount);
//console.log(deployer.length);
await expect(token.connect(deployer_account).transfer(receiver, invalid_amount)).to.be.reverted;
	
	})


	it("Reject Zero address: ", async ()=>{
		let invalid_amount = convertToWei(10000000);
	
	await expect(token.connect(deployer_account).transfer(invalid_account, invalid_amount)).to.be.reverted;
		
		})

})

})


describe("Approve", ()=>{

let amount, approve, approvedResult, allowedEvents; 

describe("Success", ()=>{
	beforeEach(async ()=>{
		amount = await convertToWei(200);
	approve = await token.connect(deployer_account).approve(exchange, amount);
	approvedResult = await approve.wait(); 
	
	allowedEvents = approvedResult.events[0];
	
	})
	it("check if approved", async ()=>{
		//console.log({exchange, amount})
let allowed = await token.allowance(deployer, exchange);

expect(allowed).to.equal(amount);
	})



it("check approved event ", async ()=>{
	 let allowedEventsName = allowedEvents.event;
	 let args = allowedEvents.args;
	    
	expect(allowedEventsName).to.equal("Approval");
	expect(args.spender).to.equal(exchange);
	expect(args.owner).to.equal(deployer);
	expect(args.value).to.equal(amount);
		})
})


describe("Failure", ()=>{
	
	it("Don't approve zero address", async ()=>{
		amount = await convertToWei(200);
	 


await expect(token.connect(deployer_account).approve(invalid_account, amount)).to.be.reverted;
	})
  
})

	})

 


	describe("Transfer From ", ()=>{

		let amount, amount_to_transfer_eth, amount_to_transfer, approve, Allow_amount, balance_user, balance_second_user, approvedResult, allowedEvents, transfer_from, transfer_from_result; 
		
		describe("Success", ()=>{
			beforeEach(async ()=>{
				amount =200;
				 Allow_amount = await convertToWei(amount);

				 amount_to_transfer_eth = 50;
				 amount_to_transfer = await convertToWei(amount_to_transfer_eth);
				

			approve = await token.connect(receiver_account).approve(exchange, Allow_amount);
			approvedResult = await approve.wait(); 
			
			allowedEvents = approvedResult.events[0];
			
			// transfer money to reciever for test
			await token.connect(deployer_account).transfer(receiver,Allow_amount);
  
			balance_user = await token.balanceOf(receiver)
		 balance_second_user = await token.balanceOf(second_user)

		// console.log({state:"Before", balance_user, balance_second_user})
		
		})



			it("transfer from works on approved address", async ()=>{
				 
				transfer_from = await token.connect(exchange_account).transferFrom(receiver, second_user, amount_to_transfer);
				
				transfer_from_result = await transfer_from.wait()

		 balance_user = await token.balanceOf(receiver)
		 balance_second_user = await token.balanceOf(second_user)

		let expected_user_bal = await convertToWei(amount - amount_to_transfer_eth);
		//let expected_second_user_bal = await convertToWei(amount_to_transfer);
 
		expect(balance_user).to.equal(expected_user_bal);
		expect(balance_second_user).to.equal(amount_to_transfer);
		 
			})
		
		 
		
		it("check if event was fired after transfer from ", async ()=>{
			transfer_from = await token.connect(exchange_account).transferFrom(receiver, second_user, amount_to_transfer);
				
				transfer_from_result = await transfer_from.wait()
				 
			 let allowedEventsName = transfer_from_result.events[0];
			 let args = transfer_from_result.events[0].args;
				 
			expect(allowedEventsName.event).to.equal("Transfer");
			expect(args._from).to.equal(receiver);
			expect(args._to).to.equal(second_user);
			expect(args._value).to.equal(amount_to_transfer);
				}) 
		})
		
		 
		describe("Failure", ()=>{
			beforeEach(async ()=>{
				amount =200;
				 Allow_amount = await convertToWei(amount);

				 amount_to_transfer_eth = 50;
				 amount_to_transfer = await convertToWei(amount_to_transfer_eth);
				

			approve = await token.connect(receiver_account).approve(exchange, Allow_amount);
			approvedResult = await approve.wait(); 
			
			allowedEvents = approvedResult.events[0];
			
			// transfer money to reciever for test
			await token.connect(deployer_account).transfer(receiver,Allow_amount);
  
			balance_user = await token.balanceOf(receiver)
		 balance_second_user = await token.balanceOf(second_user)

		// console.log({state:"Before", balance_user, balance_second_user})
		
		})



			it("transfer should not work on unapproved address", async ()=>{
				  
 
		await expect( token.connect(exchange_account).transferFrom(user, second_user, amount_to_transfer)).to.be.reverted
		 
			})
		
		 
			it("transfer should not  work on approved address with amount not matching allowed amount or remaining allowed balance", async ()=>{
				  let invalid_amount_to_transfer = await convertToWei(201);
 
				await expect( token.connect(exchange_account).transferFrom(receiver, second_user, invalid_amount_to_transfer)).to.be.reverted
				 
					})

 
		  
		})
		

			})
		

})