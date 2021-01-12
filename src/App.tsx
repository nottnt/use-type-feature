import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Popup from 'reactjs-popup'
import SignaturePad, { ReactSignatureCanvasProps } from 'react-signature-canvas'
import * as R from 'ramda'
import './App.css'
import './sigCanvas.css'
// import useClearSignPad from './useClearSignPad'
import useWindowSize from './useWindowSize'

interface IOptions {
  velocityFilterWeight?: number
  minWidth?: number
  maxWidth?: number
  dotSize?: number
  penColor?: string
  backgroundColor?: string
  onEnd?: () => void
  onBegin?: () => void
  canvasProps?: {
    width?: number
    height?: number
  }
}

const App: React.FC<ReactSignatureCanvasProps | IOptions> = () => {
  const [imageURL, setImageURL] = useState<boolean | any>(null) // create a state that will contain our image url
  const [signableEnd, setSignableEnd] = useState<boolean | null>(null)
  const [isShowWaterMarkContent, setIsShowWaterMarkContent] = useState<boolean>(
    true,
  )
  const sigCanvas = useRef<SignaturePad>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const windowSize = useWindowSize()

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => {
    if (sigCanvas.current) sigCanvas.current.clear()
    setSignableEnd(false)
    setIsShowWaterMarkContent(true)
  }

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    if (sigCanvas.current)
      setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
  }

  const onSignableStart = () => {
    setIsShowWaterMarkContent(false)
  }

  const onSignableEnd = () => {
    setSignableEnd(true)
  }

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   // console.log(R.pathOr(null, ['current', 'clear'], sigCanvas))

  //   if (sigCanvas.current && sigCanvas.current.isEmpty())
  //     console.log(sigCanvas.current.isEmpty())
  // }, [sigCanvas])

  useLayoutEffect(() => {
    console.log(sigCanvas) // { current: <h1_object> }
  })

  interface WindowSize {
    width: number
    height: number
  }
  const useClearSignPad = ({ width, height }: WindowSize) => {
    useEffect(() => {
      console.log(width, height)
      clear()
    }, [width, height])
  }

  useClearSignPad(windowSize)

  return (
    <div className="App">
      <h1 ref={h1Ref}>App</h1>
      <h1>Signature Pad Example</h1>
      <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
        closeOnDocumentClick={false}
      >
        {(close: () => void) => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: isShowWaterMarkContent
                  ? 'signatureCanvas'
                  : 'signatureCanvas1',
                width: windowSize.width - 300,
                height: 364,
              }}
              onEnd={onSignableEnd}
              onBegin={onSignableStart}
            />

            {signableEnd && 'Sign End!!!'}
            {`height: ${windowSize.height} width: ${windowSize.width}`}
            {/* Button to trigger save canvas image */}
            <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={close}>Close</button>
          </>
        )}
      </Popup>
      <br />
      <br />
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      {/* {imageURL} */}
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: 'block',
            margin: '0 auto',
            border: '1px solid black',
            width: '150px',
          }}
        />
      ) : null}
    </div>
  )
}

export default App
