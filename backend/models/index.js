import mongoose from 'mongoose';
const { Schema, model } = mongoose; const id = (ref) => ({ type: Schema.Types.ObjectId, ref });
export const User = model('User', new Schema({ fullName: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true }, phone: String, passwordHash: { type: String, required: true }, role: { type: String, enum: ['CUSTOMER', 'OWNER', 'ADMIN'], default: 'CUSTOMER' }, isActive: { type: Boolean, default: true } }, { timestamps: true }));
export const Property = model('Property', new Schema({ owner: id('User'), title: { type: String, required: true }, description: String,
  propertyType: { type: String, enum: ['LAND', 'PLOT', 'HOUSE', 'APARTMENT', 'VILLA', 'COMMERCIAL'], required: true },
  transactionType: { type: String, enum: ['BUY', 'RENT', 'LEASE'], required: true }, price: { type: Number, required: true }, negotiable: Boolean,
  locality: String, city: { type: String, index: true }, state: String, landArea: Number, landAreaUnit: { type: String, default: 'sqft' }, bedrooms: Number, bathrooms: Number, amenities: [String],
  images: [{ url: String, alt: String }], adminFeedback: String,
  approvalStatus: { type: String, enum: ['PENDING', 'NEEDS_CORRECTION', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED'], default: 'PENDING', index: true }, publishedAt: Date }, { timestamps: true }));
export const Enquiry = model('Enquiry', new Schema({ property: id('Property'), customer: id('User'), name: String, email: String, phone: String, message: { type: String, required: true }, status: { type: String, enum: ['NEW', 'CONTACTED', 'CLOSED'], default: 'NEW' } }, { timestamps: true }));
const fav = new Schema({ user: id('User'), property: id('Property') }, { timestamps: true }); fav.index({ user: 1, property: 1 }, { unique: true });
export const Favourite = model('Favourite', fav);
export const AuditLog = model('AuditLog', new Schema({ actor: id('User'), action: String, resource: String, meta: Object }, { timestamps: true }));
