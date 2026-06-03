const mongoose = require('mongoose');
require('dotenv').config();
const Trainer = require('./models/Trainer');

const trainersData = [
  {
    name: "Ava Reyes",
    role: "Combat & Conditioning",
    handle: "@ava.meliora",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800",
    specialties: ["Combat", "MMA", "HIIT"],
    number: "01"
  },
  {
    name: "Kai Mercer",
    role: "Strength & Hypertrophy",
    handle: "@kai.meliora",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=800",
    specialties: ["Hypertrophy", "Olympic Lifting", "Powerbuilding"],
    number: "02"
  },
  {
    name: "Lena Park",
    role: "Mobility & Movement",
    handle: "@lena.meliora",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    specialties: ["Mobility", "Pilates", "Breathwork"],
    number: "03"
  }
];

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gym_meliora';

console.log('Seeding Gym Meliora database at:', mongoURI);

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing trainers
    await Trainer.deleteMany({});
    console.log('Deleted old trainer profiles.');

    // Insert new trainers
    await Trainer.insertMany(trainersData);
    console.log('Successfully seeded new professional trainers into MongoDB.');

    mongoose.connection.close();
    console.log('Database connection closed. Seeding completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding database:', err.message);
    console.log('If MongoDB is not running, that is okay! The server will auto-fallback to this same seeder data in-memory.');
    process.exit(1);
  });
