import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login";
import Register, {
  registerAction,
} from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses, { coursesLoader } from "./pages/courses";
import CourseCategories from "./pages/course-categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />, // content pishfarz
        index: true, // MainLayout hich contenti nadarad. baraye hamin bayad ye content pishfarz barash set konim.
        loader: coursesLoader, // کار این فانکشن گرفتن اصلاعات دوره ها است که قبل از اکتیو شدن روت کال میشود و دیتای روت رو برمیگرداند
      },
      {
        path: "/course-categories",
        element: <CourseCategories />,
      }
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);

export default router;
