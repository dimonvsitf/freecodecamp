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

export function Card({ name, title, bio }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="card-title">{title}</p>
      <p>{bio}</p>
    </div>
  )
}

export function App() {
  return (
    <div className="flex-container">
      <Card
        name="Mark"
        title="Frontend developer"
        bio="I like to work with different frontend technologies and play video games."
      />
      <Card 
        name = "Tiffany"
        title = "Engineering manager"
        bio = "I have worked in tech for 15 years and love to help people grow in this industry."
      />

      <Card 
        name = "Doug"
        title = "Backend developer"
        bio = "I have been a software developer for over 20 years and I love working with Go and Rust."
      />
    </div>
  );
}