import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from '../../store/cartReducer';

const CartListing = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, increment: boolean) => {
    dispatch(updateCartQuantity({ id, increment }));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert(`Total price: $${total.toFixed(2)}`);
      dispatch(clearCart());
    } else {
      alert('Your cart is empty');
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item.id, false)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item.id, true)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-cart-button"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartListing;
