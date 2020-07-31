import React, { Component } from 'react'
import './App.css';
import { getQueries, getCancelRecurringQueries } from './services/api-helper.js';

// components
import QueryForm from './components/QueryForm.jsx';
import DisplayQueries from './components/DisplayQueries.jsx';

export default class App extends Component {
  constructor(props) {
  super(props)
    this.state = {
      queries: [],
      apiForm: {
        host: null,
        apiKey: null
      }
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

  // on clicking submit button, send host + apiKey from form to the recurring queries API
  // set results to queries array in state
  handleSubmit = async () => {
    const { host, apiKey } = this.state.apiForm;
    const allQueries = await getQueries(host, apiKey);
    this.setState({
      queries: allQueries
    }, () => {console.log(this.state.queries)})
  }

  handleDeleteQuery = async (queryId) => {
    const { host, apiKey } = this.state.apiForm;
    getCancelRecurringQueries(host, apiKey, queryId);
    this.setState(prevState => ({
      queries: prevState.queries.queries.filter((query) => query.query_id !== queryId)
    }), () => {console.log('queries after deletion', this.state.queries)})
  }

  render() {
    return (
      <div className="App">
        <h1>Recurring Queries</h1>
        <h3>Manage your recurring queries below</h3>
        <QueryForm
          handleSubmit={this.handleSubmit}  
          handleApiFormChange={this.handleApiFormChange}
          apiForm={this.state.apiForm}
        />
        <DisplayQueries
          queries={this.state.queries}
          handleDeleteQuery={this.handleDeleteQuery}
        />
      </div>
    );
  }
}

