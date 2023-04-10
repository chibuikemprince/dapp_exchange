import { useEffect } from "react";
import { ethers } from "ethers";
import config from "../config.json"
import abi from "../abi/token_abi.json"

function App() {
const loadBlockchainData = async ()=>{
  let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
console.log({acc1: accounts[0]})

let provider = new ethers.providers.Web3Provider(window.ethereum)
let network = await provider.getNetwork()
console.log({network, config})

let {chainId} = network;
let Dapp_address = config[chainId].DApp.address;
console.log({Dapp_address})
let token_abi = abi.abi;

// console.log({token_abi})
const Dapp = await new ethers.Contract(Dapp_address, token_abi, provider);

let dapp_symbol = await Dapp.symbol();

console.log({Dapp: Dapp.address, dapp_symbol})

}

useEffect(()=>{
  loadBlockchainData()

})
  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;