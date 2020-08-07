import React from 'react'
import '../App.css'

export default function Modal() {
    return (
        <div className="modal-container">
            <div className="modal">
                <header>
                    <h2>Delete Recurring Query</h2>
                </header>
                <section>
                    <section className="delete-text">
                        <p>You're about to delete this query.</p>
                        <p>Are you sure you would like to do this?</p>
                    </section>
                    <button className="action-cancel">Cancel</button>
                    <button className="action-delete">Delete</button>
                </section>
            </div>
        </div>
    )
}
