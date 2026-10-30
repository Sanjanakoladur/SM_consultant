import { Link } from 'react-router-dom';
const Pg = ({ t, children }) => <main className="wrap page narrow"><h1>{t}</h1>{children}</main>;
export const Sell = () => <Pg t="Sell, rent or lease your property"><p>Submit your land or house details. Our team reviews each submission and contacts you before anything is published.</p><Link className="btn" to="/owner/submit-property">Submit a property</Link></Pg>;
export const About = () => <Pg t="About SM Consultant"><p>SM Consultant is a real estate consultancy helping people buy, sell, rent and lease land, houses, apartments and commercial space. We guide you from search to site visit.</p></Pg>;
export const Contact = () => <Pg t="Contact us"><p>Find a property you like and use <b>Send enquiry</b> on its page — it goes straight to our team. Business phone and email can be added here once configured.</p><Link className="btn" to="/buy">Browse properties</Link></Pg>;
export const Legal = ({ t }) => <Pg t={t}><p>This page needs your final {t.toLowerCase()} text before launch.</p></Pg>;
export const Unauthorized = () => <Pg t="Access denied"><p>Your account does not have permission to view this page.</p><Link className="btn" to="/">Go home</Link></Pg>;
export const NotFound = () => <Pg t="Page not found"><p>The page you are looking for does not exist.</p><Link className="btn" to="/">Go home</Link></Pg>;
