import React, { useState } from 'react';
import FilterContext from './FilterContext';

export default function ProviderFilter({ children }) {
  const [filter, setFilter] = useState('');
  const [filterByColumn, setfilterByColumn] = useState('');
  const [filterByComparison, setfilterByComparison] = useState('maior que');
  const [filterByvalue, setfilterByvalue] = useState('');
  const [filterON, setFilterON] = useState();

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
