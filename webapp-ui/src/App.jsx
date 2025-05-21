import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Paper, IconButton, InputBase, Badge, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { ProductCard } from './components/ProductCard';
import { AdPlacement } from './components/AdPlacement';

const products = [
  {
    id: 1,
    name: 'Sneakers',
    price: 49,
    imageUrl:
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Backpack',
    price: 39,
    imageUrl:
      'https://images.pexels.com/photos/1986996/pexels-photo-1986996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 99,
    imageUrl:
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 129,
    imageUrl:
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    name: 'Sunglasses',
    price: 19,
    imageUrl:
      'https://images.pexels.com/photos/5201934/pexels-photo-5201934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function App() {
  const [cartCount, setCartCount] = useState(2);

  const [productGroups] = useState([
    { id: '906b2e3d-1ede-4e8b-b58d-a8ec23e1ddad', title: 'Home & Kitchen', products: shuffle(products) },
    { id: '3ccd5264-8200-46d0-b83b-69eb79633e9b', title: 'Electronics & Gadgets', products: shuffle(products) },
    { id: 'be84c618-348a-4f95-a636-ace81289b62b', title: 'Sports & Outdoors', products: shuffle(products) },
  ]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <AppBar position="static" sx={{ background: '#232f3e', mb: 4 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="Store Logo"
              style={{ width: 30, height: 30 }}
            />
            <Typography variant="h6" noWrap>
              My Store
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, mx: 2 }}>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400,
                background: '#fff',
              }}
              elevation={0}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search products…"
                inputProps={{ 'aria-label': 'search products' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>

          <IconButton color="inherit" sx={{ ml: 1 }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" sx={{ ml: 1 }}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', px: 6, mb: 4 }}>
          <AdPlacement id="abe1f397-ed85-4ce0-bf8f-ff88e9e057d3" />
        </Box>

        {productGroups.map(({ id, title, products }) => (
          <Box sx={{ px: 6, mb: 4 }} key={id}>
            <Typography variant="h5">{title}</Typography>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 3,
                px: 1,
                py: 4,
              }}
            >
              {products.map((product) => (
                <Box key={product.id} sx={{ minWidth: 200, flex: '0 0 auto' }}>
                  <ProductCard product={product} onAddToCart={() => setCartCount(cartCount + 1)} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', px: 6, mb: 4 }}>
          <AdPlacement id="aec178db-26b5-4271-81bf-e162bf337c52" />
        </Box>
      </Container>
    </Box>
  );
}
