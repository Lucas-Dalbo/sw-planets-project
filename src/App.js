import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planets</h1>
      <Filters />
      <div className="table-wrapper">
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
