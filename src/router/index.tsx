import { createBrowserRouter, RouteObject } from "react-router-dom";
import React from "react";
import { LazyGuardRouter } from "@/router/components/LazyGuardRouter";

import Layout from "@/views/layout";

const Login = React.lazy(() => import("@/views/login"));
const Home = React.lazy(() => import("@/views/home"));
const BlogList = React.lazy(() => import("@/views/blogList"));
const BlogUpload = React.lazy(() => import("@/views/blogUpload"));

const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <LazyGuardRouter>
        <Login />
      </LazyGuardRouter>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <LazyGuardRouter>
            <Home />
          </LazyGuardRouter>
        ),
      },
      {
        path: "/home",
        element: (
          <LazyGuardRouter>
            <Home />
          </LazyGuardRouter>
        ),
      },
      {
        path: "/blogList",
        element: (
          <LazyGuardRouter>
            <BlogList />
          </LazyGuardRouter>
        ),
      },
      {
        path: "/blogUpdate",
        element: (
          <LazyGuardRouter>
            <BlogUpload />
          </LazyGuardRouter>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
