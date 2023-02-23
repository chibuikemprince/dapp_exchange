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
	let receiver;
	let deployer ;
	let deployer_account ;
beforeEach(async ()=>{
let name ="Fort";
let symbol = "FRT";
let totalSupply = 1000000;
		// fetch token from blockchain
		 Token = await ethers.getContractFactory("Token")
		//read token name
 token  = await Token.deploy(name,symbol, totalSupply);// the deploy method invokes the constructor ofthe contract, so the args of the constructor should be passed to deploy()
accounts = await ethers.getSigners();
receiver = accounts[1].address;
deployer = accounts[0].address;
deployer_account =  accounts[0];

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

								 
describe("Success", ()=>{


	describe("sending tokens",()=>{
		let send_amount, events, base_bal, receiver_bal, deployer_bal, transaction, result  
	


beforeEach(async ()=>{

send_amount = await convertToWei(100);
base_bal = await token.balanceOf(deployer);

 transaction = await token.connect(deployer_account).transfer(receiver,send_amount);
  result = await transaction.wait();
 receiver_bal = await token.balanceOf(receiver)
 deployer_bal = await token.balanceOf(deployer)
  events = result.events;



})

		   it("transfer token balance ",  async ()=>{
			   
			   /* console.log("Before: ",{
				   sender: await token.balanceOf(deployer),
				   receiver: await token.balanceOf(receiver),
				   send_amount
			   }) */

			   
		   //	let expected_balance = `${base_bal-send_amount}n`;
			   
				// wait() will cause the transaction  
				
		   /* 	console.log("After: ",{
				   sender: deployer_bal,
				   receiver: receiver_bal,
				   expected_balance
			   }) */
			   
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
	
	await expect(token.connect(deployer_account).transfer("0x0000000000000000000000000000000000000000", invalid_amount)).to.be.reverted;
		
		})

})



})