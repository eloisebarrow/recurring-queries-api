import React from 'react'
import '../App.css'

export default function Header() {
    return (
        <div className="header-container">
            <h2 className="headline">Manage recurring queries</h2>
            <img 
                src={require("../assets/cb-logo-blue.png")} 
                alt="Chartbeat logo"
                className="cb-logo-header"></img>
        </div>
    )
}
