// Server-side connection utility. Never import this module into client components.
const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;
if (!connectionString) {
  throw new Error('Set MONGODB_URI in the server environment.');
}
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(() => {
    console.error('MongoDB connection failed. Check server configuration.');
    process.exitCode = 1;
  });
