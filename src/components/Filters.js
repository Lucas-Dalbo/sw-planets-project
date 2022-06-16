import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const options = [
  'population', 'rotation_period',
  'orbital_period', 'diameter', 'surface_water',
];

function Filters() {
  const {
    onNameFilter,
    onNumericFilter,
    onDeleteFilter,
    onDeleteAllFiters,
    onSortOrder,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [numbFilter, setNumbFilter] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [freeFilters, setFreeFilters] = useState([]);

  const [orderSort, setOrderSort] = useState({ column: 'population', sort: 'ASC' });

  const handleSortRadio = ({ target }) => {
    const newSort = target.value;
    setOrderSort((prev) => ({
      ...prev,
      sort: newSort,
    }));
  };

  const handleSortColumn = ({ target }) => {
    const newColunm = target.value;
    setOrderSort((prev) => ({
      ...prev,
      column: newColunm,
    }));
  };

  const handleChange = ({ target }) => {
    const newValue = { [target.name]: target.value };
    setNumbFilter((previous) => ({
      ...previous,
      ...newValue,
    }));
  };

  const onClickNumbFilter = () => {
    onNumericFilter(numbFilter);
    setNumbFilter((previous) => ({
      ...previous,
      comparison: 'maior que',
      value: 0,
    }));
  };

  const onClickSort = () => {
    onSortOrder(orderSort);
  };

  const onClickDeleteFilter = ({ target }) => {
    const removedFilter = JSON.parse(target.value);
    onDeleteFilter(removedFilter);
  };

  useEffect(() => {
    const renderOptions = () => {
      const usedFilters = filterByNumericValues.map((filter) => filter.column);
      const avaliableFilters = options.filter((option) => !usedFilters.includes(option));
      setFreeFilters(avaliableFilters);
      setNumbFilter((prev) => ({
        ...prev,
        column: avaliableFilters[0],
      }));
    };
    renderOptions();
  }, [filterByNumericValues]);

  return (
    <section>
      <div>
        <input
          id="name-filter"
          type="text"
          placeholder="Procure por um planeta"
          onChange={ ({ target: { value } }) => onNameFilter(value) }
          data-testid="name-filter"
        />
      </div>
      <div>
        <label htmlFor="column">
          Column
          <select
            id="column"
            name="column"
            value={ numbFilter.column }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            { freeFilters.length === 0
              ? <option>Sem filtros disponiveis</option>
              : freeFilters.map((filter) => (
                <option key={ filter }>{filter}</option>
              ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison
          <select
            id="comparison"
            name="comparison"
            value={ numbFilter.comparison }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            id="value"
            type="number"
            name="value"
            value={ numbFilter.value }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          disabled={ freeFilters.length === 0 }
          onClick={ onClickNumbFilter }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
      </div>
      <div>
        <label htmlFor="columnSort">
          Column
          <select
            id="columnSort"
            name="column"
            onChange={ handleSortColumn }
            data-testid="column-sort"
          >
            { options.map((option) => (
              <option key={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div>
          <label htmlFor="sort-cres">
            <input
              type="radio"
              id="sort-cres"
              name="sort-type"
              value="ASC"
              onChange={ handleSortRadio }
              defaultChecked
              data-testid="column-sort-input-asc"
            />
            Crescente
          </label>
          <label htmlFor="sort-decres">
            <input
              type="radio"
              id="sort-decres"
              name="sort-type"
              value="DESC"
              onChange={ handleSortRadio }
              data-testid="column-sort-input-desc"
            />
            Decrescente
          </label>
        </div>
        <button
          type="button"
          onClick={ onClickSort }
          data-testid="column-sort-button"
        >
          ORDENAR
        </button>
      </div>
      {
        filterByNumericValues.length > 0 && (
          <div>
            { filterByNumericValues.map((filter) => (
              <div key={ filter.column } data-testid="filter">
                <p>
                  <span>{filter.column}</span>
                  {' '}
                  <span>{filter.comparison}</span>
                  {' '}
                  <span>{filter.value}</span>
                </p>
                <button
                  type="button"
                  value={ JSON.stringify(filter) }
                  onClick={ onClickDeleteFilter }
                >
                  X
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={ () => onDeleteAllFiters() }
                data-testid="button-remove-filters"
              >
                REMOVER FILTROS
              </button>
            </div>
          </div>
        )
      }

    </section>
  );
}

export default Filters;
