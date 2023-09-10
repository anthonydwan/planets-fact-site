import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';

import PlanetPage from './components/PlanetPage';

// // In React router 6.4
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       {/* this routes are relative to the parent path */}
//       <Route index element={<Home />}>
//         <Route path="structure" />
//         <Route path="surface" />
//       </Route>
//     </Route>
//   )
// );

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
  return (
    <BrowserRouter>
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
                <span
                  className={`primary-nav__circle primary-nav--${planet}`}
                ></span>
                <NavLink className="primary-nav__link" to={planet}>
                  {planet}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/earth" />}></Route>
        <Route path=":planetName" element={<PlanetPage />}></Route>
      </Routes>
    </BrowserRouter>
  );

  // <RouterProvider router={router} />;
}

export default App;
