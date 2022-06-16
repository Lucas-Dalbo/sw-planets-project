import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetchSW from '../hooks/useFetchSW';

function PlanetsProvider({ children }) {
  const [{ load, data: planets, error }] = useFetchSW('planets');
  const [filteredPlanets, setFilteredPlanets] = useState(null);
  const [filterByName, setFilterName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: '', sort: '' });

  const onNameFilter = (value) => {
    setFilterName({ name: value });
  };

  const onNumericFilter = (data) => {
    setFilterByNumericValues((previous) => [
      ...previous,
      { column: data.column,
        comparison: data.comparison,
        value: data.value },
    ]);
  };

  const onSortOrder = (data) => {
    setOrder((previous) => ({
      ...previous,
      column: data.column,
      sort: data.sort,
    }));
  };

  const onDeleteFilter = (removedFilter) => {
    const newList = filterByNumericValues
      .filter((fil) => fil.column !== removedFilter.column);
    setFilterByNumericValues(newList);
  };

  const onDeleteAllFiters = () => {
    setFilterByNumericValues([]);
  };

  useEffect(() => {
    let newPlanets = planets.sort();
    // Filtro de Nome
    if (filterByName.name.length > 0) {
      newPlanets = newPlanets.filter(({ name }) => name.includes(filterByName.name));
    }
    // Filtro Numérico
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        switch (comparison) {
        case 'maior que':
          newPlanets = newPlanets
            .filter((planet) => planet[column] - value > 0);
          break;
        case 'menor que':
          newPlanets = newPlanets
            .filter((planet) => planet[column] - value < 0);
          break;
        default:
          newPlanets = newPlanets
            .filter((planet) => planet[column] === value);
          break;
        }
      });
    }
    setFilteredPlanets(newPlanets);
  }, [planets, filterByName, filterByNumericValues, order]);

  const contextValue = {
    planets: filteredPlanets || planets,
    load,
    error,
    filterByNumericValues,
    order,
    onNameFilter,
    onNumericFilter,
    onDeleteFilter,
    onDeleteAllFiters,
    onSortOrder,
  };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
