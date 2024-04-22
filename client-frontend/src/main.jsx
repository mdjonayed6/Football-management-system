import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './utils/css/Fixed.css'
import "rc-pagination/assets/index.css"; //You can customize
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import Store from './redux/store/Store.jsx';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
