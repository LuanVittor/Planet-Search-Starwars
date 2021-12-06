import React from 'react';
import Table from './components/Table';
import './App.css';
import Filter from './components/Filter';
import ProviderFilter from './context/ProviderFilter';

function App() {
  return (
    <ProviderFilter>
      <Filter />
      <Table />
    </ProviderFilter>

  );
}

export default App;
