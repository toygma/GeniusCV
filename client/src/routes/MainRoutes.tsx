import { Suspense } from "react";
import { lazy } from "react";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/components/Loading";

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
  ],
};
