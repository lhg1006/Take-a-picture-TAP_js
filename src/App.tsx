import React from 'react';
import './App.css';
import "./css/common/common.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/common/header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import Forgot from "./pages/forgot/forgot";
import MyPage from "./pages/mypage";
import Footer from "./components/common/footer";
import AddPost from "./pages/addPost";
import NewFeed from "./pages/newFeed";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer autoClose={1500}/>
        <Routes>
          <Route>
            <Route path= "/main" element={<NewFeed/>}/>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/sign-in" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignupPage/>}/>
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path={"/new-feed"} element={<NewFeed />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
