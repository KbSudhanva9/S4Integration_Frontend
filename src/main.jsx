import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import { LayoutRouting } from './Routes/Layout.Routes';
import ErrorBoundary from './Utils/ErrorHandling/ErrorBoundary';

const router = createBrowserRouter(LayoutRouting);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
