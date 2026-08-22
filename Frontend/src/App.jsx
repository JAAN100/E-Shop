import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  Activation,
  ProductsPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  ShopActivation,
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopProductsPage,
  ShopCreateEventPage,
  ShopEventsPage,
  ShopAllCoupons,
  ShopPreviewPage,
} from "./routes/Routes.js";
import { ToastContainer, Bounce } from "react-toastify";
import store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { loadShop } from "./redux/actions/user.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { ShopProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js"
import { getAllEvents } from "./redux/actions/event.js"
function App() {
  useEffect(() => {
    store.dispatch(loadUser()); // was: store.dispatch({ type: "user/getUser" })
    store.dispatch(loadShop());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/log-in" element={<LoginPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route
          path="/product/:name"
          element={<ProductDetailsPage />}
        ></Route>
        <Route path="/best-selling" element={<BestSellingPage />}></Route>
        <Route path="/events" element={<EventPage />}></Route>
        <Route path="/faq" element={<FAQPage />}></Route>
        <Route
          path="/checkout"
          element={<ProtectedRoute children={<CheckoutPage />} />}
        ></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/order/success/:id" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<ProfilePage />} />}
        ></Route>

        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />}></Route>
        <Route path="/shop-login" element={<ShopLoginPage />}></Route>
        <Route
          path="/shop/:id"
          element={<ShopProtectedRoute children={<ShopHomePage />} />}
        ></Route>
        <Route
          path="/dashboard"
          element={<ShopProtectedRoute children={<ShopDashboardPage />} />}
        ></Route>

        <Route path="/dashboard-create-product" element={
          <ShopProtectedRoute children={<ShopCreateProductPage />} />
        } />

        <Route path="/dashboard-products" element={
          <ShopProtectedRoute children={<ShopProductsPage />} />
        } />

        <Route path="/dashboard-create-event" element={
          <ShopProtectedRoute children={<ShopCreateEventPage />} />
        } />

        <Route path="/dashboard-events" element={
          <ShopProtectedRoute children={<ShopEventsPage />} />
        } />
        <Route path="/dashboard-coupons" element={
          <ShopProtectedRoute children={<ShopAllCoupons />} />
        } />

        {/* Shop Route For Normal User */}
        <Route path="/shop/preview/:id" element={
          <ShopPreviewPage />
        } />


        {/* Activation Pages */}
        <Route
          path="/activation/:activation_token"
          element={<Activation />}
        ></Route>
        <Route
          path="/shop-activation/:activation_token"
          element={<ShopActivation />}
        ></Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </>
  );
}

export default App;
