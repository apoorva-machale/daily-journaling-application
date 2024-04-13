import React from "react";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";

const App = () => {
 

  return (
    <div>

      <Routes>
        <Route path="/" exact element={<WelcomePage />} />
        {/* <Route path="/signup" component={HomePage} />
        <PrivateRoute path="/skill" component={Skill} />
        <PrivateRoute path="/update" component={Update} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} /> */}
      </Routes>
    </div>
  );
};

export default App;
