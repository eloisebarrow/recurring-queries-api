import React, { useState } from 'react'
import './App.css';
import { getQueries, getCancelRecurringQueries } from './services/api-helper.js';

// COMPONENTS
import Header from './components/Header.jsx';
import QueryForm from './components/QueryForm.jsx';
import DisplayQueries from './components/DisplayQueries.jsx';
import NoQueries from './components/NoQueries.jsx';

export default function App() {
  // HOOKS
  const [queries, setQueries] = useState([])
  const [formHost, setFormHost] = useState('')
  const [formApiKey, setFormApiKey] = useState('')
  const [currentHost, setCurrentHost] = useState('')
  const [currentApiKey, setCurrentApiKey] = useState('')
  const [apiListLoading, setApiListLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState('')

  // grab values from QueryForm and use them to set state
  const handleApiFormChange = (e) => {
    const { name, value } = e.target;
    name === 'host' ? setFormHost(value) : setFormApiKey(value)
  }

  const handleApiErrors = (errorMessage) => {
    setError(errorMessage)
  }

  const clearError = () => {
    setError('')
  }

  const clearCurrentQueries = () => {
    setQueries([])
  }

  const clearSearchInput = () => {
    setSearchInput('')
  }

  // on clicking submit button, do the following:
  // clear queries array
  // set Loading to true
  // call queryApi function in order to: 
  // send host + apiKey from form to the recurring queries API
  // set results to queries array in state
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearCurrentQueries();

    setApiListLoading(true)
    queryApi(formHost, formApiKey)

    clearSearchInput();

    document.querySelector('.input-host').focus();
  }

  const queryApi = async (host, apiKey) => {
    const allQueries = await getQueries(host, apiKey)
    setApiListLoading(false)
    setQueries(allQueries.queries)
    setCurrentHost(host)
    setCurrentApiKey(apiKey)
    setFormHost('')
    setFormApiKey('')

    allQueries.error ? handleApiErrors(allQueries.error) : clearError()
  }

  const handleCancelQuery = async (queryId) => {
    await getCancelRecurringQueries(currentHost, currentApiKey, queryId);
    // cancelQueries.error ? handleApiErrors(cancelQueries.error) : 
    const newQueries = queries.queries.filter((query) => query.query_id !== queryId)
    setQueries(newQueries)
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
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      { (queries && queries.queries && queries.queries.length === 0) ? <NoQueries /> : null }
    </div>
  );
}