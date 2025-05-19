import { useEffect, Suspense, lazy } from "react";
import { Spin } from "antd";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useTenantStore } from "./stores/useTenantStore";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const StorefrontPage = lazy(() => import("./pages/StorefrontPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSummaryPage = lazy(() => import("./pages/OrderSummaryPage"));

function App() {
  const fetchTenants = useTenantStore((state) => state.fetchTenants);
  const isLoading = useTenantStore((state) => state.isLoading);
  const location = useLocation();

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/" && <Header />}
      <Spin
        spinning={isLoading}
        tip="Fetching tenant data..."
        wrapperClassName="flex-grow"
      >
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
                <Spin tip="Loading page..." wrapperClassName="min-h-[calc(100vh-64px)]" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/store/:slug" element={<StorefrontPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-summary" element={<OrderSummaryPage />} />
            </Routes>
          </Suspense>
        </main>
      </Spin>
    </div>
  );
}

// Wrap App with BrowserRouter
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;