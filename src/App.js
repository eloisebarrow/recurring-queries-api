import React, { Component } from 'react'
import './App.css';
import { getQueries, getCancelRecurringQueries } from './services/api-helper.js';

// components
import Header from './components/Header.jsx';
import QueryForm from './components/QueryForm.jsx';
import DisplayQueries from './components/DisplayQueries.jsx';
import NoQueries from './components/NoQueries.jsx';

export default class App extends Component {
  constructor(props) {
  super(props)
    this.state = {
      queries: [],
      apiForm: {
        host: '',
        apiKey: ''
      },
      apiListLoading: false,
      error: ''
    }
  }

  // grab values from QueryForm and use them to set state
  handleApiFormChange = (e) => {
    const { name, value } = e.target;
    this.setState( prevState => ({
      apiForm: {
        ...prevState.apiForm,
        [name]: value
      }
    }))
  }

  handleGetQueriesError = () => {
    this.setState({
      error: "Uh oh... you may have a typo in your host or API key. Try again."
    })
  }

  clearError = () => {
    this.setState({
      error: ''
    })
  }

  clearCurrentQueries = () => {
    this.setState({
      queries: []
    })
  }

  // on clicking submit button, do the following:
  // clear queries array
  // set Loading to true
  // send host + apiKey from form to the recurring queries API
  // set results to queries array in state
  handleSubmit = async () => {
    this.clearCurrentQueries();

    const { host, apiKey } = this.state.apiForm;
    this.setState( { apiListLoading: true }, async () => {
      const allQueries = await getQueries(host, apiKey);
      this.setState({ 
        apiListLoading: false,
        queries: allQueries
      })
      allQueries.error ? this.handleGetQueriesError() : this.clearError()
    })
  }

  handleCancelQuery = async (queryId) => {
    const { host, apiKey } = this.state.apiForm;
    await getCancelRecurringQueries(host, apiKey, queryId);
    this.setState(prevState => ({
      queries: prevState.queries.queries.filter((query) => query.query_id !== queryId)
    }), () => {console.log('queries after deletion', this.state.queries)})
  }

  render() {
    return (
      <div className="App">
        <Header />
        <QueryForm
          handleSubmit={this.handleSubmit}  
          handleApiFormChange={this.handleApiFormChange}
          apiForm={this.state.apiForm}
          error={this.state.error}
        />
        <DisplayQueries
          queries={this.state.queries}
          handleCancelQuery={this.handleCancelQuery}
          apiListLoading={this.state.apiListLoading}
        />
        { (this.state.queries.length === 0) && (!this.state.apiListLoading) ? <NoQueries /> : null }
      </div>
    );
  }
}

