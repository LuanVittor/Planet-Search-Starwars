import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const { filterByName, filterByNumericValues,
    apiReturn, filterON, order, sortON } = useContext(FilterContext);

  const defaultSort = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      const Minusone = -1;
      return Minusone;
    }
    return 0;
  };

  const advancedSort = () => {
    const { column, sort } = order;
    const newSort = apiReturn.filter((elem) => (elem.name.includes(filterByName.name)))
      .sort((a, b) => {
        if (sort === 'ASC') {
          return a[column] - b[column];
        }
        return b[column] - a[column];
      });
    return newSort.map((elem) => (
      <tr key={ elem.name }>
        <td data-testid="planet-name">{ elem.name }</td>
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

  const advancedFilter = () => {
    let objFiltered = apiReturn;
    filterByNumericValues.forEach((e) => {
      const { column, value, comparison } = e;
      objFiltered = objFiltered.sort(defaultSort)
        .filter((elem) => (elem.name.includes(filterByName.name)))
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
    return objFiltered.map((element) => (
      <tr key={ element.name }>
        <td data-testid="planet-name">{ element.name }</td>
        <td>{ element.rotation_period }</td>
        <td>{ element.orbital_period }</td>
        <td>{ element.diameter }</td>
        <td>{ element.climate }</td>
        <td>{ element.gravity }</td>
        <td>{ element.terrain }</td>
        <td>{ element.surface_water }</td>
        <td>{ element.population }</td>
        <td>{ element.films }</td>
        <td>{ element.created }</td>
        <td>{ element.edited }</td>
        <td>{ element.url }</td>
      </tr>
    ));
  };

  const ternary = () => (
    (filterON) ? advancedFilter()
      : apiReturn.sort(defaultSort)
        .filter((elem) => (elem.name.includes(filterByName.name)))
        .map((elem) => (
          <tr key={ elem.name }>
            <td data-testid="planet-name">{ elem.name }</td>
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
        ))
  );

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
        {(sortON) ? advancedSort() : ternary()}
      </tbody>
    </table>
  );
}
