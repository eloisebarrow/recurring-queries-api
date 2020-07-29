import React from 'react';
import './App.css';
import QueryForm from './components/QueryForm.jsx';

function App() {
  return (
    <div className="App">
      <h1>Recurring Queries</h1>
      <h3>Manage your recurring queries below</h3>
      <QueryForm />
    </div>
  );
}

export default App;
