import React from 'react'
import '../App.css'

export default function QueryForm(props) {
    return (
        <div className="query-form">
            <h4>Enter the host and API key</h4>
            <form onSubmit={(e) => {
                props.handleSubmit(e)

            }}>
                <input 
                    onChange={(e) => props.handleApiFormChange(e)}
                    value={props.host}
                    type="text" 
                    placeholder="Host"
                    name="host" 
                />
                <input 
                    onChange={(e) => props.handleApiFormChange(e)}
                    value={props.apiKey}
                    type="password" 
                    placeholder="API key" 
                    name="apiKey"
                />
                <input type="submit" className="submit-button"></input>
            </form>
            <p className="error">{props.error}</p>
        </div>
    )
}