import React, { useState, useEffect } from 'react';
import './App.css';
import './jsComponentsCSS/MASTER.css';
import Navbar from './jsComponents/navbar';
import Sidebar from './jsComponents/sidebar';
import Content from './jsComponents/mainContent';

function App() {
  const [dbData, setDbData] = useState(null);
  const [sidebarPinned, setSidebarPinned] = useState(false);

  useEffect(() => {
    fetch("/test-db")
      .then(res => res.json())
      .then(data => setDbData(data[0].now))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="App">
      <Navbar onHamburgerToggle={() => setSidebarPinned(p => !p)} sidebarPinned={sidebarPinned} />
      <Sidebar pinned={sidebarPinned} />
      <Content sidebarPinned={sidebarPinned} />
    </div>
  );
}

export default App;