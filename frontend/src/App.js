import { Routes, Route, Navigate } from 'react-router-dom'; import Navbar from './components/Navbar'; import Footer from './components/Footer'; import Guard from './components/Guard'; import { useAuth, home } from './context/AuthContext';
import Home from './pages/Home'; import Listings from './pages/Listings'; import Details from './pages/Details'; import Auth from './pages/Auth'; import { OwnerDashboard, SubmitProperty } from './pages/Owner'; import Customer from './pages/Customer';
import { AdminOverview, AdminProperties, AdminUsers, AdminEnquiries, AdminAudit } from './pages/Admin'; import { Sell, About, Contact, Legal, Unauthorized, NotFound } from './pages/Static';
const Dash = () => { const { user, loading } = useAuth(); return loading ? null : <Navigate to={user ? home(user) : '/login'} replace />; };
const G = (roles, el) => <Guard roles={roles}>{el}</Guard>;
export default function App() { return (<><Navbar /><div className="content"><Routes>
  <Route path="/" element={<Home />} />
  <Route path="/buy" element={<Listings title="Properties for sale" fixed={{ transactionType: 'BUY' }} />} />
  <Route path="/buy/land" element={<Listings title="Land and plots" fixed={{ transactionType: 'BUY', propertyType: 'LAND,PLOT' }} />} />
  <Route path="/buy/houses" element={<Listings title="Houses" fixed={{ transactionType: 'BUY', propertyType: 'HOUSE,VILLA' }} />} />
  <Route path="/buy/apartments" element={<Listings title="Apartments" fixed={{ transactionType: 'BUY', propertyType: 'APARTMENT' }} />} />
  <Route path="/buy/commercial" element={<Listings title="Commercial properties" fixed={{ transactionType: 'BUY', propertyType: 'COMMERCIAL' }} />} />
  <Route path="/rent" element={<Listings title="Rental properties" fixed={{ transactionType: 'RENT' }} />} /><Route path="/lease" element={<Listings title="Lease properties" fixed={{ transactionType: 'LEASE' }} />} />
  <Route path="/properties/:id" element={<Details />} /><Route path="/sell" element={<Sell />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} />
  <Route path="/privacy-policy" element={<Legal t="Privacy policy" />} /><Route path="/terms" element={<Legal t="Terms and conditions" />} />
  <Route path="/login" element={<Auth mode="login" />} /><Route path="/register" element={<Auth mode="register" />} /><Route path="/dashboard" element={<Dash />} />
  <Route path="/customer/dashboard" element={G(['CUSTOMER'], <Customer />)} /><Route path="/customer/favourites" element={G(['CUSTOMER'], <Customer />)} /><Route path="/customer/enquiries" element={G(['CUSTOMER'], <Customer view="enquiries" />)} />
  <Route path="/owner/dashboard" element={G(['OWNER'], <OwnerDashboard />)} /><Route path="/owner/properties" element={G(['OWNER'], <OwnerDashboard />)} />
  <Route path="/owner/submit-property" element={G(['OWNER'], <SubmitProperty />)} /><Route path="/owner/properties/:id/edit" element={G(['OWNER'], <SubmitProperty />)} />
  <Route path="/admin" element={G(['ADMIN'], <AdminOverview />)} /><Route path="/admin/submissions" element={G(['ADMIN'], <AdminProperties pending />)} /><Route path="/admin/properties" element={G(['ADMIN'], <AdminProperties />)} />
  <Route path="/admin/users" element={G(['ADMIN'], <AdminUsers />)} /><Route path="/admin/enquiries" element={G(['ADMIN'], <AdminEnquiries />)} /><Route path="/admin/audit-logs" element={G(['ADMIN'], <AdminAudit />)} />
  <Route path="/unauthorized" element={<Unauthorized />} /><Route path="*" element={<NotFound />} /></Routes></div><Footer /></>); }
