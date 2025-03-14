import React, { useState } from 'react';
import './preSideBar.css';

export default function PreSidebar() {
    const [hidden, setHidden] = useState(false);

    return (
        <div className={`preSidebar ${hidden ? 'collapsed' : ''}`}>
            <div className="logo">📁</div>
            <nav>
                <ul>
                    <li className="active">Home</li>
                    <li>Folders</li>
                </ul>
            </nav>
            <div className="hide-sidebar">
                <button onClick={() => setHidden(!hidden)}>
                    {hidden ? '=>' : '<='}
                </button>
            </div>
        </div>
    );
}
