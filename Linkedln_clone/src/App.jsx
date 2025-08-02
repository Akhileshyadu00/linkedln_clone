import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Post from "./components/Post";
import Feeds from "./pages/Feeds";
import Profile from "./pages/Profile";

function App() {

  const isLogin = false;

  return (
    <BrowserRouter>
    {
      isLogin? <Navbar /> : <Navbar />
    }
      

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/profile" element={<Profile />} />
           <Route path="/feeds" element={<Feeds />} />
          <Route path="/post" element={<Post />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
