import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RestorePassword from "./pages/RestorePassword";
import Root from "./pages/Root";

const App = () => {
  /** Defined Routes */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="product/add" element={<AddProduct />} />
        </Route>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="restore-password" element={<RestorePassword />} />
        <Route
          path="reset-password/:resetPasswordToken"
          element={<ResetPassword />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
