import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const { filterByName, filterByNumericValues } = useContext(FilterContext);
  console.log(filterByNumericValues.comparison)

  const [apiReturn, setApiReturn] = useState([]);

  const requestApi = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((resp) => resp.json())
      .then((r) => setApiReturn(r.results));
  };

  const helpFilter = () => {
    let signal = '';
    if (filterByNumericValues.comparison === 'maior que') {
      signal = '>';
      return signal;
    } if (filterByNumericValues.comparison === 'menor que') {
      signal = '<';
      return signal;
    } if (filterByNumericValues.comparison === 'igual a') {
      signal = '===';
      return signal;
    }
    return signal;
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>

        </tr>
      </thead>
      <tbody>
        {/* implementando a logica de filtarr por filtro avancao linha 41 a linha 59 */}
        {/* {(filterByNumericValues && signal) ? 
          apiReturn.filter((elem) => (elem.name.includes(filterByName.name)))
          .map((elem) => (
            <tr key={ elem.name }>
              <td>{ elem.name }</td>
              <td>{ elem.rotation_period }</td>
              <td>{ elem.orbital_period }</td>
              <td>{ elem.diameter }</td>
              <td>{ elem.climate }</td>
              <td>{ elem.gravity }</td>
              <td>{ elem.terrain }</td>
              <td>{ elem.surface_water }</td>
              <td>{ elem.population }</td>
              <td>{ elem.films }</td>
              <td>{ elem.created }</td>
              <td>{ elem.edited }</td>
              <td>{ elem.url }</td>
            </tr>
        : */}
        {apiReturn.filter((elem) => (elem.name.includes(filterByName.name)))
          .map((elem) => (
            <tr key={ elem.name }>
              <td>{ elem.name }</td>
              <td>{ elem.rotation_period }</td>
              <td>{ elem.orbital_period }</td>
              <td>{ elem.diameter }</td>
              <td>{ elem.climate }</td>
              <td>{ elem.gravity }</td>
              <td>{ elem.terrain }</td>
              <td>{ elem.surface_water }</td>
              <td>{ elem.population }</td>
              <td>{ elem.films }</td>
              <td>{ elem.created }</td>
              <td>{ elem.edited }</td>
              <td>{ elem.url }</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
