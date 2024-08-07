import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/adminSide/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/clientSide/Home/HomePage";
<<<<<<< HEAD
import AboutUs from "../pages/clientSide/AboutUs/AboutUs";
import CoursesPage from "../pages/clientSide/Courses/CoursesPage";

=======
import CourseDetails from "../pages/clientSide/courseDetails/CourseDetails";
  
>>>>>>> 29036248a860fdb12b9cbfa5f6296ef91180bbc7

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
<<<<<<< HEAD
                path: 'aboutUs',
                element: <AboutUs />
            },
            {
                path: 'courses',
                element: <CoursesPage />
            },
=======
                path: "/courseDetails",
                element: <CourseDetails></CourseDetails>
            }
>>>>>>> 29036248a860fdb12b9cbfa5f6296ef91180bbc7
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