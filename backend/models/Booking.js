const mongoose = require('mongoose');

// We define the schema for Mongoose
const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interest: { type: String, enum: ['Initiate', 'Elite', 'Black'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
