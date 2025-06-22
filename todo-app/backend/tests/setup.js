// Test setup file
const mongoose = require('mongoose');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGO_URL = 'mongodb://mongo:27017/todo-test';

// Global test setup
beforeAll(async () => {
  try {
    // Connect to test database with longer timeout and proper options
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
    });
    console.log('MongoDB connected for testing');
  } catch (error) {
    console.warn('MongoDB not available for testing, some tests may fail:', error.message);
    // Don't exit process, let tests run with mocked data
  }
});

// Global test teardown
afterAll(async () => {
  try {
    // Close database connection if connected
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.warn('Error closing MongoDB connection:', error.message);
  }
});

// Clean up database between tests
afterEach(async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  } catch (error) {
    console.warn('Error cleaning up database:', error.message);
  }
}); 