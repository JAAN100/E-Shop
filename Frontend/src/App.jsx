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
  ShopActivation,
} from "./Routes.js";
import { ToastContainer, Bounce } from "react-toastify";
import store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser()); // was: store.dispatch({ type: "user/getUser" })
  }, []);
  return (
    <>
      {
        loading ? null : (
          <>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/log-in" element={<LoginPage />}></Route>
              <Route path="/sign-up" element={<SignUpPage />}></Route>
              <Route path="/products" element={<ProductsPage />}></Route>
              <Route path="/product/:name" element={<ProductDetailsPage />}></Route>
              <Route path="/best-selling" element={<BestSellingPage />}></Route>
              <Route path="/events" element={<EventPage />}></Route>
              <Route path="/faq" element={<FAQPage />}></Route>
              <Route path="/checkout" element={
                <ProtectedRoute children={<CheckoutPage />} />
              }>
              </Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
              <Route path="/order/success/:id" element={<OrderSuccessPage />} />
              <Route path="/profile" element={
                <ProtectedRoute children={<ProfilePage />} />
              } >
              </Route>
              <Route path="/shop-create" element={<ShopCreatePage />}>
              </Route>
              <Route path="/shop-login" element={<ShopLoginPage />}></Route>
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
        )
      }
    </>
  );
}

export default App;
