import react from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';

import { AuthProvider } from './context/AuthContext.jsx'; 
import { CarritoProvider } from './context/CarritoContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AuthProvider>

      <CarritoProvider>

        <App />

      </CarritoProvider>

    </AuthProvider>
    
  </BrowserRouter>
);
 