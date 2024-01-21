import React, { useState } from 'react';
import Weather from './weather.jsx';

const List = (props) => {
  const [show, setShow] = useState([]);

  if (!props.countries) return null;
  if (props.countries.length > 10) return <div>Too many matches, specify another filter</div>;

  if (props.countries.length === 1) {
    const country = props.countries[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <div>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <Weather data={country} />
        <div>
          <img src={country.flags.png} alt="flag" />
        </div>
      </div>
    );
  } else {
    const handleClick = (event, country) => {
      event.preventDefault();
      if (!show.includes(country.name.common)) {
        setShow(show.concat(country.name.common));
      } else {
        setShow(show.filter((s) => s !== country.name.common));
      }
    };

    const Button = (props) => {
      return (
        <button onClick={props.handleClick}>
          {props.text}
        </button>
      );
    };

    const Result = (props) => {
      let res = [];
      props.countries.forEach((country) => {
        if (show.includes(country.name.common)) {
          const languages = Object.values(country.languages);
          res.push(
            <div key={country.name.common}>
              <h1>
                {country.name.common} <Button handleClick={(event) => handleClick(event, country)} text="hide" />
              </h1>
              <div>Capital: {country.capital}</div>
              <div>Area: {country.area}</div>
              <h2>Languages</h2>
              <div>
                <ul>
                  {languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
              <Weather data={country} />
              <div>
                <img src={country.flags.png} alt="flag" />
              </div>
            </div>
          );
        } else {
          res.push(
            <div key={country.name.common}>
              {country.name.common} <Button handleClick={(event) => handleClick(event, country)} text="show" />
            </div>
          );
        }
      });
      return res;
    };

    return (
      <div>
        <Result countries={props.countries} />
      </div>
    );
  }
};

export default List;