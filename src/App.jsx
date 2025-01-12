import { useState, lazy, Suspense } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateWebhook from "./pages/CreateWebhook";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/useAuth";

// const Login = lazy(() => import("./pages/Login"));
// const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-webhook" element={<CreateWebhook />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
