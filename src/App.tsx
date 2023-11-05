import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlanetPage from './components/PlanetPage';

const planets: string[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

function App() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const toggleMobileNavButton = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  useEffect(() => {
    if (isMobileNavActive) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    // Clean up when component is unmounted
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [isMobileNavActive]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <header>
        <h1 className="header__title">the planets</h1>
        <button
          className="mobile-nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={`${isMobileNavActive ? 'true' : 'false'}`}
          onClick={toggleMobileNavButton}
          data-visible={`${isMobileNavActive ? 'true' : 'false'}`}
        >
          <span className="sr-only">Menu</span>
        </button>
        <nav>
          <ul
            id="primary-navigation"
            data-visible={`${isMobileNavActive ? 'true' : 'false'}`}
            className="primary-nav"
          >
            {planets.map((planet) => (
              <li
                className="primary-nav__container"
                onClick={toggleMobileNavButton}
              >
                <div>
                  <span
                    className={`primary-nav__circle primary-nav--${planet}`}
                  ></span>
                  <NavLink className="primary-nav__link" to={planet}>
                    {planet}
                  </NavLink>
                </div>
                <img
                  className="primary-nav__img"
                  src={import.meta.env.BASE_URL + '/assets/icon-chevron.svg'}
                />
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/earth" />}></Route>
        <Route
          path=":planetName"
          element={<PlanetPage isNavActive={isMobileNavActive} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
