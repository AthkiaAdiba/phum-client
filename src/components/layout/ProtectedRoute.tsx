import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }
  // console.log(user);

  if (role !== undefined && role !== (user as TUser)?.role) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
