import React from 'react';
import styled from 'styled-components';

export interface Props {
    name: string;
    image: string;
    status: string;
    gender: string;
    onClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
}

const Card = styled.div`
    width: calc(20% - 15px);
    padding: 15px;
`;

const CardImage = styled.img`
    width: 100%;
`

export default function CharacterCard(props: Props) {
    const {name, image, status, gender, onClick} = props;

  return (
    <Card className="card" onClick={onClick}>
        <div>{name}</div>
        <div>{status}</div>
        <div>{gender}</div>
        <CardImage src={image} alt={`Character name: ${name}`}/>
    </Card>
  )
}