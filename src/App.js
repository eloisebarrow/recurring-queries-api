import React from 'react';
import './App.css';
import QueryForm from './components/QueryForm.jsx';
import { getQueries } from './services/api-helper.js';

function App() {

  const [ queries, setQueries ] = React.useState([])

  const handleSubmit = async () => {
    const allQueries = await getQueries();
    setQueries(allQueries);
    // console.log(queries)
  }

  return (
    <div className="App">
      <h1>Recurring Queries</h1>
      <h3>Manage your recurring queries below</h3>
      <QueryForm
        handleSubmit={handleSubmit}  
      />
    </div>
  );
}

export default App;
