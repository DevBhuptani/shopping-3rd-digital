import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addProduct,
  deleteProduct,
} from '../../store/productReducer';
import { addToCart } from '../../store/cartReducer';

const ProductListing = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    image: '',
    imageFile: null as File | null,
    quantity: 1,
  });

  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setNewProduct({
        ...newProduct,
        imageFile: e?.target?.files?.[0],
        image: URL.createObjectURL(e?.target?.files?.[0]),
      });
    }
  };

  const handleAddProduct = () => {
    if (newProduct.imageFile) {
      const imageUrl = URL.createObjectURL(newProduct.imageFile);
      dispatch(addProduct({ ...newProduct, image: imageUrl, id: Date.now() }));
      setNewProduct({
        title: '',
        price: 0,
        image: '',
        imageFile: null,
        quantity: 1,
      });
    }
  };

  return (
    <div className="product-list">
      <h2>Product Listing</h2>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {newProduct.image && (
          <img
            src={newProduct.image}
            alt="Product Preview"
            className="product-preview"
          />
        )}
        <button className="add-product-button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <ul className="product-listing">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              className="delete-product-button"
              onClick={() => dispatch(deleteProduct(product.id))}
            >
              Delete
            </button>
            <button
              className="add-cart-button"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
