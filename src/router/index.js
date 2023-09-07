import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import AddRegularProduct from "../pages/AddRegularProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/productDetail/:id",
        element: <ProductDetails />,
      },
      {
        path: "/addRegularProduct",
        element: <AddRegularProduct />,
      },
    ],
  },
]);

export default router;
