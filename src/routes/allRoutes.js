import React from "react";
import { Redirect } from "react-router-dom";

// ? user auth-flow
import Login from "../pages/UserAuthentication/Login";
import Register from "../pages/UserAuthentication/Register";
import ForgetPasswordPage from "../pages/UserAuthentication/ForgotPassword";
import ResetPassword from "../pages/UserAuthentication/ResetPassword";

// ? user dashboard
import UserDashboard from "../pages/UserDashboard/index";
import VerificationPage from "../pages/UserAuthentication/VerificationPage";
import Logout from "../pages/UserAuthentication/Logout";
import APIKey from "../pages/APIKey";
import Products from "../pages/Products";
import CreateProduct from "../pages/Products/CreateProduct";
import Transactions from "../pages/Transactions";
import WidgetWebhook from "../pages/Webhook";
import Profile from "../pages/Profile";

const userRoutes = [
  { path: "/user-dashboard", component: UserDashboard },
  { path: "/api-key", component: APIKey },
  { path: "/products", component: Products },
  { path: "/products/create", component: CreateProduct },
  { path: "/transactions", component: Transactions },
  { path: "/widget-webhook", component: WidgetWebhook },
  { path: "/user-profile", component: Profile },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/user-dashboard" />,
  },
];

const adminRoutes = [
  { path: "/user-dashboard", component: UserDashboard },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/user-dashboard" />,
  },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/user-login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/user-register", component: Register },
  { path: "/verify-account", component: VerificationPage },
  { path: "/reset-password", component: ResetPassword },
];

export { userRoutes, authRoutes, adminRoutes };
