import React, { useEffect, useState } from 'react';
import Cities from '../../libs/cities.json';
import './search-city.scss';

const SearchCity = (props) => {
  const [searchableCities, setSearchableCities] = useState(Cities);
  const [filteredCities, setFilteredCities] = useState(Cities);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const newCities = Cities.filter(
      (ar) => !props.selectedCities.find((rm) => rm.name === ar.name)
    );
    setSearchableCities(newCities);
    setFilteredCities(newCities);
  }, [props.selectedCities]);

  const searchCity = (e) => {
    const userInput = e.target.value;
    setInput(userInput);
    if (userInput === '') setFilteredCities(searchableCities);
    else
      setFilteredCities(
        searchableCities.filter(
          (city) =>
            city.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )
      );
  };

  const selectCity = (city) => {
    props.selectCity(city);
    setInput('');
    setShowResult(false);
  };

  return (
    <div className='search-city-container'>
      <input
        type='text'
        placeholder='Enter city name'
        value={input}
        onFocus={() => setShowResult(true)}
        onBlur={() => setTimeout(() => setShowResult(false), 200)}
        onChange={(e) => searchCity(e)}
      />
      {showResult && (
        <div className='cities-container'>
          {filteredCities.map(function (item, index) {
            return (
              <div
                className='city-item align-left'
                key={`city-${index}`}
                onClick={() => selectCity(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchCity;
