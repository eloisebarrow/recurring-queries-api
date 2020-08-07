import React from 'react'
import '../App.css'

export default function Header() {
    return (
        <div className="header-container">
            <h2 className="headline">Manage recurring queries</h2>
            <a 
              href="https://chartbeat.com/publishing/settings/api-keys/" 
              target="_blank" 
              rel="noopener noreferrer">
                <img 
                    src={require("../assets/cb-logo-blue.png")} 
                    alt="Chartbeat logo"
                    className="cb-logo-header"></img>
            </a>
        </div>
    )
}
