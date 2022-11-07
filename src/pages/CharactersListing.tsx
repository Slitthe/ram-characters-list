import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addCharactersToList, changeNextPageUrl, changeSarchName, changeSearchStatus, replaceCharactersList, selectCharacters, selectNextPageUrl, selectSearchName, selectSearchStatus } from "../redux/CharactersListingSlice";
import { Character } from "../types/Interface";
import { useHistory } from "react-router-dom";
import { characterStatusMap, getCharactersUrl } from "../helpers/urlGenerators";
import CharacterCard from "../components/CharacterCard";
import styled, {keyframes} from "styled-components";
import Wrapper from "../components/Wrapper";

const spinnerAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

const CharacterListingContainer = styled.div`
  padding-bottom: 25px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border-left: 10px solid blue;
  border-right: 10px solid blue;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-radius: 100%;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: ${spinnerAnimation};
`;

const CardContainer = styled.div`
  display: grid;
  /* flex-wrap: wrap; */

  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: 15px;
  margin: 25px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  font-size: 18px;
`;

const SearchInput = styled.input`
  /* font-size: 18px; */
  padding: 8px;
  min-width: 50%;
  max-width: 500px;
`;

const CategorySelect = styled.select`
  text-align: center;
`;

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const LoadMoreButton = styled.button`
  font-size: 18px;
  background: transparent;
  border: 2px solid #0000004a;
  padding: 5px 15px;
  cursor: pointer;
  outline: none;

  transition: background-color ease-in-out 0.3s;

  &:hover {
    background-color: #0000001a;
  }
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const characters = useSelector(selectCharacters);
  const searchStatus = useSelector(selectSearchStatus);
  const searchName = useSelector(selectSearchName);
  const nextPageUrl = useSelector(selectNextPageUrl);

  const nameRef = useRef(searchName);
  const statusRef = useRef(searchStatus);

  const loadCharacters = (clear: boolean) => {
    const requestUrl = getCharactersUrl(nextPageUrl, nameRef.current, statusRef.current);
    setIsLoading(true);
    axios
      .get(requestUrl)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          // console.log({data: response.data, response: response});

          dispatch(changeNextPageUrl(response.data.info.next));
          // setNextPageUrl();

          if (nextPageUrl === null || clear) {
            dispatch(replaceCharactersList(response.data.results));
          } else {
            dispatch(addCharactersToList(response.data.results));
          }
        }
      })
      .catch(function (error) {
        dispatch(replaceCharactersList([]));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadCharactersDebounced = useRef(debounce(loadCharacters, 200));

  const nameInputChangeHandler = (name: string) => {
    dispatch(changeSarchName(name));
    nameRef.current = name;
    loadCharactersDebounced.current(true);
  };

  const statusChangeHandler = (status: string) => {
    dispatch(changeSearchStatus(status));
    statusRef.current = status;
    loadCharactersDebounced.current(true);
  };

  useEffect(() => {
    if (characters.length === 0) {
      loadCharacters(true);
    }
  }, []);

  const loadMoreHandler = () => {
    loadCharacters(false);
  };

  return (
    <CharacterListingContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          value={searchName}
          onChange={(e: any) => {
            nameInputChangeHandler(e.target.value);
          }}
        />
        <CategorySelect
          onChange={(event: any) => {
            statusChangeHandler(event.target.value);
          }}
        >
          {[...characterStatusMap.keys()].map((status: any) => {
            return <option value={status}>{characterStatusMap.get(status)}</option>;
          })}
        </CategorySelect>
      </SearchInputContainer>
      <div>
        <CardContainer>
          {characters.map((character: Character) => {
            const { name, image, status, gender } = character;
            return (
              <CharacterCard
                name={name}
                image={image}
                status={status}
                gender={gender}
                onClick={() => {
                  history.push(`/character/${character.id}`);
                }}
              />
            );
          })}
        </CardContainer>


        <LoadMoreButtonContainer>
          {!isLoading && nextPageUrl !== null ? <LoadMoreButton onClick={loadMoreHandler}>Load more</LoadMoreButton> : null}
          {isLoading && nextPageUrl !== null ? <LoadingSpinner /> : null}
        </LoadMoreButtonContainer>
      </div>
    </CharacterListingContainer>
  );
}
