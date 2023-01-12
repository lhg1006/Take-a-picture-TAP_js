import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/login/login";
import SignupPage from "../../pages/signup/signup";
import React from "react";

const Auth = () => {
  return(

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Routes>
        </div>
      </div>

  )
}

export default Auth