import { useAppSelector } from "@/app/hook";
import Loading from "@/components/Loading";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
