import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { ethers } from 'ethers';
import { abi,contractAddress} from "../constants/index"
export default function Home() {
  const [connected, setConnected] = useState(false);
  const [signer,setSigner] = useState(null);
  const [contract,setContract] = useState(null);
  const [account,setAccount] = useState(null);
  const [hash,setHash] = useState(null);
  const [verfied,setVerified] = useState(false);
  const [started,setStarted] = useState(false);

  const networks = {
    wallaby: {
      chainId: `0x${Number(31415).toString(16)}`,
      chainName: "Filecoin — Wallaby testnet",
      nativeCurrency: {
        name: "TFIL",
        symbol: "tFIL",
        decimals: 18
      },
      rpcUrls: ["https://wallaby.node.glif.io/rpc/v0"],
      blockExplorerUrls: ["https://explorer.glif.io/wallaby"]
    }
  }

  const connectWallet = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum,"any");           
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      if(await signer.getChainId() != 31415){
          await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                  {
                      ...networks["wallaby"]
                  }
              ]
          })
      }
      setConnected(true);
      setSigner(signer);
      setAccount(signer.getAddress())
      setContract(new ethers.Contract(contractAddress,abi,signer));
    }
    catch(err){
      alert(err.message);
    }
  }
  const upload = async (e) => {
    try{
      const finput = document.getElementById('file');
      const file = finput.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      let hashData = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      hashData = `0x${hashData}`;
      setHash(hashData);
    }
    catch(err){
      alert(err.message);
    }
  }

  const addFile = async () =>{
    try{
      const tx = await contract.addFile(hash);
    }
    catch(err){
      alert(err.message);
    }
  }

  const verify = async() =>{
    try{
      const tx = await contract.verifyFileOrigin(account,hash);
      setVerified(tx);
      setStarted(true);
    }
    catch(err){
      alert(err.message);
    }
  }

  return (
    <div >
      <Head>
        <title>File Verifier</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className='flex flex-row-reverse mx-40 my-4 '>
        {
          connected ? <button className="p-2 rounded-lg bg-blue-200 px-4">Connected</button> : <button onClick={connectWallet} className="p-2 rounded-lg bg-blue-200 px-4">Connect</button>
        }
      </div>
      <div className='flex flex-col items-center mb-8  font-semibold text-2xl'>
      <h1>Verify your docs with FEVM and SHA256</h1>
    </div>
      <div className='grid grid-cols-2 mx-80 gap-5'>
        <div className='flex items-center justify-between '>
          <input type="file" id="file" className="" onChange={upload}/>
        </div>
        <div>
          {
            started && (verfied ? 
              <p className="text-lg text-green-600">File Verified</p>
            
            :
            <div>
              <p className="uppercase text-red-500 text-xl">MATCH not found</p>
            </div>)
            
          }

        </div>
        <div className='flex'>
          <button className='px-6 py-2 bg-blue-200 rounded-lg' onClick={addFile}>Add</button>
        </div>
        <div>

          <button onClick={verify} className='px-6 py-2 bg-blue-200 rounded-lg' >Verify </button>
        </div>
      </div>
    </div>
  )
}
