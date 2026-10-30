import 'dotenv/config'; import bcrypt from 'bcryptjs'; import { connectDB } from '../config/db.js'; import { User } from '../models/index.js';
await connectDB(); const { ADMIN_EMAIL: e, ADMIN_PASSWORD: p } = process.env; if (!e || !p || p.length < 10) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (10+ chars) in .env');
if (await User.findOne({ role: 'ADMIN' })) console.log('An admin already exists. Nothing done.'); else { await User.create({ fullName: 'Administrator', email: e, passwordHash: await bcrypt.hash(p, 12), role: 'ADMIN' }); console.log('Admin created:', e); } process.exit();
