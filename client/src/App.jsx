import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  /** Defined Routes */
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* protected routes */}

        <Route path="/" element={<ProtectedRoute isAuth={isLoggedIn} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuth={isLoggedIn}
                  adminRoute={true}
                  isAdmin={user?.role === "admin"}
                />
              }
            >
              <Route path="category/add" element={<AddCategory />} />
            </Route>
            <Route path="products" element={<Products />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuth={isLoggedIn}
                  adminRoute={true}
                  isAdmin={user?.role === "admin"}
                />
              }
            >
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>

        {/* public routes */}
        <Route
          path="login"
          element={
            isLoggedIn === true ? <Navigate to="/" replace /> : <Login />
          }
        />

        <Route
          path="register"
          element={
            isLoggedIn === true ? <Navigate to="/" replace /> : <Register />
          }
        />

        <Route
          path="forgot-password"
          element={
            isLoggedIn === true ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
        <Route
          path="reset-password/:resetPasswordToken"
          element={
            isLoggedIn === true ? (
              <Navigate to="/" replace />
            ) : (
              <ResetPassword />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
