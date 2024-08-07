import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import BasicRoutes from './routes/BasicRoutes.jsx';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={BasicRoutes} />
      </HelmetProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
