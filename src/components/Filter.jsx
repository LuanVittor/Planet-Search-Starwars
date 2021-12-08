import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function Filter() {
  const { filter, handleChange, getTypeComparison,
    getTypeColumn, getTypevalue, channgeFilter, filterByvalue, type, filterByColumn,
    filterByNumericValues, removeFilter, filterSortInput, typeSort, filterSort, sortOFF,
  } = useContext(FilterContext);

  const typedSort = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const filters = () => (
    filterByNumericValues.map((elem) => (
      <div key={ elem.column } data-testid="filter">
        <p>{`${elem.column} ${elem.comparison} ${elem.value}`}</p>
        <button
          type="button"
          name={ elem.column }
          onClick={ (event) => removeFilter(event) }
        >
          X
        </button>
      </div>
    ))
  );

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
        value={ filterByColumn }
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
        value={ filterByvalue }
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
      <select
        onChange={ ({ target }) => filterSortInput(target.value) }
        data-testid="column-sort"
        value={ typeSort }
      >
        {typedSort.map((elem, i) => (
          <option key={ i } value={ elem }>{ elem }</option>
        ))}
      </select>
      Ascendente
      <input
        type="radio"
        data-testid="column-sort-input-asc"
        name="sort"
        onChange={ () => filterSort('ASC') }
      />
      Descendente
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        name="sort"
        onChange={ () => filterSort('DESC') }

      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortOFF }
      >
        Ordernar
      </button>
      {filters()}
    </div>
  );
}
