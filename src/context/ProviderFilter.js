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
  const [apiReturn, setApiReturn] = useState([]);

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

  const myContext = {
    filterByName: { name: filter },
    filterByNumericValues: filterAll,
    apiReturn,
    filterON,
    filterByvalue,
    type,
    filterByColumn,
    handleChange,
    getTypeComparison,
    getTypevalue,
    getTypeColumn,
    channgeFilter };

  return (
    <FilterContext.Provider value={ myContext }>
      { children }
    </FilterContext.Provider>
  );
}

ProviderFilter.propTypes = {
  children: PropTypes.node.isRequired,
};
