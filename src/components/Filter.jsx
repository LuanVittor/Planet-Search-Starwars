import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

const type = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function Filter() {
  const { filter, handleChange, getTypeComparison,
    getTypeColumn, getTypevalue, filterByNumericValues, channgeFilter,
  } = useContext(FilterContext);

  return (
    <div>
      <label htmlFor="filter-name">
        Search
        <input
          value={ filter }
          type="text"
          data-testid="name-filter"
          name="filter-name"
          onChange={ handleChange }
        />
      </label>
      <select
        onChange={ ({ target }) => getTypeColumn(target.value) }
        data-testid="column-filter"
      >
        {type.map((elem, i) => (
          <option key={ i } value={ elem }>{ elem }</option>
        ))}
      </select>
      <select
        onChange={ ({ target }) => getTypeComparison(target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ filterByNumericValues[0].value }
        type="number"
        data-testid="value-filter"
        onChange={ getTypevalue }

      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ channgeFilter }
      >
        Filtrar
      </button>
    </div>
  );
}
