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

	let Token, feePercent ;
	let token ;
	let accounts ;
	let feeAccount, feeAccount_account;
	let deployer ;
	let deployer_account ;
	
beforeEach(async ()=>{
 
		// fetch token from blockchain
		 Token = await ethers.getContractFactory("Exchange")
		
		 accounts = await ethers.getSigners();
		 feePercent = 10;
 feeAccount_account= accounts[1]
 feeAccount = feeAccount_account.address;

deployer = accounts[0].address;
deployer_account =  accounts[0];

token  = await Token.deploy(feeAccount,feePercent);

 
})

//beforeEach is executed before each it()

describe("Deployment",()=>{
//each test block is initialized with it
	it("has a fee account",  async ()=>{

 
let DeployedfeeAccount = await token.feeAccount() 
		// check if name is correct


expect(DeployedfeeAccount).to.equal(feeAccount)


	})

	it("has a name fee percent",  async ()=>{

 
		let DeployedfeePercent = await token.feePercent() 
				// check if name is correct
		
		
		expect(DeployedfeePercent).to.equal(feePercent)
		
		
			})

	
				}) 

})