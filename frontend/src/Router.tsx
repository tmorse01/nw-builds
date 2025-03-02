import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import AboutPage from "./pages/About.page";
import AdminProtectedPage from "./pages/AdminProtectedPage";
import { BuildPage } from "./pages/Build.page";
import BuildEditorPage from "./pages/BuildEditor.page";
import { BuildListPage } from "./pages/BuildList.page";
import BuildManagerPage from "./pages/BuildManager.page";
import { HomePage } from "./pages/Home.page";
import TagManagerPage from "./pages/TagManagerPage";

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
  {
    path: "/build-manager",
    element: (
      <AppLayout>
        <AdminProtectedPage>
          <BuildManagerPage />
        </AdminProtectedPage>
      </AppLayout>
    ),
  },
  {
    path: "/build-editor/:id?",
    element: (
      <AppLayout>
        <AdminProtectedPage>
          <BuildEditorPage />
        </AdminProtectedPage>
      </AppLayout>
    ),
  },
  {
    path: "/tag-manager",
    element: (
      <AppLayout>
        <AdminProtectedPage>
          <TagManagerPage />
        </AdminProtectedPage>
      </AppLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <AppLayout>
        <AboutPage />
      </AppLayout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
