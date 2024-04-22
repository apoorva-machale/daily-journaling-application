import React from "react";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import DashboardPage from "./components/DashboardPage";
import BlogPage from "./components/BlogPage";
import { Toaster} from 'react-hot-toast';
import PrivateRoute from "./PrivateRoute";

const App = () => {

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" exact element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="blogs" element={<PrivateRoute><BlogPage/></PrivateRoute>}/>
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </div>
  );
};

export default App;
