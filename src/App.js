import { useState } from 'react';
import './App.css';

// hooks
import useFinnieInjected from './hooks/useFinnieInjected'
import useInitializeEventHandlers from './hooks/useInitializeEventHandlers';
import useLoadApp from './hooks/useLoadApp';
import useMethods from './hooks/useMethods';

function App() {
  const [accounts, setAccounts] = useState([])
  const [chainId, setChainId] = useState(null)
  const [networkId, setNetworkId] = useState(null)
  const [allowEIP1559, setAllowEIP1559] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const finnieInjected = useFinnieInjected()
  useInitializeEventHandlers({ finnieInjected, setChainId, setNetworkId, setAccounts, setAllowEIP1559, setIsLoading })
  useLoadApp({ finnieInjected, setChainId, setNetworkId, setAccounts, setAllowEIP1559,setIsLoading })

  const [connectFinnie, sendEth] = useMethods({ accounts, setAccounts, setIsLoading })

  return (
    <div className="App">
      <div className='connect-button'>
        <button onClick={connectFinnie} disabled={!finnieInjected || !(accounts.length === 0)}>Connect</button>
      </div>
      <div>
        <button onClick={sendEth} disabled={accounts.length === 0}>Send 0.001 ETH</button>
      </div>
      <div className='chain-id'>
        <div>Chain ID: {chainId}</div>
      </div>
      <div className='network-id'>
        <div>Network ID: {networkId}</div>
      </div>
      <div>
        <div>Allow EIP 1559 Transaction: {allowEIP1559.toString()}</div>
      </div>
      <div className='connected-accounts'>
        <div>Connected accounts: {accounts[0]}</div>
      </div>
       {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
