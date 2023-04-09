 
 
async function main() {
  // fetch contract to deploy
const Token = await ethers.getContractFactory("Token")
const Exchange = await ethers.getContractFactory("Exchange")

//fetch accounts
const accounts = await ethers.getSigners();


accounts.forEach((e,i,a)=>{
console.log({account:e.address, id:i})
})

let totalSupply = 1000000;
  // deploy contract
const dapp = await Token.deploy("DAPP", "DAPP", totalSupply)
const meth = await Token.deploy("mETH", "mETH", totalSupply)
const mdai = await Token.deploy("mDAI", "mDAI", totalSupply)

 
		 
//fetch a copy of the deployed blockchain
await dapp.deployed()
console.log(`You just deployed dapp successfully: ${dapp.address} `)


await meth.deployed()
console.log(`You just deployed meth successfully: ${meth.address} `)

await mdai.deployed()
console.log(`You just deployed mDAI successfully: ${mdai.address} `)


const exchange = await Exchange.deploy(accounts[0].address, 10)
await exchange.deployed()
console.log(`You just deployed exchange successfully: ${exchange.address} `)

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
