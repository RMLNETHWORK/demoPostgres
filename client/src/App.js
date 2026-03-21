import React, { useState, useEffect } from 'react'; // Added hooks
import './App.css';
import myLogo from './assets/images/logo/PROJECT-LYNXZORA-ICON.svg'; 

function App() {
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    // Fetch from your Express endpoint
    fetch("/test-db")
      .then(res => res.json())
      .then(data => setDbData(data[0].now)) // Accessing the 'now' property from Postgres
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={myLogo} className="App-logo" alt="logo" />
        <br/>
        <p>You are in the PROJECT-LYNXZORA testing port.</p>
        
        {/* Display the database result here */}
        <div style={{ padding: '20px', backgroundColor: '#282c34', border: '1px solid white' }}>
          <strong>Postgres Server Time:</strong> 
          <p>{dbData ? dbData : "Loading database connection..."}</p>
        </div>

        <p>Edit <code>src/App.js</code> and save to reload for testing.</p>
      </header>
    </div>
  );
}
export default App;