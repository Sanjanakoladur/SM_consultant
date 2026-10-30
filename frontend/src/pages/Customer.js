import { useEffect, useState } from 'react'; import api from '../services/api'; import PropertyCard from '../components/PropertyCard';
export default function Customer({ view }) { const [fav, setFav] = useState(null); const [enq, setEnq] = useState(null);
  useEffect(() => { api.get('/favourites').then((r) => setFav(r.data)); api.get('/enquiries/my').then((r) => setEnq(r.data)); }, []);
  return (<main className="wrap page"><h1>{view === 'enquiries' ? 'My enquiries' : 'Saved properties'}</h1>
    {view !== 'enquiries' && (!fav ? <p className="state">Loading…</p> : !fav.length ? <p className="state">Tap the heart on a property to save it here.</p> : <div className="grid">{fav.map((p) => <PropertyCard key={p._id} p={p} saved />)}</div>)}
    {view === 'enquiries' && (!enq ? <p className="state">Loading…</p> : !enq.length ? <p className="state">You have not sent any enquiries.</p> : <div className="tbl"><table><thead><tr><th>Property</th><th>Message</th><th>Status</th></tr></thead><tbody>{enq.map((e) => <tr key={e._id}><td>{e.property?.title}</td><td>{e.message}</td><td><span className="tag">{e.status}</span></td></tr>)}</tbody></table></div>)}</main>); }
