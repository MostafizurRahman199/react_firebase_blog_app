import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../Pages/Registration";
import TermsAndConditions from "../Pages/TermsAndConditions";
import About from "../Pages/About";
import PrivateRoutes from "./PrivateRoutes";
import WriteBlogs from "../Pages/WriteBlogs";
import Blogs from "../Pages/Blogs";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {path:"/", element:<PrivateRoutes><Home/></PrivateRoutes>},
            {path:"/write-blogs", element:<PrivateRoutes><WriteBlogs/></PrivateRoutes>},
            {path:"/blogs", element: <PrivateRoutes><Blogs/></PrivateRoutes>},
            {path:"/login", element:<Login/>},
            {path:"/register", element:<Registration/>},
            {path:"/terms", element:<TermsAndConditions/>},
            {path:"/about", element:<About/>}
        ]
    }
])

export default router;
