import React, {useEffect, useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/common/header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "./pages/main";
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import Forgot from "./pages/forgot/forgot";
import MyPage from "./pages/mypage";
import Footer from "./components/common/footer";
import {getCookie} from "./utills";

function App() {
  const isLogin = getCookie("isLogin")
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer autoClose={1500}/>
        <Routes>
          <Route>
            <Route path= "/main" element={<MainPage/>}/>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/sign-in" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignupPage/>}/>
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
        {isLogin && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
