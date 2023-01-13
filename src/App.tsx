import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestPage from "./pages/test";
import Header from "./components/common/header";
import Auth from "./components/common/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer autoClose={1500}/>
        <Auth/>
        <Routes>
          <Route>
            <Route path="/test" element={<TestPage/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
