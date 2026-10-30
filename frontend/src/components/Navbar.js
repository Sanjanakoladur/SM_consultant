import { useState } from 'react'; import { Link, NavLink, useNavigate } from 'react-router-dom'; import { Menu, X, ChevronDown } from 'lucide-react'; import { useAuth, home } from '../context/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth(); const [open, setOpen] = useState(false); const [dd, setDd] = useState(false); const nav = useNavigate(); const close = () => { setOpen(false); setDd(false); };
  return (<header className="nav"><div className="wrap nav-in">
    <Link to="/" className="brand" onClick={close}>SM<span> Consultant</span></Link>
    <button className="icon-btn menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={'links' + (open ? ' open' : '')} aria-label="Main">
      <NavLink end to="/" onClick={close}>Home</NavLink>
      <div className="dd"><button className="ddb" aria-expanded={dd} onClick={() => setDd(!dd)}>Buy <ChevronDown size={16} /></button>
        {dd && <div className="ddm" onMouseLeave={() => setDd(false)}>{[['Land and plots', 'land'], ['Houses', 'houses'], ['Apartments', 'apartments'], ['Commercial', 'commercial']].map(([l, p]) => <Link key={p} to={'/buy/' + p} onClick={close}>{l}</Link>)}</div>}</div>
      <NavLink to="/sell" onClick={close}>Sell</NavLink><NavLink to="/rent" onClick={close}>Rent</NavLink><NavLink to="/lease" onClick={close}>Lease</NavLink>
      <NavLink to="/about" onClick={close}>About</NavLink><NavLink to="/contact" onClick={close}>Contact</NavLink>
      <Link className="btn" to="/owner/submit-property" onClick={close}>Submit property</Link>
      {user ? <><Link to={home(user)} onClick={close}>{user.fullName.split(' ')[0]}</Link><button className="link-btn" onClick={async () => { await logout(); close(); nav('/'); }}>Log out</button></>
        : <><Link to="/login" onClick={close}>Log in</Link><Link to="/register" onClick={close}>Register</Link></>}
    </nav></div></header>);
}
