import React, {useEffect, useRef} from 'react'
import axios from 'axios';
import {debounce} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import { addCharactersToList, changeNextPageUrl, changeSarchName, changeSearchStatus, replaceCharactersList, selectCharacters, selectNextPageUrl, selectSearchName, selectSearchStatus } from '../redux/CharactersListingSlice';
import { Character } from '../types/Interface';
import { useHistory } from 'react-router-dom';
import { characterStatusMap, getCharactersUrl } from '../helpers/urlGenerators';


export default function Home() {
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

    axios.get(requestUrl)
      .then(function (response) {
        if(response.status >= 200 && response.status < 300) {
          console.log({data: response.data, response: response});
          
          dispatch(changeNextPageUrl(response.data.info.next));
          // setNextPageUrl();

          if(nextPageUrl === null || clear) {
            dispatch(replaceCharactersList(response.data.results))
          } else {
            dispatch(addCharactersToList(response.data.results))
          }
        }
      })
      .catch(function (error) {
        dispatch(replaceCharactersList([]));
      });
  }

  
  const loadCharactersDebounced = useRef(debounce(loadCharacters, 200));

  const nameInputChangeHandler = (name: string) => {
    dispatch(changeSarchName(name));
    nameRef.current = name;
    loadCharactersDebounced.current(true);
  }

  const statusChangeHandler = (status: string) => {
    dispatch(changeSearchStatus(status))
    statusRef.current = status;
    loadCharactersDebounced.current(true)
  }


  
  useEffect(() => {
    if(characters.length === 0) {
      loadCharacters(true);
    }
  }, []);

  const loadMoreHandler = () => {
    loadCharacters(false);
  }


  


  return (<>
    <div>
      <input type="text" value={searchName} onChange={(e: any) => {
        nameInputChangeHandler(e.target.value);
      }} />
      <div>
        Value: {searchName}
      </div>
    </div>
 
    <div>
      <select onChange={(event: any) => {
        statusChangeHandler(event.target.value);
      }}>
        {[...characterStatusMap.keys()].map((status: any) => {
          return <option value={status}>{characterStatusMap.get(status)}</option>
        })}
    </select>
    </div>
    <div>
      <div>
        {characters.map((character: Character) => {
          return <div style={{border: "2px solid blue", margin: "15px"}} onClick={() => {
            console.log(`character/${character.id}`);
            console.log(history);
            history.push(`/character/${character.id}`)
            }}>
            <div>{character.name}</div>
            <div>{character.status}</div>
            <div>{character.species}</div>
          </div>;
        })}
        {nextPageUrl !== null ? <button onClick={loadMoreHandler}>Load more</button> : null}
        </div>
    </div>
    </>
  )
}