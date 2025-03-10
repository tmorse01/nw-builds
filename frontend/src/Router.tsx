import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageTitle } from "./components/PageTitle";
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
        <PageTitle title="Home" />
        <HomePage />
      </AppLayout>
    ),
  },
  {
    path: "/builds",
    element: (
      <AppLayout>
        <PageTitle title="Builds" />
        <BuildListPage />
      </AppLayout>
    ),
  },
  {
    path: "/build/:id",
    element: (
      <AppLayout>
        <PageTitle title="Build Details" />
        <BuildPage />
      </AppLayout>
    ),
  },
  {
    path: "/build-manager",
    element: (
      <AppLayout>
        <AdminProtectedPage>
          <PageTitle title="Build Manager" />
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
          <PageTitle title="Build Editor" />
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
          <PageTitle title="Tag Manager" />
          <TagManagerPage />
        </AdminProtectedPage>
      </AppLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <AppLayout>
        <PageTitle title="About" />
        <AboutPage />
      </AppLayout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
