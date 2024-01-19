import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  /** Defined Routes */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="product/add" element={<AddProduct />} />
        </Route>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
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
