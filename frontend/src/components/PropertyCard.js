import { useState } from 'react'; import { Link } from 'react-router-dom'; import { Heart, MapPin, BedDouble, Ruler } from 'lucide-react'; import api, { money } from '../services/api'; import { useAuth } from '../context/AuthContext';
const L = { BUY: 'For sale', RENT: 'For rent', LEASE: 'For lease' };
export default function PropertyCard({ p, saved, onToggle }) { const { user } = useAuth(); const [s, setS] = useState(!!saved);
  const fav = async () => { if (!user) return (window.location.href = '/login'); s ? await api.delete('/favourites/' + p._id) : await api.post('/favourites/' + p._id); setS(!s); onToggle && onToggle(p._id); };
  return (<article className="card"><div className="img"><img src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=70'} alt={p.images?.[0]?.alt || p.title} loading="lazy" /><span className="badge">{L[p.transactionType]}</span>
    <button className={'heart' + (s ? ' on' : '')} aria-label={s ? 'Remove from favourites' : 'Save to favourites'} onClick={fav}><Heart size={18} /></button></div>
    <div className="body"><div className="price">{money(p.price, p.transactionType)}</div><h3><Link to={'/properties/' + p._id}>{p.title}</Link></h3>
      <p className="muted"><MapPin size={14} /> {[p.locality, p.city].filter(Boolean).join(', ')}</p>
      <p className="feat"><span>{p.propertyType.toLowerCase()}</span>{p.bedrooms > 0 && <span><BedDouble size={14} /> {p.bedrooms} bed</span>}{p.landArea > 0 && <span><Ruler size={14} /> {p.landArea} {p.landAreaUnit}</span>}</p></div></article>); }
