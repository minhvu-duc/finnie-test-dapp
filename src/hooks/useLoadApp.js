import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect } from "react";

/* 
  Load init data:
  - Chain ID
  - Network ID
  - Accounts (connected accounts, at the moment, we will have only one connected account)
  - AllowEIP1559: Depends on whether the current block has 'baseFeePerGas', we will set appropriate value to allowEIP1559
*/
const useLoadApp = ({ finnieInjected, setAccounts, setChainId, setNetworkId, setAllowEIP1559, setIsLoading }) => {
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true)
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        })
        setAccounts(accounts)
  
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        })
        setChainId(chainId)
  
        const networkId = await window.ethereum.request({
          method: 'net_version'
        })
        setNetworkId(networkId)
  
        const block = await window.ethereum.request({
          method: 'eth_getBlockByNumber',
          params: ['latest']
        })
        setAllowEIP1559(block?.baseFeePerGas !== undefined)
        setIsLoading(false)
      } catch (err) {
        alert(err)
        setIsLoading(false)
      }
    }

    if (finnieInjected) initialize()
  }, [finnieInjected])
}

export default useLoadApp
