import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails, getEpisodesListUrl } from "../helpers/urlGenerators";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

interface CharacterParams {
  id: string;
}

const CharacterContainer = styled.div`
  padding: 20px;
`;

const EpisodesList = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Episode = styled.li`
    width: auto;
`;

const ImageContainer = styled.div`
  text-align: center;

  @media screen and (min-width: 768px) {
    flex: 1
  }
`;

const GoBackButton = styled.button`
  padding: 15px 25px;
  font-size: 16px;
`;

const Divider = styled.div`
  border-bottom: 3px solid black;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  border-radius: 25px;
`;

const ContentContainer = styled.div`
  color: red;
  text-align: center;

  @media screen and (min-width: 768px) {
    flex: 1;
    justify-content: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CharacterDetailsContainer = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const Character = () => {
  const { id } = useParams<CharacterParams>();
  const [character, setCharacter] = useState<any>(null);
  const [episodesList, setEpisodesList] = useState<any[]>([]);

  const history = useHistory();

  console.log(history);

  const loadEpisodes = () => {
    const episodesRequestUrl = getEpisodesListUrl(character ? character.episode : []);

    axios
      .get(episodesRequestUrl)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          if (character.episode.length <= 1) {
            setEpisodesList([response.data]);
          } else {
            setEpisodesList([...response.data]);
          }
        }
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    if (character !== null) {
      loadEpisodes();
    }
  }, [character]);

  useEffect(() => {
    const requestUrl = getCharacterDetails(id);

    axios
      .get(requestUrl)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          //   console.log({data: response.data, response: response});

          setCharacter(response.data);
          //   loadEpisodes();
        }
      })
      .catch(function (error) {});
  }, []);

  return (
    <CharacterContainer>
      <GoBackButton onClick={() => {
        history.goBack();
      }}>Go back</GoBackButton>
        {character !== null ? (
          <CharacterDetailsContainer>
            <ImageContainer>
              <Image src={character.image} />
            </ImageContainer>

            <ContentContainer>
              <div>Name: {character.name}</div>
              <div>Status: {character.status}</div>
              <div>Species: {character.species}</div>
              <div>Gender: {character.gender}</div>
              <div>Location: {character.location.name}</div>
              <div>Origin: {character.origin.name}</div>
            </ContentContainer>
            
     
          </CharacterDetailsContainer>
        ) : null}

          <Divider />

        <EpisodesList>
          {episodesList.map((episode) => {
            return <Episode>{episode.name}</Episode>;
          })}
        </EpisodesList>
    </CharacterContainer>
  );
};

export default Character;
