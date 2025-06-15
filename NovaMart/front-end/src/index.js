import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import ToggleDashSide from './Context/ToggleDashSide';
import CartContext from './Context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
      <ToggleDashSide>
        <MenuContext>
          <CartContext>
            <Router>
              <App />
            </Router>
            </CartContext>
        </MenuContext>
      </ToggleDashSide>
    </WindowContext>
  </React.StrictMode>
);