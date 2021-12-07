import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const { filterByName, filterByNumericValues,
    apiReturn, filterON } = useContext(FilterContext);

  const advancedFilter = () => {
    let objFiltered = apiReturn;
    filterByNumericValues.forEach((e) => {
      const { column, value, comparison } = e;
      objFiltered = objFiltered.filter((elem) => (elem.name.includes(filterByName.name)))
        .filter((elem) => {
          switch (comparison) {
          case 'maior que':
            return Number(elem[column]) > value;
          case 'menor que':
            return Number(elem[column]) < value;
          case 'igual a':
            return Number(elem[column]) === Number(value);
          default:
            return false;
          }
        });
    });
    return objFiltered.map((elem) => (
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
    ));
  };

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
        {(filterON) ? advancedFilter()
          : apiReturn.filter((elem) => (elem.name.includes(filterByName.name)))
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
            )) }
      </tbody>
    </table>
  );
}
