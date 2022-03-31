import { useState } from 'react'

const useMethods = ({ accounts, setAccounts, setIsLoading }) => {
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

  return [connectFinnie, sendEth]
}

export default useMethods
