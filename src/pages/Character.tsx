import React from 'react'
import { useParams } from 'react-router-dom';

interface CharacterParams {
    id: string;
}

const Character = () => {
    const {id} = useParams<CharacterParams>();
  return (
    <div>{id}</div>
  )
}

export default Character;