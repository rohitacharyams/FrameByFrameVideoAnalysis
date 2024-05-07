// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from "react-dom/client"
import { Provider } from 'react-redux';
import store from './redux/store'; // Assuming you have a Redux store
import { RecoilRoot } from 'recoil';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </Provider>
);
