import React, { useEffect } from 'react'

interface UseClearSignPadProps {
  isEmpty: () => boolean
  clear: () => void
}

const useClearSignPad = ({ isEmpty, clear }: UseClearSignPadProps) => {
  useEffect(() => {
    console.log(isEmpty())
    if (isEmpty()) clear()
  }, [isEmpty, clear])
}

export default useClearSignPad
