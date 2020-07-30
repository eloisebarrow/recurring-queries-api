import React from 'react';
import './App.css';
import { getQueries } from './services/api-helper.js';

// components
import QueryForm from './components/QueryForm.jsx';
import DisplayQueries from './components/DisplayQueries.jsx';

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
      <DisplayQueries
        queries={queries}
      />
    </div>
  );
}

export default App;
