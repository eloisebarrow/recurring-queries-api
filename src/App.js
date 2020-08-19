import React, { useState } from 'react'
import './App.css';
import { getQueries, getCancelRecurringQueries, errors } from './services/api-helper.js';

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
  const [formUserId, setFormUserId] = useState('')
  const [currentHost, setCurrentHost] = useState('')
  const [currentApiKey, setCurrentApiKey] = useState('')
  const [apiListLoading, setApiListLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState('')

  // grab values from QueryForm and use them to set state
  const handleApiFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'host': 
        setFormHost(value)
        break;
      case 'apiKey':
        setFormApiKey(value);
        break;
      case 'userId':
        setFormUserId(value);
        break;
      default:
        setError(value)
    }
  }
  
  const handleApiErrors = (errorMessage) => {
    let errorPhrase = errorMessage.split(' ')
    let errorCode = parseInt(errorPhrase[errorPhrase.length - 1])
    switch (errorCode) {
      case 400:
        setError(`${errorMessage}: ${errors[400]}`)
        break;
      case 403:
        setError(`${errorMessage}: ${errors[403]}`)
        break;
      case 500:
        setError(`${errorMessage}: ${errors[500]}`)
        break;
      case 503:
        setError(`${errorMessage}: ${errors[503]}`)
        break;
      default:
        setError(`${errorMessage}`)
    }
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
    queryApi(formHost, formApiKey, formUserId)

    clearSearchInput();

    document.querySelector('.input-host').focus();
  }

  const queryApi = async (host, apiKey, userId) => {
    const allQueries = await getQueries(host, apiKey, userId)
    setApiListLoading(false)
    setQueries(allQueries.queries)
    setCurrentHost(host)
    setCurrentApiKey(apiKey)
    setFormHost('')
    setFormApiKey('')
    setFormUserId('')

    allQueries.error ? handleApiErrors(allQueries.error) : clearError()
  }

  const handleCancelQuery = async (queryId) => {
    await getCancelRecurringQueries(currentHost, currentApiKey, queryId);
    // cancelQueries.error ? handleApiErrors(cancelQueries.error) : 
    const newQueries = queries.filter((query) => query.query_id !== queryId)
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
        userId={formUserId}
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