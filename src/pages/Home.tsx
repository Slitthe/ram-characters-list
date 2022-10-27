import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import axios from 'axios';
import {debounce} from "lodash";


interface Character {
  name: string;
  status: string;
  species: string;
}

const characterStatusMap = new Map();
  characterStatusMap.set("all", "all");
  characterStatusMap.set("alive", "Alive");
  characterStatusMap.set("dead", "Dead");
  characterStatusMap.set("unknown", "unknown");


let requestUrl = 'https://rickandmortyapi.com/api/character';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchStatus, setSearchStatus] = useState([...characterStatusMap.keys()][0]);
  const [searchName, setSearchName] = useState<string>('');
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);



  const nameRef = useRef(searchName);
  const statusRef = useRef(searchStatus);


 
  

  const loadCharacters = (clear: boolean) => {
    let baseUrl = new URL(nextPageUrl ? nextPageUrl : requestUrl);
    const name = nameRef.current;
    const status = statusRef.current;
    if(name !== undefined) {
      baseUrl.searchParams.append("name", name);
    }

    if(status !== undefined && status !== characterStatusMap.get("all")) {
      baseUrl.searchParams.append("status", status);
    }



    axios.get(baseUrl.href)
      .then(function (response) {
        if(response.status >= 200 && response.status < 300) {
          console.log({data: response.data, response: response});
          
          setNextPageUrl(response.data.info.next);

          if(nextPageUrl === null || clear) {
            setCharacters(response.data.results);
          } else {
            setCharacters([...characters, ...response.data.results]);
          }
        }
      })
      .catch(function (error) {
        setCharacters([])
      });
  }

  
  const loadCharactersDebounced = useRef(debounce(loadCharacters, 200));

  const nameInputChangeHandler = (name: string) => {
    setSearchName(name);
    nameRef.current = name;
    loadCharactersDebounced.current(true);
  }

  const statusChangeHandler = (status: string) => {
    setSearchStatus(status);
    statusRef.current = status;
    loadCharactersDebounced.current(true)
  }


  
  useEffect(() => {
    loadCharacters(true);
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
          return <div style={{border: "2px solid blue", margin: "15px"}}>
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