import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignInSide from "./scenes/Login/LoginPage";
import ChangePasswordForm from "./scenes/users/changepassword";
import Dashboard from "./scenes/dashboard";
import AccountAndFinanceModule from "./scenes/AccountsAndFinanceManagement/Accounts";
import Users from "./scenes/users";
import UsersForm from "./scenes/users/users-form";
import { Reduxstore } from "./store/store";
import { Provider } from "react-redux";
import Cases from "./scenes/CaseManagement/Case";
import CaseDetails from "./scenes/Case";
import CorporateClients from "./scenes/clientManagement/corporateClients";
import IndividualClients from "./scenes/clientManagement/individualClients";
import withLayout from "./components/HOCApp";
import ChartOfAccounts from "./scenes/AccountsAndFinanceManagement/chartofaccounts";
import BarChart from "./components/BarChart";
import axios from "axios";
import SignUpSide from "./scenes/SignUp/signup";
import Gender from "./scenes/Gender";
import ForgotPassword from "./scenes/ForgotPassword/FormTwo";
import Country from "./scenes/SetUpManagment/Country";
import LandingPage from "./scenes/Landing_Page";

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to manage user role

  useEffect(() => {
    // Simulate authentication and set user role
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
      setUserRole("admin"); // Set this based on actual user data
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const checkAccess = (allowedRoles) => {
    return allowedRoles.includes(userRole);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={<SignInSide onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/changepassword" element={<ChangePasswordForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/sign-up" element={<SignUpSide />} />

          {isAuthenticated && checkAccess(["admin", "user"]) && (
            <>
              <Route path="/users" element={withLayout(Users)()} />
              <Route path="/usersform" element={withLayout(UsersForm)()} />
              <Route
                path="/super-admin-dashboard"
                element={withLayout(Dashboard)()}
              />
            </>
          )}

          {isAuthenticated && checkAccess(["admin"]) && (
            <>
              <Route path="/Cases" element={withLayout(Cases)()} />
              <Route path="/case-details" element={withLayout(CaseDetails)()} />
              <Route
                path="/corporate-clients"
                element={withLayout(CorporateClients)()}
              />
              <Route
                path="/individual-clients"
                element={withLayout(IndividualClients)()}
              />
              <Route path="/gender-setups" element={withLayout(Gender)()} />
              <Route path="/country-setups" element={withLayout(Country)()} />
              <Route path="/bar" element={withLayout(BarChart)()} />
            </>
          )}
          {isAuthenticated && checkAccess([""]) && (
            <>
              <Route
                path="/super-admin-dashboard"
                element={withLayout(Dashboard)()}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/super-admin-dashboard" />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
