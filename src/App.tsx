import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import Home from './components/Home';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="mercury">MERCURY</NavLink>
            </li>
            <li>
              <NavLink to="venus">VENUS</NavLink>
            </li>
            <li>
              <NavLink to="/">EARTH</NavLink>
            </li>
            <li>
              <NavLink to="mars">MARS</NavLink>
            </li>
            <li>
              <NavLink to="jupiter">JUPITER</NavLink>
            </li>
            <li>
              <NavLink to="saturn">SATURN</NavLink>
            </li>
            <li>
              <NavLink to="uranus">URANUS</NavLink>
            </li>
            <li>
              <NavLink to="neptune">NEPTUNE</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="mercury" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
