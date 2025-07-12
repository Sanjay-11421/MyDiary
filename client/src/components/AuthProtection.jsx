import { Navigate } from "react-router-dom";

const AuthProtection = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  if (token) {
    return <Navigate to="/" />;
  }
};

export default AuthProtection;
