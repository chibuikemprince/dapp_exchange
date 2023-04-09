const config = require("../src/config.json")

const convertToWei = async (num)=>{
	num = num.toString();

	let eth = await ethers.utils.parseUnits(num,"ether")
	//console.log({num, eth})
return eth;
}



function wait (sec){
    sec= sec*1000;
    return new Promise ((resolve,reject)=>{
setTimeout(resolve, sec)
    })
}

async function main(){

    const {chainId} = await ethers.provider.getNetwork()

    //view accounts
    const accounts = await ethers.getSigners();


accounts.forEach((e,i,a)=>{
console.log({account:e.address, id:i})
})
  console.log({network: config[chainId]})

    let Dapp = await ethers.getContractAt("Token", config[chainId].DApp.address)
    console.log("DAPP deployed at ", Dapp.address)
    
     let mETH = await ethers.getContractAt("Token", config[chainId].mETH.address)
    console.log("mETH fetched at ", mETH.address)
     
     
     let mDAI = await ethers.getContractAt("Token", config[chainId].mDAI.address)
    console.log("mDAI fetched at ", mDAI.address)
     
     
     let Exchange = await ethers.getContractAt("Exchange", config[chainId].exchange.address)
     console.log("Exchange fetched at ", Exchange.address)
 
 
    // Distribute Tokens
let freeToken = await convertToWei(10000)
let deployer = accounts[0]


let user1 = accounts[1]
let user2 = accounts[2]
let user3 = accounts[3]


console.log({deployer: deployer.address,user1:user1.address, user2:user2.address})

await mETH.connect(deployer).transfer(user1.address, freeToken);
console.log("deployer transferred mETH token to user1: ", freeToken)


await mDAI.connect(deployer).transfer(user2.address, freeToken);
console.log("deployer transferred mDAI token to user2: ", freeToken)


await Dapp.connect(deployer).transfer(user3.address, freeToken);
console.log("deployer transferred Dapp token to user3: ", freeToken)

// approve meth token
freeToken = await convertToWei(100000000)
let approve = await mETH.connect(user1).approve(Exchange.address, freeToken);
console.log("user1 approved meth token ", freeToken)
let done = await approve.wait()

approve = await Dapp.connect(deployer).approve(Exchange.address, freeToken);
console.log("deployer approved dapp token ", freeToken)


freeToken = await convertToWei(10000)
//deposit token
await Exchange.connect(user1).depositToken(mETH.address,freeToken)
console.log("user1 deposited token ", freeToken)


await Exchange.connect(deployer).depositToken(Dapp.address,freeToken)
console.log("deployer deposited token ", freeToken)


// make orders

let transaction  = await Exchange.connect(user1).makeOrder( Dapp.address,  await convertToWei(100), mETH.address,  await convertToWei(5))

let result = await transaction.wait();

let orderid = result.events[0].args.id;
console.log("User1 made order ", orderid)
//cancel
  await Exchange.connect(user1).cancelOrder(  orderid)

  
  await transaction.wait();
  console.log("User1 cancelled order ", orderid)


  await wait (1)


// make another order

  transaction  = await Exchange.connect(user1).makeOrder( Dapp.address,  await convertToWei(100), mETH.address,  await convertToWei(5))

  result = await transaction.wait();
 orderid = result.events[0].args.id;

 console.log("user1 ", user1.address, " made order ", orderid)

// user 2 fill order
await Exchange.connect(deployer).fillOrder(orderid)
await transaction.wait();
console.log("deployer filled order ", orderid)

await wait (1)
// make oder again
 transaction  = await Exchange.connect(user1).makeOrder( Dapp.address,  await convertToWei(100), mETH.address,  await convertToWei(5))

 result = await transaction.wait();
orderid = result.events[0].args.id;

console.log("user1 ", user1.address, " made order ", orderid)


// user 2 fill order again


await Exchange.connect(deployer).fillOrder(orderid)
await transaction.wait();
console.log("deployer filled order ", orderid)


await wait (1)

// make oder again
transaction  = await Exchange.connect(user1).makeOrder( Dapp.address,  await convertToWei(100), mETH.address,  await convertToWei(5))

result = await transaction.wait();
orderid = result.events[0].args.id;

console.log("user1 ", user1.address, " made order ", orderid)


// user 2 fill order again

await Exchange.connect(deployer).fillOrder(orderid)

await transaction.wait();
console.log("deployer filled order ", orderid)

// seed orders


// create sell order for dapp
for( var i=0; i<=10; i++){
 
transaction  = await Exchange.connect(user1).makeOrder(mETH.address,  await convertToWei(10+i), Dapp.address,  await convertToWei(10))

result = await transaction.wait();

orderid = result.events[0].args.id;

console.log("deployer ", user1.address, "wants to sell dapp,  made order ", orderid)

await wait (1)

}


// create buy order for dapp
for( var i=0; i<=10; i++){
 
    transaction  = await Exchange.connect(deployer).makeOrder( Dapp.address,  await convertToWei(10), mETH.address,  await convertToWei(10+i))
    
    result = await transaction.wait();
    
orderid = result.events[0].args.id;

    console.log("user1 ", user1.address, " wants to buy dapp,  made order ", orderid)
    
    await wait (1)
    
    }
    




}

main()
.then(e=>{
    console.log("script executed with no error")
})

.catch(e=>{
    console.log("\n\n script executed with error: ");
    console.error(e)
    process.exit(1);
})