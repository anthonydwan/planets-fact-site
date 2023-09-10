import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <title>
          the planets
        </title>
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
        <Outlet />
      </main>
    </div>
  );
}
