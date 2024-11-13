import { createBrowserRouter } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../Pages/Registration";
import TermsAndConditions from "../Pages/TermsAndConditions";
import About from "../Pages/About";
import PrivateRoutes from "./PrivateRoutes";
import WriteBlogs from "../Pages/WriteBlogs";
import Blogs from "../Pages/Blogs";
import BookMarks from "../Pages/BookMarks";
import BookmarkDetails from "../Pages/BookmarkDetails";

const router = createBrowserRouter([
    {
        path:"/",
        element: (
            <HelmetProvider>
                <MainLayout/>
            </HelmetProvider>
        ),
        children:[
            {path:"/", element:<PrivateRoutes><Helmet><title>Home | Article</title></Helmet><Home/></PrivateRoutes>},
            {path:"/write-blogs", element:<PrivateRoutes><Helmet><title>Write Blog | Article</title></Helmet><WriteBlogs/></PrivateRoutes>},
            {path:"/bookmarks", element:<PrivateRoutes>
                <Helmet><title>Bookmarks | Article</title></Helmet>
                <BookMarks/>
            </PrivateRoutes>},
            {path:"/bookmarks/:id", element:<PrivateRoutes>
                <Helmet><title>Bookmark Details | Article</title></Helmet>
                <BookmarkDetails/>
            </PrivateRoutes>},
            {path:"/blogs", element: <PrivateRoutes>
                <Helmet><title>Blogs | Article</title></Helmet>
                <Blogs/>
            </PrivateRoutes>},
            {path:"/login", element:<>
                <Helmet><title>Login | Article</title></Helmet>
                <Login/>
            </>},
            {path:"/register", element:<>
                <Helmet><title>Register | Article</title></Helmet>
                <Registration/>
            </>},
            {path:"/terms", element:<>
                <Helmet><title>Terms & Conditions | Article</title></Helmet>
                <TermsAndConditions/>
            </>},
            {path:"/about", element:<PrivateRoutes><Helmet><title>About | Article</title></Helmet><About/></PrivateRoutes>}
        ]
    }
])

export default router;
