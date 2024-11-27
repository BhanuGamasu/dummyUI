import { createSlice } from '@reduxjs/toolkit';

// Helper function to load data from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : undefined;
};

// Helper function to save data to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Helper function to calculate cart count
const calculateCartCount = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
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
    
      // Generate a unique identifier for the item based on id and selectedWeight
      // const uniqueId = `${product.product.id}_${product.selectedWeight}`;
    
      // Check if a product with the same id and selectedWeight already exists in the cart
      const existingItem = state.items.find(
        (item) => item.id === product.product.id && item.selectedWeight === product.selectedWeight
      );
    
      if (existingItem) {
        // If the product exists, increment the quantity and update the total price
        existingItem.quantity += product.quantity || 1;
        existingItem.totalPrice = existingItem.quantity * product.discountPrice;
      } else {
        // If the product doesn't exist, add it to the cart
        state.items.push({
          ...product,
          id: product.product.id, // Keep the original id
          selectedWeight: product.selectedWeight,
          totalPrice: product.discountPrice * (product.quantity || 1),
        });
      }
    
      // Recalculate the total amount and GST
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.gst = state.totalAmount * 0.18;
      state.cartCount = calculateCartCount(state.items);
    
      // Save the updated state to localStorage
      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const { id, selectedWeight } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedWeight === selectedWeight
      );
    
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        state.gst = state.totalAmount * 0.18;
        state.cartCount = calculateCartCount(state.items);
      }
    
      saveCartToLocalStorage(state);
    },
    decrementQuantity: (state, action) => {
      const { id, selectedWeight } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedWeight === selectedWeight
      );
    
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
        state.gst = state.totalAmount * 0.18;
        state.cartCount = calculateCartCount(state.items);
      }
    
      saveCartToLocalStorage(state);
    },    
    removeFromCart: (state, action) => {
      const { id, selectedWeight } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedWeight === selectedWeight
      );
    
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.gst = state.totalAmount * 0.18;
        state.items = state.items.filter(
          (item) => !(item.id === id && item.selectedWeight === selectedWeight)
        );
        state.cartCount = calculateCartCount(state.items);
      }
    
      saveCartToLocalStorage(state);
    },

    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.gst = 0;
      state.cartCount = 0;

      localStorage.removeItem('cart');
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
