import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Post from "./components/Post";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
