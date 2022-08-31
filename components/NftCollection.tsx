import { useNFT, useNFTCollection } from '@thirdweb-dev/react'
import { ContractType } from '@thirdweb-dev/sdk'
import React, { useEffect, useState } from 'react'

type Props = {
    contract: {
        address: string
        contractType: ContractType;
        metadata: () => Promise<any>
    }
}

export default function NftCollection({contract}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [metadata,setMetadata] = useState<any>({})

  const nftCollection = useNFTCollection(contract.address)
  const {data: nfts, isLoading: isLoadingNfts} = useNFT(nftCollection)
  useEffect(()=> {
    (async ()=>{
       const m = await contract.metadata()
       setMetadata(m)
       setIsLoading(false)
    })()
  },[contract])
  if (isLoading){
    return <div>Loading..</div>
  }
  return(
    <div>
      <h1>{metadata.name}</h1>
      {/* <p>{metadata.description}</p>
     <p>{contract.address}</p>  */}

     {
      isLoadingNfts ? (
        <div>Loading Nfts..</div>
      ):(
        nfts?.map((n) =>(
          <div key={n.metadata.is.toString()}>
            {n.metadata.name}
          </div>
        ))
      )
     }
    </div>
  ) 

}