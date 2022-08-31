import { ConnectWallet, useAddress, useDisconnect, useMetamask, useSDK } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ContractType } from "@thirdweb-dev/sdk";
import NftCollection from "../components/NftCollection";
const Home: NextPage = () => {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()
 const [name, setName] = useState<string>("")
 const [description, setDescription] = useState<string>("")
 const sdk = useSDK()
 async function deployNftCollection(){
  if (!sdk || !address) return

  if (!description || !name) return

  const deployed = await sdk.deployer.deployNFTCollection({
    name:name,
    description:description,
    primary_sale_recipient:address,
  })
  alert(`deployed ${deployed}`)

 }
 const [collections,setCollections] = useState<
 {
   address: string;
   contractType: ContractType;
   metadata: () => Promise<any>
 }[]
 >([])

 useEffect(() =>{
  if (!address || !sdk) return
  (async ()=>{
    const contracts = await sdk?.getContractList(address);

    const nftcollections = contracts.filter((contract)=>{
      return contract.contractType === "nft-collection"
    })
    setCollections(nftcollections)

  })()
 }, [address,sdk])
  return (
    <div>
      {address ? (
        <>
        <input
         type="text"
         value={name}
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)}
        
        />
        <br />
        <input
         type="text"
         value={description}
          placeholder="Descriptions"
          onChange={(e) => setDescription(e.target.value)}
           />
           <br />
           <button
           onClick={deployNftCollection}
           >Deploy Nft Collections</button>

           <hr />

           <h2>My NFT collections</h2>
         {
            collections?.map((c) =>(
              <NftCollection contract={c} key={c.address}/>
            ))}
        </>
      ) :(
         <button onClick={connectWithMetamask}>Connect</button>
      )}
    </div>
  );
};

export default Home;
