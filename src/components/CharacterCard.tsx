import React from 'react';
import styled from 'styled-components';

export interface Props {
    name: string;
    image: string;
    status: string;
    gender: "Male" | "Female" | "unknown";
    onClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
}

const Card = styled.div`
    /* width: calc(20% - 15px); */
    padding: 15px;
    box-shadow: 0px 4px 6px 4px #00000029;
    transition: background-color ease-in-out 0.3s  ;
    &:hover {
        background-color: #0000001a;
        cursor: pointer;
    }
`;

interface GenderProsp {
    gender:string;
}

const Gender = styled.div`
    color: ${(props: GenderProsp) => props.gender === "Male" ? "blue" : props.gender === "Female" ? "red" : "green"};
`;

const CardImage = styled.img`
    width: 100%;
`

const CardTitle = styled.div`
    font-weight: bold;
`;

export default function CharacterCard(props: Props) {
    const {name, image, status, gender, onClick} = props;

  return (
    <Card className="card" onClick={onClick}>
        <CardTitle>{name}</CardTitle>
        <div>{status}</div>
        <Gender gender={gender}>{gender}</Gender>
        <CardImage src={image} alt={`Character name: ${name}`}/>
    </Card>
  )
}