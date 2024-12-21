import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { BuildPage } from "./pages/Build.page";
import { HomePage } from "./pages/Home.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
  {
    path: "/build/:id",
    element: <BuildPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
