import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
