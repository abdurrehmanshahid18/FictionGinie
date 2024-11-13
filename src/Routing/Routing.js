import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../Pages/NotFound/NotFound";
import SignupUser from "../Pages/Signup-User/SignupUser";
import OtpUser from "../Pages/Otp-User/otp-user";
import ResetPasswordUser from "../Pages/Reset-Password-user";
import AccountSection from "../Pages/Account-Section/AccountSection";
import LoginUser from "../Pages/Login-User/login-user";
import AddNewProfile from "../Pages/Add-Profile/add-profile";
import Account from "../Pages/Account/Account";
import Profile from "../Pages/Profile/Profile";
import ReadingBook from "../Pages/ReadingBook/reading-book";
import Dashboard from "../Pages/Dashboard/dashboard";
import ForgotPasswordUser from "../Pages/Forgot-Password-User/forgot-password-user";

const Routing = () => {
  const publicRoutes = [
    { path: "/", element: <LoginUser /> },
    { path: "/forgot-password", element: <ForgotPasswordUser /> },
    { path: "/signup", element: <SignupUser /> },
    { path: "/otp", element: <OtpUser /> },
    { path: "/signin", element: <LoginUser /> },
    { path: "/reset-password", element: <ResetPasswordUser /> },
  ];

  const privateRoutes = [
    { path: "/", element: <AccountSection /> },
    { path: "/add-profile", element: <AddNewProfile /> },
    { path: "/book-detail", element: <ReadingBook /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/account", element: <Account /> },
    { path: "/profile", element: <Profile /> },
    { path: "/select-profile", element: <AccountSection /> },
    // ... add other private routes
  ];

  const redirectRoutes = [
    "/forgot-password",
    "/signup",
    "/otp",
    "/verification",
    "/signin",
    "/reset-password",
  ];

  const ReDirect = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return null;
  };
  const isUserAuthenticated = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {(isUserAuthenticated ? privateRoutes : publicRoutes).map((route) => (
          <Route key={route.path} {...route} />
        ))}

        {redirectRoutes.map((path) => (
          <Route key={path} path={path} element={<ReDirect />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
