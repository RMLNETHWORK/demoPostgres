import React, { useState, useEffect } from 'react';
import '../App.css';
import myLogo from '../assets/images/logo/PROJECT-LYNXZORA-ICON.png';
import '../jsComponentsCSS/MASTER.css';
import '../jsComponentsCSS/mainContent.css';

// Sidebar dimensions — must match sidebar.css exactly
const SIDEBAR_COLLAPSED = 56;   // width when unpinned
const SIDEBAR_EXPANDED  = 220;  // width when pinned
const SIDEBAR_LEFT      = 8;    // left offset of sidebar
const SIDEBAR_GAP       = 8;    // gap between sidebar and content

function MainContent({ sidebarPinned }) {
    const [dbData, setDbData] = useState(null);

    useEffect(() => {
        fetch("/test-db")
            .then(res => res.json())
            .then(data => setDbData(data[0].now))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const number = 3000;

    // When pinned: content starts after the expanded sidebar
    // When not pinned: content starts after the collapsed sidebar (icon strip)
        const isMobile = window.innerWidth <= 768;

        const sidebarWidth = sidebarPinned ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;
        const contentLeft  = SIDEBAR_LEFT + sidebarWidth + SIDEBAR_GAP;
        const RIGHT_MARGIN = 30;

        // On mobile, let CSS handle everything
        const inlineStyle = isMobile ? {} : {
            left: contentLeft,
            width: `calc(100vw - ${contentLeft}px - ${RIGHT_MARGIN}px)`
        };

        return (
            <div className="MainContent">
                <div className="temporaryContentHolder" style={inlineStyle}>
                <header className="App-header">
                    <img src={myLogo} className="App-logo" alt="logo" />
                    <p><strong className='PLT'>PROJECT-LYNXZORA</strong> (2026)</p>
                    <strong className='PostgresT'>Postgres Server Time:</strong>
                    <p className='PostgresI'>
                        {dbData ? dbData : `I you can see this, you are in the PROJECT-LYNXZORA development port. (${number})`}
                    </p>
                </header>
            </div>
        </div>
    );
}

export default MainContent;