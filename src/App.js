import React, { Component } from 'react'
import './App.css';
import { getQueries } from './services/api-helper.js';

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

  handleSubmit = async () => {
    const allQueries = await getQueries(this.state.apiForm.host, this.state.apiForm.apiKey);
    this.setState({
      queries: allQueries
    })
  }

  handleApiFormChange = (e) => {
    const { name, value } = e.target;
    this.setState( prevState => ({
      apiForm: {
        // ...prevState.apiForm,
        [name]: value
      }
    }), () => {console.log('name:', name, 'value', value)})
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
        />
      </div>
    );
  }
}

