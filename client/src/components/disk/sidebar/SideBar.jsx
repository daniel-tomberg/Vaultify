import React from 'react';
import './sideBar.css'



export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="home">Home</div>
            <nav>
                <ul>
                    <li className="active">All files</li>
                    <li>Photos</li>
                    <li>Shared</li>
                    <li>Signatures</li>
                    <li>File requests</li>
                    <li>Deleted files</li>
                </ul>
            </nav>
            <div className="quick-access">
                <h4>Quick Access</h4>
                <button>Starred</button>
                <button>Untitled</button>
            </div>
        </div>
    );
}
