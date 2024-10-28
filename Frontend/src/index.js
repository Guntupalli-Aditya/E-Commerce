import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/Authentication Pages/context';
import { SearchProvider } from './components/Authentication Pages/Search';
import { CartProvider } from './components/Authentication Pages/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </SearchProvider>
    </AuthProvider>
);
reportWebVitals();

