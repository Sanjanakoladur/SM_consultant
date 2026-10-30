import { useEffect, useState } from 'react'; import { useSearchParams } from 'react-router-dom'; import api, { errMsg } from '../services/api'; import PropertyCard from '../components/PropertyCard';
export default function Listings({ title, fixed = {} }) { const [sp, setSp] = useSearchParams(); const [d, setD] = useState(null); const [err, setErr] = useState(''); const q = Object.fromEntries(sp);
  useEffect(() => { setD(null); setErr(''); api.get('/properties', { params: { ...q, ...fixed } }).then((r) => setD(r.data)).catch((e) => setErr(errMsg(e))); }, [sp]); // eslint-disable-line
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); n.delete('page'); setSp(n); };
  return (<main className="wrap page"><h1>{title}</h1>
    <form className="filters" onSubmit={(e) => e.preventDefault()}><input aria-label="City or locality" placeholder="City or locality" defaultValue={q.city} onBlur={(e) => set('city', e.target.value)} />
      {!fixed.transactionType && <select aria-label="Transaction" value={q.transactionType || ''} onChange={(e) => set('transactionType', e.target.value)}><option value="">Buy, rent or lease</option><option value="BUY">Buy</option><option value="RENT">Rent</option><option value="LEASE">Lease</option></select>}
      <input aria-label="Minimum price" type="number" placeholder="Min price" defaultValue={q.minPrice} onBlur={(e) => set('minPrice', e.target.value)} /><input aria-label="Maximum price" type="number" placeholder="Max price" defaultValue={q.maxPrice} onBlur={(e) => set('maxPrice', e.target.value)} />
      <select aria-label="Sort" value={q.sort || ''} onChange={(e) => set('sort', e.target.value)}><option value="">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option></select>
      <button type="button" className="btn ghost" onClick={() => setSp({})}>Clear filters</button></form>
    {err && <p className="error">{err}</p>}{!d && !err && <p className="state">Loading properties…</p>}
    {d && !d.items.length && <p className="state">No properties match these filters. Try clearing some.</p>}
    {d && <div className="grid">{d.items.map((p) => <PropertyCard key={p._id} p={p} />)}</div>}
    {d?.pages > 1 && <div className="pager">{Array.from({ length: d.pages }, (_, i) => <button key={i} className={'btn ghost' + ((+q.page || 1) === i + 1 ? ' act' : '')} onClick={() => { const n = new URLSearchParams(sp); n.set('page', i + 1); setSp(n); }}>{i + 1}</button>)}</div>}</main>); }
