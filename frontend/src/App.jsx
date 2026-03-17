import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layouts/Layout.jsx';
//import PrivateRoute from './components/Layouts/PrivateRoute.jsx';
import { UserProvider } from './components/context/UserContext.jsx';


// Lazy load Page
import LogIn_Page from './pages/Authentication/LogIn_Page.jsx';

const NotFound = React.lazy(
  () => import('./pages/Fallback/Not_Found.jsx'),
);
import LoadingSpinner from './components/Loading_UI/LoadingSpinner.jsx';

// Lazy load the Dashboard Pages
const Home_Page = React.lazy(() => import('./pages/Dashboard/Home_Page.jsx'));
//const Manage_Consumable_Products = React.lazy(
  //() => import('./pages/Dashboard/Manage_Consumable_Products.jsx'),
//);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        //element: <Navigate to="/login" replace />,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LogIn_Page />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LogIn_Page />
          </Suspense>
        ),
      },
       {
        path: 'home',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home_Page />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function App() {
  return (
    <UserProvider>
     
        <div className="bg-gray-50 font-sans">
          <RouterProvider router={router} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable={false}
            theme="colored"
            transition={Slide}
            limit={3}
          />
        </div>

    </UserProvider>
  );
}
