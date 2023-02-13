const {ethers} = require("hardhat")
const {expect} = require("chai")


//convert eth to wei

const convertToWei = (num)=>{
return ethers.util.parseUnits(num,"eth")
}


describe("Token Contract", async ()=>{

	let Token ;
	let token ;
	let accounts ;
	let deployer ;
beforeEach(async ()=>{
let name ="Fort";
let symbol = "FRT";
let totalSupply = 1000000;
		// fetch token from blockchain
		 Token = await ethers.getContractFactory("Token")
		//read token name
 token  = await Token.deploy(name,symbol, totalSupply);// the deploy method invokes the constructor ofthe contract, so the args of the constructor should be passed to deploy()
accounts = await ethers.getSigners();
deployer = accounts[0].address;
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

								 


						

})