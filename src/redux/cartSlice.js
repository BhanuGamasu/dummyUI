import { createSlice } from '@reduxjs/toolkit';

// Helper function to load data from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : undefined; // Parse cart from storage or use undefined if empty
};

// Helper function to save data to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Load the initial state from localStorage or use the default state
const initialState = loadCartFromLocalStorage() || {
  items: [],
  totalAmount: 0,
  gst: 0,
  cartCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.cartCount += 1;
      state.totalAmount += product.price;
      state.gst = state.totalAmount * 0.18; // Assuming GST is 18%

      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        state.gst = state.totalAmount * 0.18;
      }

      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
        state.gst = state.totalAmount * 0.18;
      }

      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartCount -= existingItem.quantity;
        state.gst = state.totalAmount * 0.18;

        state.items = state.items.filter(item => item.id !== productId);
      }

      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    // Optional: You could add a resetCart action if needed to clear the cart
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.gst = 0;
      state.cartCount = 0;
      
      localStorage.removeItem('cart'); // Clear localStorage when resetting the cart
    }
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
