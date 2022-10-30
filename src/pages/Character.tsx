import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails, getEpisodesListUrl } from "../helpers/urlGenerators";

interface CharacterParams {
  id: string;
}

const Character = () => {
  const { id } = useParams<CharacterParams>();
  const [character, setCharacter] = useState<any>(null);
  const [episodesList, setEpisodesList] = useState<any[]>([]);

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
    <>
      <div>
        {character !== null ? (
          <div>
            <div>Name: {character.name}</div>
            <div>Status: {character.status}</div>
            <div>Species: {character.species}</div>
            <div>Gender: {character.gender}</div>
            <div>Location: {character.location.name}</div>
            <div>Origin: {character.origin.name}</div>
            <img src={character.image} />
          </div>
        ) : null}

        <ol>
          {episodesList.map((episode) => {
            return <li>{episode.name}</li>;
          })}
        </ol>
      </div>
    </>
  );
};

export default Character;
