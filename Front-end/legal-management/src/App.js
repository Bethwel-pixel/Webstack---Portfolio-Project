// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import withLayout from "./components/HOCApp";
import ChartOfAccounts from "./scenes/AccountsAndFinanceManagement/chartofaccounts";
import BarChart from "./components/BarChart";
import axios from 'axios';

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={<SignInSide onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/changepassword" element={<ChangePasswordForm />} />
        </Routes>
        {isAuthenticated && (
          <>
            
            <Routes>
              <Route path="/users" element={withLayout(Users)()} />
              <Route path="/usersform" element={withLayout(UsersForm)()} />
            </Routes>
            <Routes>
              <Route path="/Cases" element={withLayout(Cases)()} />
              <Route path="/case-details" element={withLayout(CaseDetails)()} />
            </Routes>
            <Routes>
              <Route path="/corporate-clients" element={withLayout(CorporateClients)()} />
            </Routes>
            <Routes>
              <Route path="/bar" element={withLayout(BarChart)()} />
              <Route path="/super-admin-dashboard" element={withLayout(Dashboard)()} />
            </Routes>
          </>
        )}
        <Routes>
          <Route path="/signin" element={<SignInSide />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
