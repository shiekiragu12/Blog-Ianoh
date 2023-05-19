// App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import React from 'react';
import MyRoutes from './routes';

function App() {
  return (
    <div className='BlogsApp'>
      <ToastContainer/>
      <MyRoutes />
    </div>
  );
}

export default App;
