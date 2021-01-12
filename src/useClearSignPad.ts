import React, { useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

const useClearSignPad = ({ width, height }: WindowSize, clear: () => void) => {
  useEffect(() => {
    console.log(width, height)
    const clear1 = () => {
      console.log('use clear')
    }
    clear1()
  }, [width, height])
}

export default useClearSignPad
