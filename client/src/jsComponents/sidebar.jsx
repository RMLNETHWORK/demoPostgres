import { useState } from 'react';
import '../jsComponentsCSS/MASTER.css';
import '../jsComponentsCSS/sidebar.css';
import "../assets/images/icons/uicons-bold-rounded/css/uicons-bold-rounded.css";

const NAV_ITEMS = [
    { icon: '⊞', label: 'Home' },
    { icon: '▶', label: 'Videos' },
    { icon: '◈', label: 'Posts' },
    { icon: '✦', label: 'Explore' },
    { icon: '♡', label: 'Saved' },
];

function Sidebar({ pinned }) {
    const [hovered, setHovered] = useState(false);

    const isOpen = pinned || hovered;

    return (
        <>
            {/* Hover zone — only active when not pinned */}
            {!pinned && (
                <div
                    id="sidebarHoverZone"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
            )}

            <div
                id="sidebar"
                className={isOpen ? 'open' : ''}
                onMouseEnter={() => !pinned && setHovered(true)}
                onMouseLeave={() => !pinned && setHovered(false)}
            >
                <nav id="sidebarNav">
                    {NAV_ITEMS.map((item) => (
                        <button key={item.label} className="sidebarItem">
                            <span className="sidebarIcon">{item.icon}</span>
                            <span className="sidebarLabel">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div id="sidebarFooter">
                    <button className="sidebarItem">
                        <span className="sidebarIcon">⚙</span>
                        <span className="sidebarLabel">Settings</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;