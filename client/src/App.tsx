import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./appcomponents/pages/Homepage";
import AdminRoute from "./appcomponents/Admin/AdminRoute";
import AccessPage from "./appcomponents/AccessPage";
import WatchMovie from "./appcomponents/element/WatchMovie";
import ListMovie from "./appcomponents/element/ListMovie";
import NewMovieList from "./appcomponents/element/NewMovieList";
import SearchMovie from "./appcomponents/element/SearchMovie";
import SearchByYear from "./appcomponents/element/SearchByYear";
import { ProfileForm } from "./appcomponents/element/Profile";
import ChangePassWord from "./appcomponents/element/ChangePassWord";
import AccessAccount from "./appcomponents/AccessAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccessPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        children: [
          {
            index: true,
            element: <ListMovie />,
          },
          {
            path: "/movies/:movieTitle",
            element: <WatchMovie />,
          },
          {
            path: "/movies/more/:option",
            element: <NewMovieList />,
          },
          {
            path: "/search/:keyword?",
            element: <SearchMovie />,
          },
          {
            path: "/searchbyyear/:year?",
            element: <SearchByYear />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/settings",
    element: <AdminRoute />,
    children: [
      {
        path: "/admin/settings",
        lazy: async () => ({
          Component: (await import("./appcomponents/Admin/settings")).default,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (
                await import("./appcomponents/Admin/settings/profile")
              ).default,
            }),
          },
          {
            path: "setMore",
            lazy: async () => ({
              Component: (
                await import(
                  "./appcomponents/Admin/settings/profile/createmore"
                )
              ).default,
            }),
          },
          {
            path: "managesUser",
            lazy: async () => ({
              Component: (
                await import(
                  "./appcomponents/Admin/settings/profile/managementUser"
                )
              ).default,
            }),
          },
        ],
      },
    ],
  },
  {
    path: "/proflier",
    element: <AccessAccount />,
    children: [
      {
        index: true,
        element: <ProfileForm />,
      },
      {
        path: "changepassword",
        element: <ChangePassWord />,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
