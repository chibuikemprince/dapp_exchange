const {ethers} = require("hardhat")
const {expect} = require("chai")


//convert eth to wei

const convertToWei = async (num)=>{
	num = num.toString();

	let eth = await ethers.utils.parseUnits(num,"ether")
	//console.log({num, eth})
return eth;
}


describe("Exchange", async ()=>{

	let Exchange, feePercent ;
	let exchange ;
	let accounts ;
	let feeAccount, feeAccount_account;
	let deployer ;
	let deployer_account ;
	let user1_account ;
	let user1  ;
	
	let user2_account ;
	let user2  ;
	let token1, token2; 
	let depositAmount ;
	 let transaction , result;
beforeEach(async ()=>{
 
	// fetch exchange from blockchain
	 Exchange = await ethers.getContractFactory("Exchange")
	
	 accounts = await ethers.getSigners();
	 feePercent = 10;
feeAccount_account= accounts[1]
feeAccount = feeAccount_account.address;

deployer = accounts[0].address;
deployer_account =  accounts[0];



let Token = await ethers.getContractFactory("Token")
	
  token1  = await Token.deploy("Dapp University", "DAPP", 1000000);
  token2  = await Token.deploy("Softzenith", "SZ", 1000000);



  user1_account= accounts[2]
  user1 = user1_account.address;

  user2_account= accounts[3]
  user2 = user2_account.address;



exchange  = await Exchange.deploy(feeAccount,feePercent);



})
//beforeEach is executed before each it()

describe("Deployment",()=>{
//each test block is initialized with it
	

	it("has a fee account",  async ()=>{

 
let DeployedfeeAccount = await exchange.feeAccount() 
		// check if name is correct


expect(DeployedfeeAccount).to.equal(feeAccount)


	})

	it("has a name fee percent",  async ()=>{

 
		let DeployedfeePercent = await exchange.feePercent() 
				// check if name is correct
		
		
		expect(DeployedfeePercent).to.equal(feePercent)
		
		
			})

	
				}) 




				
describe("Depositing tokens",()=>{ 
	let ex_bal, user_bal; 
	


describe("Success",()=>{ 

	
	beforeEach(async ()=>{
		depositAmount   = await convertToWei(140);
		token1.connect(user1_account).approve(exchange.address, depositAmount)
		token1.connect(deployer_account).transfer(user1, await convertToWei(200))
	 
			ex_bal = await token1.balanceOf(exchange.address) 
		   user_bal = await token1.balanceOf(user1) 
		 
		 
		 
		 transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
	 
	 result = await transaction.wait()
		 })
	 

it("Tracks the token deposit", async()=>{
	 // expect(await token1.balanceOf(exchange_address)).to
	
	
	 ex_bal = await token1.balanceOf(exchange.address) 
	 user_bal = await token1.balanceOf(user1) 
   let user_ex_bal = await exchange.wallet(token1.address, user1) 
 // the wallet method here queries the wallet mapping of the exchange
 
   //  let user_ex_bal = await exchange.balanceOf(token1.address, user1) 
  
	/*  console.log({
		ex_bal,
		user_bal,
		user: user1,
		user_ex_bal,
		ex: exchange.address,
		depositAmount
	})  */
	 expect(ex_bal).to.equal(depositAmount)
	 expect(user_ex_bal).to.equal(depositAmount)



	})

	it("Emits Deposit Event", async()=>{
		// expect(await token1.balanceOf(exchange_address)).to
	   let depositEvent = result.events[1].args;

	   let depositedToken = depositEvent.token;
	   let depositor = depositEvent.user;
	   let depositedAmount = depositEvent.amount;
	   let depositorBalance= depositEvent.balance;
	   
		/*  console.log({
			depositedToken,
			depositor,
			depositedAmount,
			depositorBalance 
		 }) */
		expect(depositedToken).to.equal(token1.address)
		expect(depositor).to.equal(user1)
		 expect(depositedAmount).to.equal(depositAmount)
		 expect(depositorBalance).to.equal(depositAmount)
   
   
   
	   })
   

})
	 
	
describe("Failure", async ()=>{ 
	let user_ex_bal = await exchange.balanceOf(token1.address, user1) 
  
/* 	console.log({
	     
	   user_ex_bal 
   }) 
	 */
	beforeEach(async ()=>{
		depositAmount   = await convertToWei(140);
		 
		 
		 })
	  
	it("Can't transfer if not approved.", async()=>{
		// expect(await token1.balanceOf(exchange_address)).to
	  
		await expect(exchange.connect(user1_account).depositToken(token1.address,depositAmount) ).to.be.reverted;

	 
   
   
	   })
   

})
	 
	
	
		
					}) 

















				


				
										describe("Withdrawing tokens",()=>{ 
											let ex_bal, user_bal; 
											
										
										
										describe("Success",()=>{ 
										
											
											beforeEach(async ()=>{
												depositAmount   = await convertToWei(140);
												token1.connect(user1_account).approve(exchange.address, depositAmount)
												token1.connect(deployer_account).transfer(user1, await convertToWei(200))
											 
													ex_bal = await token1.balanceOf(exchange.address) 
												   user_bal = await token1.balanceOf(user1) 
												 
											 
												 transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
											 
					
											 // withdraw 
											 transaction = await exchange.connect(user1_account).withdraw(token1.address,depositAmount)
											 
											 result = await transaction.wait()
					
					
												 })
											 
										
										it("Withdraw success", async()=>{
											 // expect(await token1.balanceOf(exchange_address)).to
											
											
											 ex_bal = await token1.balanceOf(exchange.address) 
											 user_bal = await token1.balanceOf(user1) 
										  // let user_ex_bal = await exchange.wallet(token1.address, user1) 
										 // the wallet method here queries the wallet mapping of the exchange
										 
											let user_ex_bal = await exchange.balanceOf(token1.address, user1) 
										 /*  
											 console.log({
												ex_bal,
												user_bal,
												user: user1,
												user_ex_bal,
												ex: exchange.address,
												depositAmount
											})  */
											 expect(ex_bal).to.equal(0)
											 expect(user_ex_bal).to.equal(0)
											 
										
										
											})
										 
											it("Emits Withdraw Event", async()=>{
												// expect(await token1.balanceOf(exchange_address)).to
											   let depositEvent = result.events[1].args;
										
											   let withdrawnToken = depositEvent.token;
											   let withdrawer = depositEvent.user;
											   let withdrawnAmount = depositEvent.amount;
											   let withdrawerBalance= depositEvent.balance;
											   
												/*  console.log({
													withdrawnToken,
													withdrawer,
													withdrawnAmount,
													withdrawerBalance 
												 }) */
												expect(withdrawnToken).to.equal(token1.address)
												expect(withdrawer).to.equal(user1)
												 expect(withdrawnAmount).to.equal(depositAmount)
												 expect(withdrawerBalance).to.equal(0)
										   
										   
										   
											   })
					
					
										})
											 
												
										describe("Failure",()=>{ 
										
											
											beforeEach(async ()=>{
												depositAmount   = await convertToWei(140);
												token1.connect(user1_account).approve(exchange.address, depositAmount)
												token1.connect(deployer_account).transfer(user1, await convertToWei(200))
											 
													ex_bal = await token1.balanceOf(exchange.address) 
												   user_bal = await token1.balanceOf(user1) 
											 
											 // withdraw 
											 
					
												 })
											 
										
										it("Insufficient balance", async()=>{
											  
											await expect( exchange.connect(user1_account).withdraw(token1.address,await convertToWei(200))).to.be.reverted;
					
						 
											 
										
										
											})
										 
										 
					
					
										})	      
											
											
												
															}) 


					describe("Order Management",()=>{ 
						let ex_bal, user_bal; 
						
					
					
					describe("Success",()=>{ 
					
						
						beforeEach(async ()=>{
							depositAmount   = await convertToWei(140);
							token1.connect(user1_account).approve(exchange.address, depositAmount)
							token1.connect(deployer_account).transfer(user1, await convertToWei(200))
						 
								ex_bal = await token1.balanceOf(exchange.address) 
							   user_bal = await token1.balanceOf(user1) 
							 
						 
							 transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
						 

						 
						 transaction = await exchange.connect(user1_account).makeOrder(token2.address,depositAmount,token1.address, depositAmount)
						 
						 result = await transaction.wait()


							 })
						 
					
					it("Create Order success", async()=>{
					/*   */

						 let count = await exchange.orderCount();
						 //console.log({count})
						 expect( count).to.equal(1)
						  
					 
						})
					 
						it("Emit Order events", async()=>{
						 
							let depositEvent = result.events[0].args;
										
											   let tokenGet = depositEvent.tokenGet;
											   let tokenGive = depositEvent.tokenGive;
											   let amountGive = depositEvent.amountGive;
											   let amountGet = depositEvent.amountGet;
											   let myuser = depositEvent.user;
											   let orderCount = depositEvent.id;
											   let timestamp = depositEvent.timestamp;
											   
 

await expect(myuser).to.equal(user1)
await expect(orderCount).to.equal(1)

await expect(amountGive).to.equal(depositAmount)
							await expect(amountGet).to.equal(depositAmount)
							await expect(tokenGive).to.equal(token1.address)
							await expect(tokenGet).to.equal(token2.address)
							  
						 
							})


					}) 





					describe("Failure",()=>{ 
					
						
						beforeEach(async ()=>{
							depositAmount   = await convertToWei(140);
							token1.connect(user1_account).approve(exchange.address, depositAmount)
							token1.connect(deployer_account).transfer(user1, await convertToWei(200))
						 
								ex_bal = await token1.balanceOf(exchange.address) 
							   user_bal = await token1.balanceOf(user1) 
							 
						 
							 transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
						 

						 // withdraw 
						
						 
						 result = await transaction.wait()


							 })
						 
					
					it("Insufficient fund order", async()=>{
						await expect( exchange.connect(user1_account).makeOrder(token2.address,depositAmount,token1.address, convertToWei(200))).to.be.reverted;

					 
						})
					 
					 


					}) 
							
							
										}) 



										describe("Order Actions",()=>{ 
											let ex_bal, user_bal; 
											
										
										
										
										describe("Success",()=>{ 
										
												
											beforeEach(async ()=>{
												depositAmount   = await convertToWei(140);
												token1.connect(user1_account).approve(exchange.address, depositAmount)
												token1.connect(deployer_account).transfer(user1, await convertToWei(200))
											 
													ex_bal = await token1.balanceOf(exchange.address) 
												   user_bal = await token1.balanceOf(user1) 
												 
											 
												 transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
											 
					
											 
											 transaction = await exchange.connect(user1_account).makeOrder(token2.address,depositAmount,token1.address, depositAmount)
											 transaction = await exchange.connect(user1_account).cancelOrder(1)
											 
											 result = await transaction.wait()
					
					
												 }) 
										
										it("Update Cancel Order Store", async()=>{
											 let cancelled =  await exchange.connect(user1_account).OrderCancelled(1)
											 //console.log({count})
											 expect( cancelled).to.equal(true)
											  
										 
											}) 
					
					
											it("Emit CancelOrder events", async()=>{
						 
												let depositEvent = result.events[0].args;
															
																   let tokenGet = depositEvent.tokenGet;
																   let tokenGive = depositEvent.tokenGive;
																   let amountGive = depositEvent.amountGive;
																   let amountGet = depositEvent.amountGet;
																   let myuser = depositEvent.user;
																   let orderCount = depositEvent.id;
																   let timestamp = depositEvent.timestamp;
																   
					 
					
					await expect(myuser).to.equal(user1)
					await expect(orderCount).to.equal(1)
					
					await expect(amountGive).to.equal(depositAmount)
												await expect(amountGet).to.equal(depositAmount)
												await expect(tokenGive).to.equal(token1.address)
												await expect(tokenGet).to.equal(token2.address)
												  
											 
												})
					




										}) 
					
					
					
										
										
										describe("Failure",()=>{ 
										
												
											beforeEach(async ()=>{
												depositAmount   = await convertToWei(140);
												token1.connect(user1_account).approve(exchange.address, depositAmount)
												token1.connect(deployer_account).transfer(user1, await convertToWei(200))
											 

												token1.connect(user2_account).approve(exchange.address, depositAmount)
												token1.connect(deployer_account).transfer(user2, await convertToWei(200))
											 

													ex_bal = await token1.balanceOf(exchange.address) 
												   user_bal = await token1.balanceOf(user1) 
												 
											 
												   transaction = await exchange.connect(user2_account).depositToken(token1.address,depositAmount)
												   transaction = await exchange.connect(user1_account).depositToken(token1.address,depositAmount)
											 
					
											 
											 
											 
											 result = await transaction.wait()
					
					
												 }) 
										
										it("Don't Cancel Order before creating it", async()=>{
											
											transaction = await exchange.connect(user1_account).makeOrder(token2.address,depositAmount,token1.address, depositAmount)
											
											await   expect(exchange.connect(user1_account).cancelOrder(100) ).to.be.reverted;
											  
										 
											}) 
					
					
											it("User auth", async()=>{
											  transaction = await exchange.connect(user2_account).makeOrder(token2.address,depositAmount,token1.address, depositAmount)

												 await   expect(exchange.connect(user1_account).cancelOrder(1) ).to.be.reverted;
												 //await exchange.connect(user2_account).cancelOrder(1) 
											 
												}) 
										}) 
					
					
					 
												
															}) 

})