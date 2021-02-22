import React from 'react'
import SignaturePad, { ReactSignatureCanvasProps } from 'react-signature-canvas'
import styled from 'styled-components'

interface EntendedProps {
  refApi: any
  readOnly?: boolean
  imageURL?: string
}

type SignaturePadInterface = EntendedProps & ReactSignatureCanvasProps

const SignPad: React.FC<SignaturePadInterface> = (props) => {
  const {
    refApi = null,
    velocityFilterWeight = 0.7,
    minWidth = 0.5,
    maxWidth = 2.5,
    penColor = 'black',
    backgroundColor = 'rgba(0,0,0,0)',
    clearOnResize = true,
    onEnd = () => console.log('onEnd'),
    onBegin = () => console.log('onBegin'),
    canvasProps = {
      width: 300,
      height: 300,
    },
    readOnly = false,
    imageURL = '',
  } = props
  console.log(canvasProps)
  return (
    <Container>
      {readOnly ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...canvasProps,
            ...(canvasProps.style && { ...canvasProps.style }),
          }}
        >
          <img
            src={imageURL}
            alt="my signature"
            style={{
              border: '1px solid black',
            }}
          />
        </div>
      ) : (
        <SignaturePad
          ref={refApi}
          velocityFilterWeight={velocityFilterWeight}
          minWidth={minWidth}
          maxWidth={maxWidth}
          penColor={penColor}
          backgroundColor={backgroundColor}
          clearOnResize={clearOnResize}
          canvasProps={canvasProps}
          onEnd={onEnd}
          onBegin={onBegin}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default styled(SignPad)``
