import React, { useState } from 'react'
import './App.css';
import { getQueries, getCancelRecurringQueries } from './services/api-helper.js';

// components
import Header from './components/Header.jsx';
import QueryForm from './components/QueryForm.jsx';
import DisplayQueries from './components/DisplayQueries.jsx';
import NoQueries from './components/NoQueries.jsx';

export default function App() {
  // HOOKS
  const [queries, setQueries] = useState([])
  const [formHost, setFormHost] = useState('')
  const [formApiKey, setFormApiKey] = useState('')
  const [apiListLoading, setApiListLoading] = useState(false)
  const [error, setError] = useState('')

  // grab values from QueryForm and use them to set state
  const handleApiFormChange = (e) => {
    const { name, value } = e.target;
    name === 'host' ? setFormHost(value) : setFormApiKey(value)
  }

  const handleGetQueriesError = (errorMessage) => {
    setError(errorMessage)
  }

  const clearError = () => {
    setError('')
  }

  const clearCurrentQueries = () => {
    setQueries([])
  }

  // on clicking submit button, do the following:
  // clear queries array
  // set Loading to true
  // send host + apiKey from form to the recurring queries API
  // set results to queries array in state
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearCurrentQueries();

    setApiListLoading(true)
    queryApi(formHost, formApiKey)
  }

  const queryApi = async (host, apiKey) => {
    const allQueries = await getQueries(host, apiKey)
    setApiListLoading(false)
    setQueries(allQueries)
    setFormHost('')
    setFormApiKey('')

    allQueries.error ? handleGetQueriesError(allQueries.error) : clearError()
  }

  const handleCancelQuery = async (queryId) => {
    await getCancelRecurringQueries(formHost, formApiKey, queryId);
    setQueries(queries.queries.filter((query) => query.query_id !== queryId))
  }

  return (
    <div className="App">
      <Header />
      <QueryForm
        handleSubmit={handleSubmit}  
        handleApiFormChange={handleApiFormChange}
        host={formHost}
        apiKey={formApiKey}
        error={error}
      />
      <DisplayQueries
        queries={queries}
        handleCancelQuery={handleCancelQuery}
        apiListLoading={apiListLoading}
      />
      { (queries && queries.queries && queries.queries.length === 0) ? <NoQueries /> : null }
    </div>
  );
}