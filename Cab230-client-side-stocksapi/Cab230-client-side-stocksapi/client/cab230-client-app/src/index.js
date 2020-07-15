import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Import Authorization provider to provide authorization methods to its children: App
import AuthorizationProvider from './AuthorizationContext/Authorization';

ReactDOM.render(
  <AuthorizationProvider>
    <App />
  </AuthorizationProvider>,
  document.getElementById('root')
);
