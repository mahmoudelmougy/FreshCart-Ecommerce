import { RouterProvider,createHashRouter } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import UserContextProvider from "./components/TokenContext/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Details from "./components/Details/Details";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPasword/ResetPassword";
import { Toaster } from "react-hot-toast";
import CartContextProv from "./components/CartContext";
import BuyerData from "./components/buyerData/buyerData";
import Allorders from "./components/Allorders/Allorders";
import WishList from "./components/WishList/WishList";

let router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/WishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "BuyerData",
        element: (
          <ProtectedRoute>
            <BuyerData />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Details/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      { path: "/register", element: <Register /> },
      { path: "ForgetPass", element: <ForgetPass /> },
      { path: "ResetCode", element: <ResetCode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  let queryClient = new QueryClient();
  return (
    <>

      <QueryClientProvider client={queryClient}>
          <Toaster />
          <UserContextProvider>
            <CartContextProv>
              <RouterProvider router={router}></RouterProvider>
            </CartContextProv>
          </UserContextProvider>
        
      </QueryClientProvider>
    </>
  );
}

export default App;
