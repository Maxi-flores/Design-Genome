import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../../dist/sentient-foundation.css';
import '../../../dist/sentient-primitives.css';
import '../../../dist/sentient-personalities.css';
import '../../../dist/sentient-architectures.css';
import '../../../dist/sentient-projects.css';
import { App } from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
