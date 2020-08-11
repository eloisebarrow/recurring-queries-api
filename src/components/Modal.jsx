import React from 'react'
import '../App.css'

export default function Modal(props) {
    return (
        <div className="modal-container">
            <div className="modal">
                <header>
                    <h2>Delete Recurring Query</h2>
                </header>
                <section>
                    <section className="delete-text">
                        <p>You're about to delete this query.</p>
                        <p>Are you sure you would like to proceed?</p>
                    </section>
                    <button 
                        className="action-cancel"
                        onClick={() => props.setIsModalOpen(false)}>Cancel</button>
                    <button 
                        className="action-delete"
                        onClick={() => props.handleCancelQuery(props.currentQueryId)}>Delete</button>
                </section>
            </div>
        </div>
    )
}
