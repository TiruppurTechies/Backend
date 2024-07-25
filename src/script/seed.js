const mongoose = require('mongoose');
const MenuItem = require('../model/menuItems');  
const menuItemsSeedData = require('../seeds/menuItemsSeedData');
const {connectToMongoDB} = require('../model/utils/customIdGenerator')

// Connect to MongoDB
connectToMongoDB()

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany();

    // Insert seed data
    await MenuItem.insertMany(menuItemsSeedData);

    console.log('menuItemsSeedData seeded successfully');
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
