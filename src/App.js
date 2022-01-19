import React, { useEffect, useState } from 'react';
import SearchCity from './components/search-city/search-city';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import './App.scss';

function App() {
  const [timeNow, setTimeNow] = useState('');
  const [timeInterval, setTimeInterval] = useState();
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    updateTimeNow();

    setTimeout(() => {
      updateTimeNow();
      setTimeInterval(setInterval(updateTimeNow, 60 * 1000));
    }, (60 - new Date().getSeconds()) * 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    setSelectedCities([...selectedCities]);
  }, [timeNow]);

  const getFormateTime = (date) => {
    var h = date.getHours(),
      m = date.getMinutes();

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;

    return `${h}:${m}`;
  };

  const updateTimeNow = () => {
    setTimeNow(getFormateTime(new Date()));
  };

  const getTimeOfTZ = (timeZone) => {
    const d = new Date();
    return new Date(
      `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${timeNow}`
    ).toLocaleString('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const selectCity = (city) => {
    setSelectedCities([...selectedCities, city]);
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c.name !== city.name));
  };

  return (
    <>
      <Header />
      <div id='content' className='align-center'>
        <form className='enter-time' onSubmit={(e) => e.preventDefault()}>
          <div className='form-row align-left'>
            <label>Enter time</label>
          </div>
          <div className='form-row'>
            <input
              className='align-center'
              type='text'
              value={timeNow}
              onChange={(e) => {
                clearInterval(timeInterval);
                setTimeNow(e.target.value);
              }}
            />
          </div>
          <div className='form-row align-right'>
            <button type='button' onClick={updateTimeNow}>
              Time now
            </button>
          </div>
        </form>
        <SearchCity selectedCities={selectedCities} selectCity={selectCity} />
        <div id='selected-cities' className='align-left'>
          <div className='cities-header'>
            <div className='col'>City</div>
            <div className='col'>Time</div>
            <div className='col'>TZ</div>
          </div>
          {selectedCities.length === 0 && (
            <div className='no-city'>
              No city selected! <span className='emoji'>🙃</span>
            </div>
          )}
          {selectedCities.map(function (item, index) {
            return (
              <div className='city-item' key={`city-${index}`}>
                <div className='col'>{item.name}</div>
                <div className='col'>{getTimeOfTZ(item.tz)}</div>
                <div className='col'>{item.tz}</div>
                <div className='col-action'>
                  <button type='button' onClick={() => removeCity(item)}>
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
