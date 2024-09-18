import './App.css';
import ProductListing from './components/ProductListing';
import CartListing from './components/CartListing';

function App() {
  return (
    <div className="app-container">
      <ProductListing />
      <CartListing />
    </div>
  );
}

export default App;
