const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Seed fake products
const seedProducts = async () => {
  await Product.deleteMany(); // Clear existing products
  const products = [
    { name: 'Product 1', price: 19.99, description: 'This is product 1', image: 'https://via.placeholder.com/150', category: 'electronics' },
    { name: 'Product 2', price: 29.99, description: 'This is product 2', image: 'https://via.placeholder.com/150', category: 'clothing' },
    { name: 'Product 3', price: 39.99, description: 'This is product 3', image: 'https://via.placeholder.com/150', category: 'books' },
    { name: 'Product 4', price: 49.99, description: 'This is product 4', image: 'https://via.placeholder.com/150', category: 'electronics' },
  ];
  await Product.insertMany(products);
  console.log('Fake products seeded');
};

// Call the seed function (only in development)
if (process.env.NODE_ENV !== 'production') {
  seedProducts();
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));