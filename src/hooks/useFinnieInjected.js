import { useEffect, useState } from "react";

/* 
  To determine whether Finnie injected code to our dApp, we need to listen to custom event "DOMContentLoaded"
  Finnie will dispatch custom event "DOMContentLoaded" when it finished code injection
*/
const useFinnieInjected = () => {
  const [finnieInjected, setFinnieInjected] = useState(false)

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      setFinnieInjected(true)
    })
  }, [])

  return finnieInjected
}

export default useFinnieInjected
