import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/clientSide/Home/HomePage";
import AboutUs from "../pages/clientSide/AboutUs/AboutUs";
import CoursesPage from "../pages/clientSide/Courses/CoursesPage";

import CourseDetails from "../pages/clientSide/courseDetails/CourseDetails";
import Profile from "../pages/adminSide/profile/Profile";
import AddCourse from "../pages/adminSide/addCourse/AddCourse";
import AdmissionRequest from "../pages/adminSide/admissionRequest/AdmissionRequest";
import CreateSeminar from "../pages/adminSide/seminar/CreateSeminar";
import ManageSeminar from "../pages/adminSide/seminar/ManageSeminar";
import SeminarPage from "../pages/adminSide/seminar/SeminarPage";
import AddBlogPage from "../pages/adminSide/addBlog/AddBlogPage";
import ManageBlog from "../pages/adminSide/manageBlog/ManageBlog";
import UpdateBlog from "../pages/adminSide/updateBlog/UpdateBlog";
import ManageHomepageContent from "../pages/adminSide/manageHomepageContent/ManageHomepageContent";
import ManageComments from "../pages/adminSide/ManageComments/ManageComments";
import ManageCountDown from "../pages/adminSide/manageCountDown/ManageCountDown";
import AddFacultyPage from "../pages/adminSide/addFaculty/AddFacultyPage";
import AddTestimonialPage from "../pages/adminSide/addTestimonial/AddTestimonialPage";
import ManageFacultyPage from "../pages/adminSide/manageFaculty/ManageFacultyPage";
import UpdateFacultyPage from "../pages/adminSide/updateFaculty/UpdateFacultyPage";
import ManageTestimonialPage from "../pages/adminSide/manageTestimonial/ManageTestimonialPage";
import UpdateTestimonials from "../pages/adminSide/updateTestimonials/UpdateTestimonials";
import ManageStudentGallary from "../pages/adminSide/manageStudentGallary/ManageStudentGallary";
import ManageCoursePage from "../pages/adminSide/manageCourse/ManageCoursePage";
import UpdateCoursePage from "../pages/adminSide/updateCourse/UpdateCoursePage";
import ManageCourseCategory from "../pages/adminSide/ManageCourseCategory/ManageCourseCategory";
import UpdateCourseCategory from "../pages/adminSide/UpdateCourseCategory/UpdateCourseCategory";
import ManageCourseSemester from "../pages/adminSide/ManageCourseSemester/ManageCourseSemester";
import UpdateCourseSemester from "../pages/adminSide/UpdateCourseSemester/UpdateCourseSemester";
import ManageCourseObjective from "../pages/adminSide/ManageCourseObjective/ManageCourseObjective";
import BlogPage from "../pages/clientSide/blog/BlogPage";
import BlogDetails from "../pages/clientSide/blog/BlogDetails";
import AdmissionPage from "../pages/clientSide/onlineAdmission/AdmissionPage";
import Seminar from "../pages/clientSide/Seminar/Seminar";
import SeminarForm from "../pages/clientSide/SeminarForm/SeminarForm";
import SuccessStoryPage from "../pages/clientSide/SuccessStoryPage/SuccessStoryPage";
import Faculties from "../pages/clientSide/Faculties/Faculties";
import CertificateVerification from "../pages/clientSide/certificateVerification/CertificateVerification";
import ManageCertificate from "../pages/adminSide/ManageCertificate/ManageCertificate";
import CreateCertificate from "../pages/adminSide/CreateCertificate/CreateCertificate";
import UpdateCertificate from "../pages/adminSide/UpdateCertificate/UpdateCertificate";


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
                path: 'certified',
                element: <CertificateVerification />
            },
            {
                path: 'courses',
                element: <CoursesPage />
            },
            {
                path: "blogs",
                element: <BlogPage />
            },
            {
                path: "blogDetails/:id",
                element: <BlogDetails />
            },
            {
                path: "faculties",
                element: <Faculties />
            },
            {
                path: "/courseDetails/:id",
                element: <CourseDetails></CourseDetails>
            },
            {
                path: "/onlineAdmission",
                element: <AdmissionPage></AdmissionPage>
            },
            {
                path: "/freeSeminar",
                element: <Seminar/>
            },
            {
                path: "/seminarForm/:id",
                element: <SeminarForm/>
            },
            {
                path: "/successStory",
                element: <SuccessStoryPage/>
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
            },
            {
                path: "addCourse",
                element: <AddCourse></AddCourse>
            },
            {
                path: "admissionRequest",
                element: <AdmissionRequest></AdmissionRequest>,

            },
            {
                path: "profile",
                element: <Profile></Profile>
            },

            {
                path: "createSeminar",
                element: <CreateSeminar></CreateSeminar>
            },
            {
                path: "manageSeminar",
                element: <ManageSeminar></ManageSeminar>
            },

            {
                // for manage seminar reqeust from student 
                path: "seminar",
                element: <SeminarPage></SeminarPage>
            },
            {
                path: "addBlog",
                element: <AddBlogPage></AddBlogPage>
            },
            {
                path: "manageBlog",
                element: <ManageBlog></ManageBlog>
            },
            {
                path: "/dashboard/updateBlog/:id",
                element: <UpdateBlog></UpdateBlog>
            },
            {
                path: "manageHomepageContent",
                element: <ManageHomepageContent></ManageHomepageContent>
            },
            {
                path: "manageComments",
                element: <ManageComments />
            },
            {
                path: "manageCountDown",
                element: <ManageCountDown></ManageCountDown>
            },
            {
                path: "addFaculty",
                element: <AddFacultyPage></AddFacultyPage>
            },
            {
                path: "addTestimonial",
                element: <AddTestimonialPage></AddTestimonialPage>
            },
            {
                path: "manageFaculty",
                element: <ManageFacultyPage></ManageFacultyPage>
            },
            {
                path: "/dashboard/updateFaculty/:id",
                element: <UpdateFacultyPage></UpdateFacultyPage>
            },
            {
                path: "manageTestimonial",
                element: <ManageTestimonialPage></ManageTestimonialPage>
            },
            {
                path: "/dashboard/updateTestimonial/:id",
                element: <UpdateTestimonials></UpdateTestimonials>
            },

            {
                path: "manageStudentGallary",
                element: <ManageStudentGallary></ManageStudentGallary>
            },

            {
                path: "manageCourses",
                element: <ManageCoursePage></ManageCoursePage>
            },
            {
                path: "updateCourse/:id",
                element: <UpdateCoursePage></UpdateCoursePage>
            },
            {
                path: "manageCourseCategory/:id",
                element: <ManageCourseCategory />
            },
            {
                path: "updateCourseCategory/:courseId/:categoryId",
                element: <UpdateCourseCategory />
            },
            {
                path: "manageCourseSemester/:id",
                element: <ManageCourseSemester />
            },
            {
                path: "updateCourseSemester/:courseId/:semesterId",
                element: <UpdateCourseSemester />
            },
            {
                path: "manageCourseObjective/:id",
                element: <ManageCourseObjective />
            },
            {
                path: "createCertificate",
                element: <CreateCertificate/>
            },
            {
                path: "manageCertificate",
                element: <ManageCertificate/>
            },
            {
                path: "/dashboard/updateCertificate/:id",
                element: <UpdateCertificate/>
            },


        ]
    }
]);

export default BasicRoutes;