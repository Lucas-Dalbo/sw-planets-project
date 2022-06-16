import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const findMovieName = (film) => {
  const episode = film.split('/')[5];
  console.log(episode);
  if (episode === '1') return 'The Phantom Menace'
  if (episode === '2') return 'Attack of the Clones'
  if (episode === '3') return 'Revenge of the Sith'
  if (episode === '4') return 'A New Hope'
  if (episode === '5') return 'The Empire Strikes Back'
  if (episode === '5') return 'Return of the Jedi'
};

const willSort = (array, order) => {
  const SORT_MAGIC = -1;
  const sorted = array.sort((a, b) => {
    const { sort, column } = order;
    switch (sort) {
    case 'ASC':
      if (b[column] === 'unknown') return SORT_MAGIC;
      return Number(a[column]) - Number(b[column]);
    case 'DESC':
      if (b[column] === 'unknown') return SORT_MAGIC;
      return Number(b[column]) - Number(a[column]);
    default:
      if (a.name.toLowerCase() < b.name.toLowerCase()) return SORT_MAGIC;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    }
  });
  return sorted;
};

function Table() {
  const { planets, load, error, order } = useContext(PlanetsContext);

  const buildTable = () => {
    if (error) {
      return (
        <div>{error}</div>
      );
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          {willSort(planets, order)
            .map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((film) => (<p key={ film }>{findMovieName(film)}</p>))}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {load ? <p>Loading...</p> : buildTable()}
    </div>
  );
}

export default Table;
