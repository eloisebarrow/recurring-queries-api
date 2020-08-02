import React from 'react'

export default function DisplayQueries(props) {
    return (
        <div className="query-results">
            <h4>Display Queries</h4>
            <tbody>
                <tr>
                    <th>Host</th>
                    <th>Query ID</th>
                    <th>Status</th>
                    <th>Cancel?</th>
                </tr>
                { props && props.queries && props.queries.queries && props.queries.queries.map( (query, key) => {
                    return (
                        <tr key={key}>
                            <td>{query.host}</td>
                            <td>{query.query_id}</td>
                            <td>{query.status}</td>
                            <td><button onClick={() => props.handleCancelQuery(query.query_id)}>Cancel</button></td>
                        </tr>
                    )
                })
                }
            </tbody>
        </div>
    )
}
