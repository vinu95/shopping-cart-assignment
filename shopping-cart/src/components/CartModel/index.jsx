import { setCartVisibility } from "../../redux/features/cartSlice";
import CartItem from "./CartItem";
import styles from "./cartmodel.module.scss";

function CartModel({ selectedProducts, totalPrice, totalCount, dispatch }) {
  return (
    <section className={styles.Cart__Container} tabIndex="0">
      <div className={styles.Cart__Header}>
        <p>
          My Cart(
          {totalCount > 1 ? `${totalCount} items` : `${totalCount} item`})
        </p>
        <button onClick={() => dispatch(setCartVisibility(false))}>X</button>
      </div>
      <div className={styles.CartItem__Body}>
        {selectedProducts.map((eachProduct) => {
          return (
            <div className={styles.Cart__Item__Wrapper}>
              <CartItem product={eachProduct} dispatch={dispatch} />
            </div>
          );
        })}
      </div>
      <div className={styles.Cart__Promo}>
        <img src="/static/images/lowest-price.png" alt="Promo" />
        <p>You wont find it cheaper anywhere</p>
      </div>
      <div className={styles.Cart__Footer}>
        <p>Promo code can be applied on payment page</p>
        <button>
          <span>Proceed to checkout</span>
          <span>{`Rs.${totalPrice}  >`}</span>
        </button>
      </div>
    </section>
  );
}

export default CartModel;
