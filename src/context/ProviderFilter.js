import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FilterContext from './FilterContext';

export default function ProviderFilter({ children }) {
  const [filter, setFilter] = useState('');
  const [filterByColumn, setfilterByColumn] = useState('population');
  const [filterByComparison, setfilterByComparison] = useState('maior que');
  const [filterByvalue, setfilterByvalue] = useState(0);
  const [filterON, setFilterON] = useState(false);
  const [apiReturn, setApiReturn] = useState([]);

  const requestApi = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((resp) => resp.json())
      .then((r) => setApiReturn(r.results));
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
    setFilterON(true);
  };

  const myContext = {
    filterByName: { name: filter },
    filterByNumericValues: [{
      column: filterByColumn,
      comparison: filterByComparison,
      value: filterByvalue,
    }],
    apiReturn,
    filterON,
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
