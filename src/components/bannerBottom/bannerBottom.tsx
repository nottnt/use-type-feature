import React from 'react'
import styled from 'styled-components'

const Banner = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  bottom: 0;
  position: absolute;
  width: 100%;
`

const Consent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
interface IAppProps {
  text?: string
}

const BannerBottom: React.FC<IAppProps> = ({ text }) => {
  return (
    <Consent>
      <Banner>{text}</Banner>
    </Consent>
  )
}

export default BannerBottom
