const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  handle: { type: String, required: true },
  image: { type: String, required: true },
  specialties: [{ type: String }],
  number: { type: String }
});

module.exports = mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);
