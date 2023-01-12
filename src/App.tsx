import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TestPage from "./pages/test";
import Header from "./components/common/header";
import Auth from "./components/common/auth";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header />
        <Auth />
    </div>
    </BrowserRouter>
  );
}

export default App;
