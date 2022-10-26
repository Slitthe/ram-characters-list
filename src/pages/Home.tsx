import React from 'react'

import styled from "styled-components"

type Props = {}

const HomeText = styled.div`
  padding: 4em;
  background: papayawhip;
  color: red;
  background: black;
`;

export default function Home({}: Props) {
  return (
    <HomeText>
        Home
    </HomeText>
  )
}