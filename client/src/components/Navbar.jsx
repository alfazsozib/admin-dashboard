import React from 'react'
import {useState} from 'react';
import  { BrowserProvider } from "ethers"



function Navbar({setWalletAddress}) {

  const [wallet, setWallet] = useState()
  const connectWallet=async()=>{
    const provider = new BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts",[])
    let signer = await provider.getSigner()
    const address = await signer.getAddress()
    setWallet(address)
    setWalletAddress(address)
  }
  return (
    <div className='main_box  bg-cyan-500 shadow-lg shadow-black flex justify-end p-8'>
    <div className=''>
            <button onClick={connectWallet} className='bg-[#1b1a1a] text-white px-6 py-2'>
            {wallet?`${wallet.slice(0,6)}.....${wallet.slice(34,44)}`:"Connect Admin Wallet"}
        </button>
        </div>
</div>

  )
}

export default Navbar