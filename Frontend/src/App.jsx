import { useState, useEffect } from "react";
import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Layout/Loader";
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
  ShopAllOrdersPage,
  ShopOrdersDetails,
  OrderDetailsPage,
  TrackOrderPage,
  ShopRefundsPage,
} from "./routes/Routes.js";
import { ToastContainer, Bounce } from "react-toastify";
import store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { loadShop } from "./redux/actions/user.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { ShopProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
function App() {
  const { loading } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.seller);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  const stripePromise = useMemo(
    () => (stripeApiKey ? loadStripe(stripeApiKey) : null),
    [stripeApiKey],
  );
  useEffect(() => {
    store.dispatch(loadUser()); // was: store.dispatch({ type: "user/getUser" })
    store.dispatch(loadShop());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  return (
    <>
      {loading || isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {stripeApiKey && (
            <Elements stripe={stripePromise}>
              <Routes>
                <Route
                  path="/payment"
                  element={<ProtectedRoute children={<PaymentPage />} />}
                ></Route>
              </Routes>
            </Elements>
          )}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/log-in" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
            <Route path="/best-selling" element={<BestSellingPage />}></Route>
            <Route path="/events" element={<EventPage />}></Route>
            <Route path="/faq" element={<FAQPage />}></Route>
            <Route
              path="/checkout"
              element={<ProtectedRoute children={<CheckoutPage />} />}
            ></Route>
            <Route
              path="/order/success"
              element={<ProtectedRoute children={<OrderSuccessPage />} />}
            ></Route>
            <Route
              path="/profile"
              element={<ProtectedRoute children={<ProfilePage />} />}
            ></Route>
            <Route
              path="/user/track/order/:id"
              element={<ProtectedRoute children={<TrackOrderPage />} />}
            />{" "}
            <Route
              path="/user/order/:id"
              element={<ProtectedRoute children={<OrderDetailsPage />} />}
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
            <Route
              path="/dashboard-create-product"
              element={
                <ShopProtectedRoute children={<ShopCreateProductPage />} />
              }
            />
            <Route
              path="/dashboard-products"
              element={<ShopProtectedRoute children={<ShopProductsPage />} />}
            />
            <Route
              path="/dashboard-create-event"
              element={
                <ShopProtectedRoute children={<ShopCreateEventPage />} />
              }
            />
            <Route
              path="/dashboard-orders"
              element={<ShopProtectedRoute children={<ShopAllOrdersPage />} />}
            />
            <Route
              path="/order/:id"
              element={<ShopProtectedRoute children={<ShopOrdersDetails />} />}
            />
            <Route
              path="/dashboard-events"
              element={<ShopProtectedRoute children={<ShopEventsPage />} />}
            />
            <Route
              path="/dashboard-coupons"
              element={<ShopProtectedRoute children={<ShopAllCoupons />} />}
            />
            <Route path="/dashboard-refunds" element={<ShopProtectedRoute children={<ShopRefundsPage />} />} />



            {/* Shop Route For Normal User */}
            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />



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
        </>
      )}

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
