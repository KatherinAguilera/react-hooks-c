import { useState, useEffect, useReducer, useMemo, useRef } from 'react'
import '../css/Character.css'
import Loader from './Loader'

/**************useReducer*************/

const initialState = {
  favorites: []
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}



const Characters = () => {

  const [result, setResult] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [load, setLoad] = useState('true');
  const [myfavorites, dispatch] = useReducer(favoriteReducer, initialState)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  /**************useREf************************/
  const searchInput = useRef(null);

  /******* useEffect y useref PARA BUSCADOR ********/
  const handleChange = () => {
    setSearchTerm(searchInput.current.value);
  };
  useEffect(() => {
    const results = searchResults.filter((person) => person.name.toLowerCase().includes(searchTerm));
    setSearchResults(results);
    if (searchTerm === '') {
      setSearchResults(pokemons);
    }
  }, [searchTerm]);

/******** BUSCADOR CON USE MEMO***********/
//   const filteredUsers = useMemo(() =>
//   pokemons.filter((user) => {
//     return user.name.toLowerCase().includes(searchTerm.toLowerCase());
//   }),
//   [pokemons, searchTerm]
// )


  /****** USE EFFECT En useEffect se pasa una Funcion anonima y variable que va a estar escuhando si no hay una variable sera un arreglo vacio****/
  const arr = [];
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=500')
    .then((response) => response.json())
    .then((data) => setResult(
    data.results.map((item) => {
      fetch(item.url)
      .then((response) => response.json())
      .then((allpokemon) => arr.push(allpokemon));
      setPokemons(arr);
      setSearchResults(arr);
      dispatch(arr)
      return item.url;
    }),
  ));
  }, []);
  setTimeout(() => {
    setLoad(false);
    }, 1000);

    const handleClick = favorite => {
      dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

  return (
    <>
    <div className="search">
      <span>
        <input className="searchTerm" id="element" type="text" placeholder="Busca tu pokemon!"  value={searchTerm}
          onChange={handleChange} ref={searchInput}/>
          <label htmlFor="element">Pokemón</label>
      </span>
    </div>
    {/* BUSCADOR CON uSEMEMO */}
    {/* <div className="Search">
      <input type="text" value={searchTerm} onChange={handleChange} />
    </div> */}
    {/*
      {filteredUsers.map(character => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
        </div>
      ))} */}
    <div className= "">
    { load ? (
    <Loader />
    ) : (
      <>
        <div className='Characters__favorites'>
        <p className="Character__title">Pokemones favoritos:</p>

          {myfavorites.favorites.map(favorite => (
            <>
              <div key={favorite.id} >
                <div className='Characters--favorite'>
                  <img  src={favorite.sprites.front_default} alt='pokemon' />
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="Characters">

          {searchResults.map((poke, i) => (
          <div id={poke.id} key={poke.id} >
            <div className='Character'>
              <img  src={poke.sprites.front_default} alt='pokemon' />
              <div>
                <p className="Character--name">{poke.name}</p>
                <p className="Character--type">Type: {poke.types[0].type.name}</p>
              </div>
            <button className="Character--buttonFav" type="button" onClick={() => handleClick(poke)}>Agregar a favoritos</button>

            </div>
          </div>
          ))}
        </div>

      </>
    )}
  </div>
  </>
  );
}

export default Characters;

// import React, { useState, useEffect, useReducer } from 'react';

// const initialState = {
//   favoritesj: []
// }

// const favoriteReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_FAVORITE':
//       return {
//         ...state,
//         favoritesj: [...state.favoritesj, action.payload]
//       };
//     default:
//       return state;
//   }
// }

// const Characters = () => {
//   const [characters, setCharacters] = useState([]);
//   const [myfavorites, dispatch] = useReducer(favoriteReducer, initialState);

//   useEffect(() => {
//     fetch('https://rickandmortyapi.com/api/character/')
//       .then(response => response.json())
//       .then(data => setCharacters(data.results));
//   }, []);

//   const handleClick = favorite => {
//     dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
//   }

//   return (
//     <div className="Characters">

//       {myfavorites.favoritesj.map(favorite => (
//         <li key={favorite.id}>
//           {favorite.name}
//         </li>
//       ))}

//       {characters.map(character => (
//         <div className="item" key={character.id}>
//           <h2>{character.name}</h2>
//           <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Characters;