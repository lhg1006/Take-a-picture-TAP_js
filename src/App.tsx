import React, {useEffect, useRef} from 'react';
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
import Footer from "./components/common/footer";
import AddPost from "./pages/addPost";
import NewFeed from "./pages/newFeed";
import Alim from "./pages/alim/alim";
import LikeListPage from "./pages/likeList/likeList";
import UserPage from "./pages/userpage";
import MessageList from "./pages/message/list";
import FollowList from "./pages/follow/list";
import FeedView from "./pages/feed/view";

function App() {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollTop);
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem("scroll", scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = sessionStorage.getItem("scroll");
      if (scroll) {
        scrollRef.current.scrollTo(0, scroll);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App" onScroll={handleScroll} ref={scrollRef}>
        <Header/>
        <ToastContainer autoClose={1500}/>
        <Routes>
          <Route>
            <Route path= "/main" element={<NewFeed/>}/>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/sign-in" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignupPage/>}/>
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/user-page" element={<UserPage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/new-feed" element={<NewFeed />} />
            <Route path="/alim" element={<Alim />} />
            <Route path="/likeList" element={<LikeListPage />} />
            <Route path="/message/list" element={<MessageList />} />
            <Route path="/follow/list" element={<FollowList />} />
            <Route path="/feed/view" element={<FeedView />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
