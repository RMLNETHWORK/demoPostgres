import { useState, useRef, useEffect, useCallback } from 'react';
import '../jsComponentsCSS/MASTER.css';
import '../jsComponentsCSS/navbar.css';
import logo from '../assets/images/logo/PROJECT-LYNXZORA-ICON.svg';

function Navbar({ onHamburgerToggle, sidebarPinned }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);
    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') clearSearch();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target))
                setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchResults = useCallback(async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setResults(data);
            setShowDropdown(true);
        } catch (err) {
            console.error('Search error:', err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchResults(val), 350);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowDropdown(false);
        inputRef.current?.blur();
    };

    const handleResultClick = (item) => {
        console.log('Selected:', item);
        setShowDropdown(false);
        setQuery(item.title);
    };

    return (
        <div id="navbar">
            <div className='leftNav'>
                {/* Hamburger — active class reflects pinned state */}
                <button
                    id="openMenu"
                    onClick={onHamburgerToggle}
                    className={sidebarPinned ? 'active' : ''}
                    aria-label="Toggle sidebar"
                    aria-pressed={sidebarPinned}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22">
                        <g>
                            <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
                            <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z"/>
                            <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z"/>
                        </g>
                    </svg>
                </button>

                <div className="leftNavLogo">
                    <img src={logo} className="logo" alt="Logo" />
                    <h1 id="title">Quizinix</h1>
                </div>
            </div>

            <div id="searchContainer" ref={wrapperRef}>
                <form id="searchForm" onSubmit={(e) => { e.preventDefault(); fetchResults(query); }} role="search">
                    <div id="searchWrapper" className={isFocused ? 'focused' : ''}>
                        <svg id="searchIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            ref={inputRef}
                            type="search"
                            name="search"
                            id="searchBar"
                            placeholder="Search"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => { setIsFocused(true); if (results.length > 0) setShowDropdown(true); }}
                            onBlur={() => setIsFocused(false)}
                            autoComplete="off"
                            aria-label="Search"
                        />
                        {isLoading && <div id="searchSpinner" />}
                        {query && !isLoading && (
                            <button type="button" id="searchClear" onClick={clearSearch} aria-label="Clear search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        )}
                        {!query && !isFocused && (
                            <span id="searchKbd">
                                <kbd>Ctrl</kbd><kbd>K</kbd>
                            </span>
                        )}
                    </div>
                </form>

                {showDropdown && (
                    <div id="searchDropdown">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <div key={item.id} className="searchResult" onMouseDown={() => handleResultClick(item)}>
                                    <div className="resultThumb">
                                        {item.thumbnail_url
                                            ? <img src={item.thumbnail_url} alt="" />
                                            : <div className="resultThumbPlaceholder">▶</div>
                                        }
                                    </div>
                                    <div className="resultInfo">
                                        <span className="resultTitle">{item.title}</span>
                                        {item.description && <span className="resultDesc">{item.description}</span>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div id="searchEmpty">No results for "{query}"</div>
                        )}
                    </div>
                )}
            </div>

            <div id="buttons">
                <button className='btn' id="create">+ <span className="createT">Create</span></button>
                <button className='btn' id="notif">N</button>
            </div>
        </div>
    );
}

export default Navbar;