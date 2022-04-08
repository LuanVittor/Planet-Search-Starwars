import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FilterContext from './FilterContext';

const TYPE = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function ProviderFilter({ children }) {
  const [type, setType] = useState(TYPE);
  const [filter, setFilter] = useState('');
  const [filterByColumn, setfilterByColumn] = useState(type[0]);
  const [filterByComparison, setfilterByComparison] = useState('maior que');
  const [filterByvalue, setfilterByvalue] = useState(0);
  const [filterAll, setFilterAll] = useState([]);
  const [filterON, setFilterON] = useState(false);
  const [sortON, setSortON] = useState(false);
  const [apiReturn, setApiReturn] = useState([]);
  const [typeSort, setTypeSort] = useState('population');
  const [sortPlanet, setSortPlanet] = useState('ASC');

  const requestApi = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((resp) => resp.json())
      .then((r) => setApiReturn(r.results));
  };

  const makeObj = () => {
    setFilterAll([...filterAll, {
      column: filterByColumn,
      comparison: filterByComparison,
      value: filterByvalue,
    }]);
  };

  useEffect(() => {
    requestApi();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const getTypeComparison = (value) => {
    setfilterByComparison(value);
  };

  const getTypeColumn = (value) => {
    setfilterByColumn(value);
  };

  const getTypevalue = ({ target: { value } }) => {
    setfilterByvalue(value);
  };

  const channgeFilter = () => {
    makeObj();
    const type2 = [...type];
    const i = type2.indexOf(filterByColumn);
    type2.splice(i, 1);
    setType(type2);
    setfilterByColumn(type2[0]);
    setFilterON(true);
  };

  const removeFilter = ({ target: { name } }) => {
    const updateFilter = filterAll
      .filter((elem) => elem.column !== name);
    setFilterAll([...updateFilter]);
    setType([...type, name]);
  };
  import { createContext } from 'react';

  const ApiContext = createContext();
  
  export default ApiContext;

  const filterSort = (sort) => {
    setSortPlanet(sort);
  };

  const sortOFF = () => {
    setSortON(true);
  };

  const myContext = {
    filterByName: { name: filter },
    filterByNumericValues: filterAll,
    order: { column: typeSort, sort: sortPlanet },
    apiReturn,
    filterON,
    filterByvalue,
    type,
    filterByColumn,
    typeSort,
    sortON,
    sortOFF,
    handleChange,
    getTypeComparison,
    getTypevalue,
    getTypeColumn,
    channgeFilter,
    removeFilter,
    filterSortInput,
    filterSort };

  return (
    <FilterContext.Provider value={ myContext }>
      { children }
    </FilterContext.Provider>
  );
}

ProviderFilter.propTypes = {
  children: PropTypes.node.isRequired,
};
