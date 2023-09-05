import React from 'react';
import Layout from './component/Layout';
import './style.css';
import { Provider } from 'react-redux';
import store from './store/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  );
}
