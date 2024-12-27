/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./component/FloatingShape";
import SignUpPage from "./Pages/SignUpPage";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import Home from "./Pages/Home1";
import LoadingSpinner from "./component/LoadingSpinner";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";


//protect routes
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

//redirct authenticated users to tbe home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" />;
  }
  return children;
};

export default function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (user && isCheckingAuth) return <LoadingSpinner />;
  console.log("Is Logged in ", isAuthenticated);
  console.log("user", user);
  return (
    <>
      <div
        className="
min-h-screen
bg-gradient-to-br
from-gray-900
via-green-900
to-emerald-900
flex 
items-center
justify-center
relative
overflow-hidden
       "
      >
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />

        <FloatingShape
          color="bg-green-500"
          size="w-48 h-48"
          top="-5%"
          left="10%"
          delay={5}
        />

        <FloatingShape
          color="bg-green-500"
          size="w-32 h-32"
          top="-5%"
          left="10%"
          delay={2}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
