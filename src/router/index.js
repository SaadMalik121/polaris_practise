import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddUser from "../pages/AddUser";
import ViewUsers from "../pages/ViewUsers";
import Home from "../pages/Home";
import EditUser from "../pages/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/viewusers",
        element: <ViewUsers />,
      },
      {
        path: "/edituser/:id",
        element: <EditUser />,
      },
      {
        path: "/orders",
        element: <div>Hello World</div>,
      },
    ],
  },
]);

export default router;
