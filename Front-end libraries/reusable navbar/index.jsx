export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <a href='#'>Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="#">Widgets</a>
        </li>
        <li className="nav-item">
          <button aria-expanded="false">Apps</button>
          <ul className="sub-menu" aria-label="Apps">
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
};

export const Footer = () => {
  return (
    <footer className='footer'>
      <p>2025 All rights reserved ©.</p>
      <ul>
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <a href='#'>Team
          </a>
        </li>
      </ul>
      <ul>
        <li><a href='#'>Privacy Policy</a></li>
        <li><a href='#'>Terms and Conditions</a></li>
      </ul>
      <ul>
        <li>Built in 🇦🇪</li>
        <li>Registered in BVA</li>
      </ul>
    </footer>
  )
};