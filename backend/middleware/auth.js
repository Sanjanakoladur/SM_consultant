import jwt from 'jsonwebtoken'; import { User } from '../models/index.js';
export const sign = (u) => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
export const cookieOpts = { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 864e5 };
export const auth = async (req, res, next) => { try { const { id } = jwt.verify(req.cookies.token, process.env.JWT_SECRET); const u = await User.findById(id).select('-passwordHash'); if (!u?.isActive) throw 0; req.user = u; next(); } catch { res.status(401).json({ message: 'Please log in' }); } };
export const role = (...r) => (req, res, next) => (r.includes(req.user.role) ? next() : res.status(403).json({ message: 'Access denied' }));
