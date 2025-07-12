import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Login from "./pages/Login";
import AddEntry from "./pages/AddEntry";
import ViewEntry from "./pages/ViewEntry";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthProtection from "./components/AuthProtection";

function App() {
  return (
    <div className="">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/Signup"
            element={
              <AuthProtection>
                <SignUp />
              </AuthProtection>
            }
          />
          <Route
            path="/Login"
            element={
              <AuthProtection>
                <Login />
              </AuthProtection>
            }
          />
          <Route path="*" element={<Error />} />
          <Route
            path="/New"
            element={
              <ProtectedRoutes>
                <AddEntry />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/View/:id"
            element={
              <ProtectedRoutes>
                <ViewEntry />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
