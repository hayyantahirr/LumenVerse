import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./screens/Home";
import Blogs from "./screens/Blogs";
import AddBlog from "./screens/AddBlog";
import BlogDetail from "./screens/BlogDetail";
import Profile from "./screens/Profile";
import { Provider } from "react-redux";
import { persistor, store } from "./config/Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/blogs", element: <Blogs /> },
      { path: "/addblogs", element: <AddBlog /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
      { path: "/profile/:id", element: <Profile /> },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
