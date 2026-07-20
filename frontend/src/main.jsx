import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        gutter={14}
        toastOptions={{
          style: {
            background: 'rgba(8, 12, 28, 0.86)',
            color: '#f8faff',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(2,6,23,0.42)',
            backdropFilter: 'blur(18px)',
            borderRadius: '18px',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
