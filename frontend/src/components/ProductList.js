import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container, Button, Form } from 'react-bootstrap';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(filtered);
  }, [sortBy, category, products]);

  return (
    <Container>
      <h1 className="text-center my-4">Products</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Sort By</Form.Label>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;