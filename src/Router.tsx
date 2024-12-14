import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BuildPage } from "./pages/Build.page";
import { HomePage } from "./pages/Home.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/build/:id",
    element: <BuildPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
