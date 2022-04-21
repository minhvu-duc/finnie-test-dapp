import { useState } from "react"

const useMethods = ({ accounts, setAccounts, setIsLoading, collectiblesFactory }) => {
  const [collectiblesContract, setCollectiblesContract] = useState(null)

  const connectFinnie = async () => {
    try {
      setIsLoading(true)
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      setAccounts(accounts)
      setIsLoading(false)
    } catch (err) {
      alert(err.data)
      setIsLoading(false)
    }
  }

  const sendEth = async () => {
    try {
      setIsLoading(true)
      const transactionPayload = {
        from: accounts[0],
        to: '0xb076413401172CBB73C082107514De3376E4FF6c',
        value: '0x38D7EA4C68000',
        gasLimit: '0x5208',
        type: '0x0',
      }

      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionPayload]
      })
      setIsLoading(false)
      alert('Transaction Hash: ' + transactionHash)
    } catch (err) {
      alert(err.data)
      setIsLoading(false)
    }
  }

  const sendEthEIP1559 = async () => {
    try {
      setIsLoading(true)
      const transactionPayload = {
        from: accounts[0],
        to: '0xb076413401172CBB73C082107514De3376E4FF6c',
        value: '0x38D7EA4C68000',
        gasLimit: '0x5208',
        maxFeePerGas: '0x2540be400',
        maxPriorityFeePerGas: '0x3b9aca00',
      }

      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionPayload],
      });

      setIsLoading(false)
      alert('Transaction Hash: ' + transactionHash)
    } catch (err) {
      alert(err.data)
      setIsLoading(false)
    }
  }

  const deployCollectiblesContract = async () => {
    try {
      setIsLoading(true)
      const contract = await collectiblesFactory.deploy()
      await contract.deployTransaction.wait()

      alert(`Contract mined! address: ${contract.address} transactionHash: ${contract.transactionHash}`)
      setCollectiblesContract(contract)
      setIsLoading(false)
    } catch (err) {
      alert(err.data)
      setIsLoading(false)
    }
  }

  const mintCollectibles = async () => {
    try {
      let result = await collectiblesContract.mintCollectibles(1, {from: accounts[0]})
      result = await result.wait()
      alert('Transaction hash: ', result.transactionHash)
    } catch (err) {
      alert(err.data)
      setIsLoading(false)
    }
  }

  return { connectFinnie, sendEth, sendEthEIP1559, deployCollectiblesContract, collectiblesContract, mintCollectibles }
}

export default useMethods
