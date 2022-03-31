import { useEffect } from "react";

/* 
  When user change the Ethereum provider, import new account, change default accounts, finnie will dispatch
  appropriate events
  On our dApp, we need to declare specific actions for each dispatched event
  There are three events: 'chainChanged', 'networkChanged', and 'accountsChanged'
*/
const useInitializeEventHandlers = ({ finnieInjected = false, setChainId, setNetworkId, setAccounts, setAllowEIP1559, setIsLoading }) => {
  useEffect(() => {
    const handleNewAccounts = async (newAccounts) => {
      setIsLoading(true)
      const block = await window.ethereum.request({
        method: 'eth_getBlockByNumber',
        params: ['latest']
      })

      if (block?.baseFeePerGas !== undefined) setAllowEIP1559(true)
      setAccounts(newAccounts)
      setIsLoading(false)
    }

    const initializeEvents = () => {
      window.ethereum.on('chainChanged', setChainId)
      window.ethereum.on('networkChanged', setNetworkId)
      window.ethereum.on('accountsChanged', handleNewAccounts)
    }

    if (finnieInjected) initializeEvents()
  }, [finnieInjected])
}

export default useInitializeEventHandlers
