import React from 'react'

export default function QueryForm(props) {
    return (
        <div>
            <h4>Enter the domain and API key</h4>
            <form onSubmit={(e) => {
                e.preventDefault()
                props.handleSubmit()

            }}>
                <input 
                    onChange={(e) => props.handleApiFormChange(e)}
                    value={props.apiForm.host}
                    type="text" 
                    placeholder="Host"
                    name="host" 
                />
                <input 
                    onChange={(e) => props.handleApiFormChange(e)}
                    value={props.apiForm.apiKey}
                    type="text" 
                    placeholder="API key" 
                    name="apiKey"
                />
                <input type="submit"></input>
            </form>
        </div>
    )
}