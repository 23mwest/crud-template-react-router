import { createBrowserRouter, Navigate } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage.tsx";
import SignUpPage from "../pages/auth/SignUpPage.tsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import AuthRoute from "./AuthRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <Navigate to="/auth/sign-in" replace />,
      },
      {
        path: "/auth",
        element: <AuthRoute />,
        children: [
          {
            path: "/auth/sign-up",
            element: <SignUpPage />,
          },
          {
            path: "/auth/sign-in",
            element: <SignInPage />,
          },
          {
            path: "/auth/forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
      // Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: <ProtectedPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
