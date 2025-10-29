import { Suspense } from "react";
import { lazy } from "react";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/components/Loading";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import { ProtectedRoute } from "./protected-Route";

const Home = lazy(() => import("@/pages/dashboard/Home"));
const ResumeBuilder = lazy(() => import("@/pages/resume/ResumeBuilder"));
const Preview = lazy(() => import("@/pages/preview/Preview"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "builder/:resumeId",
      element: (
        <Suspense fallback={<Loading />}>
          <ResumeBuilder />
        </Suspense>
      ),
    },
    {
      path: "view/:resumeId",
      element: (
        <Suspense fallback={<Loading />}>
          <Preview />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<Loading />}>
          <Signup />
        </Suspense>
      ),
    },

    {
      element: <ProtectedRoute />, 
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
