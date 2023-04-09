import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Cart from "../../pages/Cart";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const { isCartOpen } = useSelector((state) => state.carts);
  return (
    <>
      {isCartOpen === true && <Cart />}
      <Header />
      <main className="layout__Wrapper">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
