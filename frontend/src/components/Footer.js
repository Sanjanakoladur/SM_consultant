import { Link } from 'react-router-dom';
export default function Footer() { return (<footer className="foot"><div className="wrap foot-in">
  <div><div className="brand">SM<span> Consultant</span></div><p>Real estate consultancy for buying, selling, renting and leasing land and homes.</p></div>
  <div><h4>Explore</h4><Link to="/buy">Buy</Link><Link to="/rent">Rent</Link><Link to="/lease">Lease</Link><Link to="/sell">Sell</Link></div>
  <div><h4>Company</h4><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link></div>
  </div><div className="wrap copy">© {new Date().getFullYear()} SM Consultant</div></footer>); }
