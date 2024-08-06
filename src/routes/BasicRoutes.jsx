import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/adminSide/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/clientSide/Home/HomePage";
import AboutUs from "../pages/clientSide/AboutUs/AboutUs";
import CoursesPage from "../pages/clientSide/Courses/CoursesPage";


const BasicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: 'aboutUs',
                element: <AboutUs />
            },
            {
                path: 'courses',
                element: <CoursesPage />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "/dashboard",
                element: <Profile></Profile>
            }
        ]
    }
]);

export default BasicRoutes;