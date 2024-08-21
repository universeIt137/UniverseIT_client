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
import { Toaster } from 'react-hot-toast'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import AuthProviders from './AuthProviders/AuthProviders.jsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <ThemeProvider>
      <AuthProviders>
        <HelmetProvider>
          <RouterProvider router={BasicRoutes} />
          <Toaster />
        </HelmetProvider>
        </AuthProviders>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
