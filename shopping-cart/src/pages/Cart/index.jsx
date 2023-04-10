import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartModel from "../../components/CartModel";
import { calculateTotalPrice } from "../../redux/features/cartSlice";
import Portal from "../../shared/Portal";

function Cart() {
  const dispatch = useDispatch();
  const { selectedProducts, totalPrice, totalProducts } = useSelector(
    (state) => state.carts
  );

  useEffect(() => {
    dispatch(calculateTotalPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, totalProducts]);

  return (
    <Portal id="product-cart">
      <CartModel
        selectedProducts={selectedProducts}
        totalPrice={totalPrice}
        totalCount={totalProducts}
        dispatch={dispatch}
      />
    </Portal>
  );
}

export default Cart;
