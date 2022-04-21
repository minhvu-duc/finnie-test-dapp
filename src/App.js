import { useState, useMemo } from 'react';
import './App.css';

// hooks
import useFinnieInjected from './hooks/useFinnieInjected'
import useInitializeEventHandlers from './hooks/useInitializeEventHandlers';
import useLoadApp from './hooks/useLoadApp';
import useMethods from './hooks/useMethods';
import useContractFactory from './hooks/useContractFactory';

function App() {
  const [accounts, setAccounts] = useState([])
  const [chainId, setChainId] = useState(null)
  const [networkId, setNetworkId] = useState(null)
  const [allowEIP1559, setAllowEIP1559] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const isOnMainnet = useMemo(() => {
    return networkId === 1 && networkId === 1
  }, [networkId, chainId])

  const finnieInjected = useFinnieInjected()
  useInitializeEventHandlers({ finnieInjected, setChainId, setNetworkId, setAccounts, setAllowEIP1559, setIsLoading })
  useLoadApp({ finnieInjected, setChainId, setNetworkId, setAccounts, setAllowEIP1559,setIsLoading })

  const { collectiblesFactory } = useContractFactory({ finnieInjected })
  const { 
    connectFinnie, 
    sendEth, 
    sendEthEIP1559,
    deployCollectiblesContract,
    collectiblesContract,
    mintCollectibles
  } = useMethods({ accounts, setAccounts, setIsLoading, collectiblesFactory })

  return (
    <div className="App">
      {
        isOnMainnet ? <>Please switch to Rinkeby testnet</> :
        <div>
          {/* CONNECT */}
          <div className='connect-button'>
            <button onClick={connectFinnie} disabled={!finnieInjected || !(accounts.length === 0)}>Connect</button>
          </div>

          {/* SEND ETH */}
          <div>
            <button onClick={sendEth} disabled={accounts.length === 0}>Send 0.001 ETH</button>
            <button onClick={sendEthEIP1559} disabled={!allowEIP1559 || accounts.length === 0}>Send 0.001 ETH (EIP 1559 Transaction)</button>
            <a href='https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md' target='_blank' rel="noreferrer">What is EIP 1559 Transaction ?</a>
          </div>

          {/* COLLECTIBLES CONTRACT */}
          <div>
            <button disabled={accounts.length === 0} onClick={deployCollectiblesContract}>Deploy contract</button>
            <button disabled={!collectiblesContract} onClick={mintCollectibles}>Mint NFT</button>
          </div>

          {/* CHAIN & NETWORK ID */}
          <div className='chain-id'>
            <div>Chain ID: {chainId}</div>
          </div>
          <div className='network-id'>
            <div>Network ID: {networkId}</div>
          </div>

          {/* ALLOW EIP 1559 */}
          <div>
            <div>Allow EIP 1559 Transaction: {allowEIP1559.toString()}</div>
          </div>

          {/* CONNECTED ACCOUNTS */}
          <div className='connected-accounts'>
            <div>Connected accounts: {accounts[0]}</div>
          </div>
        {isLoading && <div style={{color: 'blue'}}>Loading...</div>}
        </div>
      }
    </div>
  );
}

export default App;
