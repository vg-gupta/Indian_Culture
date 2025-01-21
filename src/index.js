import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Navigation from './navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Navigation/>
    <App />
  </React.StrictMode>
);
