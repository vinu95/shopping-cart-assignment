import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";

const Register = lazy(() => import('./pages/SignUp'));
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Suspense fallback={<div className="Suspense__Loader">Loading</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="signup" element={<Register page="signup" />} />
              <Route path="login" element={<Register page="login" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
