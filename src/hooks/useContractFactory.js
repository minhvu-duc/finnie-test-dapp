import { ethers } from "ethers";
import { useEffect, useState } from "react";

import constants from '../constants.json'

const useContractFactory = ({ finnieInjected }) => {
  const [collectiblesFactory, setCollectiblesFactoer] = useState(null)

  useEffect(() => {
    const init = () => {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const collectiblesFactory = new ethers.ContractFactory(
        constants.collectiblesAbi,
        constants.collectiblesBytecode,
        ethersProvider.getSigner()
      )
  
      setCollectiblesFactoer(collectiblesFactory)
    }

    if (finnieInjected) init()
  }, [finnieInjected])

  return { collectiblesFactory }
}

export default useContractFactory
