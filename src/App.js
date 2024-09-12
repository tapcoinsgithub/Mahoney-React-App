import './App.css';
import LogReg from './components/LogReg';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Create from './components/Create';
import View from './components/View';
import Stats from './components/Stats';
import { useEffect, createContext, useState } from 'react';

export class User {
  username;
  password;
}

export const UserContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(loggedIn)
  })
  if (loggedIn){
    return (
      <>
      <UserContext.Provider value={[loggedIn, setLoggedIn]}>
        
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/logReg" element={<LogReg />} />
          </Routes>
        </div>
      </UserContext.Provider>
      
      </>
      
    );
  }
  else{
    return (
      <>
      <UserContext.Provider value={[loggedIn, setLoggedIn]}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/logReg" element={<LogReg />} />
          </Routes>
        </div>
      </UserContext.Provider>
      
      </>
      
    );
  }
  
}

export default App;
