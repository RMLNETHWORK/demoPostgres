import { useState, useEffect, useRef } from 'react';
import '../jsComponentsCSS/MASTER.css';
import '../jsComponentsCSS/sidebar.css';
import "../assets/images/icons/uicons-bold-rounded/css/uicons-bold-rounded.css";

const NAV_ITEMS = [
    { icon: <span className="fi fi-br-dashboard-monitor"/>, label: 'Dashboard' },
    { icon: <span className="fi fi-br-student"/>, label: 'Students' },
    { icon: <span className="fi fi-br-users-class"/>, label: 'Classes' },
    { icon: <span className="fi fi-br-file-spreadsheet"/>, label: 'Reports' },
    { icon: <span className="fi fi-br-calendar"/>, label: 'Calendar' },
];

/* ── Show-more / show-less icons ── */
const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="currentColor" style={{ display: 'block', margin: '0 auto' }}>
        <circle cx="5"  cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        style={{ display: 'block', margin: '0 auto' }}>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6"  y1="6" x2="18" y2="18"/>
    </svg>
);

function Sidebar({ pinned }) {
    const [hovered,    setHovered]    = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile,   setIsMobile]   = useState(
        () => window.matchMedia('(max-width: 768px)').matches
    );

    const sidebarRef = useRef(null);

    /* ── Track viewport width changes ── */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => {
            setIsMobile(e.matches);
            if (!e.matches) setMobileOpen(false);
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* ── Close bottombar on outside tap/click (mobile only) ── */
    useEffect(() => {
        if (!isMobile || !mobileOpen) return;

        const handleOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };

        // touchstart for real touch devices, mousedown for desktop-emulated mobile
        document.addEventListener('touchstart', handleOutside);
        document.addEventListener('mousedown',  handleOutside);
        return () => {
            document.removeEventListener('touchstart', handleOutside);
            document.removeEventListener('mousedown',  handleOutside);
        };
    }, [isMobile, mobileOpen]);

    const isOpen = pinned || hovered;

    /*
     * On mobile, synthetic mouseenter/mouseleave events fired by touch
     * can leave `hovered` stuck at true, preventing the close button from
     * working. So on mobile we drive open state with mobileOpen only.
     */
    const effectiveOpen = isMobile ? mobileOpen : isOpen;

    const alwaysVisible = NAV_ITEMS.slice(0, 4);
    const overflowItems = NAV_ITEMS.slice(4);

    return (
        <>
            {/* Hover zone — desktop only, hidden on mobile via CSS */}
            {!pinned && (
                <div
                    id="sidebarHoverZone"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
            )}

            <div
                ref={sidebarRef}
                id="sidebar"
                className={effectiveOpen ? 'open' : ''}
                onMouseEnter={() => !pinned && !isMobile && setHovered(true)}
                onMouseLeave={() => !pinned && !isMobile && setHovered(false)}
            >
                <nav id="sidebarNav">

                    {/* ── Always-visible items (first 4) ── */}
                    {alwaysVisible.map((item) => (
                        <button key={item.label} className="sidebarItem">
                            <span className="sidebarIcon">{item.icon}</span>
                            <span className="sidebarLabel">{item.label}</span>
                        </button>
                    ))}

                    {/*
                     * ── Overflow items (index 4+) ──
                     * Desktop → always rendered
                     * Mobile  → only rendered when expanded
                     */}
                    {(!isMobile || mobileOpen) && overflowItems.map((item) => (
                        <button key={item.label} className="sidebarItem">
                            <span className="sidebarIcon">{item.icon}</span>
                            <span className="sidebarLabel">{item.label}</span>
                        </button>
                    ))}

                    {/*
                     * ── Show-more / close button — mobile only, rightmost slot ──
                     * Toggles mobileOpen; icon flips between ··· and ✕
                     */}
                    {isMobile && (
                        <button
                            className="sidebarItem"
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label={mobileOpen ? 'Show less' : 'Show more'}
                            aria-expanded={mobileOpen}
                        >
                            <span className="sidebarIcon">
                                {mobileOpen ? <CloseIcon /> : <MoreIcon />}
                            </span>
                            <span className="sidebarLabel">
                                {mobileOpen ? 'Close' : 'More'}
                            </span>
                        </button>
                    )}
                </nav>

                <div id="sidebarFooter">
                    <button className="sidebarItem">
                        <span className="fi fi-br-settings"></span>
                        <span className="sidebarLabel">Settings</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;