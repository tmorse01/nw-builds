import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { BuildPage } from "./pages/Build.page";
import { BuildListPage } from "./pages/BuildList.page";
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
    path: "/builds",
    element: (
      <AppLayout>
        <BuildListPage />
      </AppLayout>
    ),
  },
  {
    path: "/build/:id",
    element: (
      <AppLayout>
        <BuildPage />
      </AppLayout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
