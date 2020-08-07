import React from 'react'

export default function Modal() {
    return (
        <div className="modal-container">
            <div className="modal">
                <h2>Delete Recurring Query</h2>
                <p>You're about to delete query...</p>
                <p>Are you sure you would like to do this?</p>
                <button>Cancel</button>
                <button>Delete</button>
            </div>
        </div>
    )
}
