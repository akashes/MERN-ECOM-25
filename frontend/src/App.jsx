import React, { Suspense, useEffect, lazy } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import ProtectedRoutes from "./components/ProtectedRoutes"; // Keep this as normal import
import Loader from "./components/Loader";
import HomeSkeleton from "./components/HomeSkelton";
import MainLoader from "./components/MainLoader";

// ✅ Lazy-loaded components
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./User/Register"));
const Login = lazy(() => import("./User/Login"));
const UserDashboard = lazy(() => import("./User/UserDashboard"));
const Profile = lazy(() => import("./User/Profile"));
const UpdateProfile = lazy(() => import("./User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./User/UpdatePassword"));
const ForgotPassword = lazy(() => import("./User/ForgotPassword"));
const ResetPassword = lazy(() => import("./User/ResetPassword"));
const Cart = lazy(() => import("./Cart/Cart"));
const Shipping = lazy(() => import("./Cart/Shipping"));
const OrderConfirm = lazy(() => import("./Cart/OrderConfirm"));
const Payment = lazy(() => import("./Cart/Payment"));
const PaymentSuccess = lazy(() => import("./Cart/PaymentSuccess"));
const MyOrders = lazy(() => import("./Orders/MyOrders"));
const OrderDetails = lazy(() => import("./Orders/OrderDetails"));
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const ProductsList = lazy(() => import("./Admin/ProductsList"));
const CreateProduct = lazy(() => import("./Admin/CreateProduct"));
const UpdateProduct = lazy(() => import("./Admin/UpdateProduct"));
const UsersList = lazy(() => import("./Admin/UsersList"));
const UpdateRole = lazy(() => import("./Admin/UpdateRole"));
const OrdersList = lazy(() => import("./Admin/OrdersList"));
const UpdateOrder = lazy(() => import("./Admin/UpdateOrder"));
const ReviewsList = lazy(() => import("./Admin/ReviewsList"));
const About = lazy(() => import("./components/About"));


const Home = React.lazy(() => import("./pages/Home"));
const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  console.log(isAuthenticated, user);
  return (
    <Router>
      <Suspense fallback={<MainLoader/>}>
        <Routes>
  
          <Route path="/" element={
            <Suspense fallback={<HomeSkeleton/>}>
              <Home/>
            </Suspense>
          } />
          <Route path="/about" element={<About/>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path='/profile' element={<ProtectedRoutes element={<Profile/>}   />} /> */}
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile/password/update"
            element={
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            }
          />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoutes>
                <Shipping />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoutes>
                <OrderConfirm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/process/payment"
            element={
              <ProtectedRoutes>
                <Payment />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/paymentSuccess"
            element={
              <ProtectedRoutes>
                <PaymentSuccess />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/orders/user"
            element={
              <ProtectedRoutes>
                <MyOrders />
              </ProtectedRoutes>
            }
          />
          <Route path='/orders/:orderId' element={<ProtectedRoutes><OrderDetails/></ProtectedRoutes>} />

         {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<ProtectedRoutes adminOnly={true}><Dashboard/></ProtectedRoutes>} />
          <Route path='/admin/products' element={<ProtectedRoutes adminOnly={true}><ProductsList/></ProtectedRoutes>} />
          <Route path='/admin/products/create' element={<ProtectedRoutes adminOnly={true}><CreateProduct/></ProtectedRoutes>} />
          <Route path='/admin/product/:updateId' element={<ProtectedRoutes adminOnly={true}><UpdateProduct/></ProtectedRoutes>} />
          <Route path='/admin/users' element={<ProtectedRoutes adminOnly={true}><UsersList/></ProtectedRoutes>} />
          <Route path='/admin/user/:userId' element={<ProtectedRoutes adminOnly={true}><UpdateRole/></ProtectedRoutes>} />

          <Route path='/admin/orders' element={<ProtectedRoutes adminOnly={true}><OrdersList/></ProtectedRoutes>} />
          <Route path='/admin/order/:orderId' element={<ProtectedRoutes adminOnly={true}><UpdateOrder/></ProtectedRoutes>} />
          <Route path='/admin/reviews' element={<ProtectedRoutes adminOnly={true}><ReviewsList/></ProtectedRoutes>} />
          





<Route path="*" element={<h1>404 - Page Not Found</h1>} />

        </Routes>
        {isAuthenticated && <UserDashboard user={user} />}
      </Suspense>
    </Router>
  );
};

export default App;
