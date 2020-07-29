import React from 'react'

export default function QueryForm(props) {
    return (
        <div>
            <h4>Enter the domain and API key</h4>
            <form onSubmit={(e) => {
                e.preventDefault()
                props.handleSubmit()

            }}>
                <input type="text" placeholder="Domain"></input>
                <input type="text" placeholder="API key"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}
