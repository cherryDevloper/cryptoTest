import { lazy } from "react";
import App from "../App";
import ErrorPage from "../pages/error";

// Lazily import the Landing page component to optimize initial page load.
// This is particularly useful if Landing has a significant workload.
// Otherwise, if Landing doesn't have a heavy workload, lazy loading may not be necessary.
const Landing = lazy(() => import("../pages/landing"));

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
];
