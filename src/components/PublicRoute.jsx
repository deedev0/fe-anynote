import { Navigate } from "react-router-dom";

export default function PublicRoute({ isAuth, children }) {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
}
