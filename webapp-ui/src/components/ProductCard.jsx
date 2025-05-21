import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

export function ProductCard({ product, onAddToCart }) {
  const { id, name, price, imageUrl } = product;

  return (
    <Card id={`product-card-${id}`}>
      <CardMedia component="img" height="180" image={imageUrl} alt={name} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" fontSize="large">
            ${price}
          </Typography>
          <Button variant="contained" color="primary" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
