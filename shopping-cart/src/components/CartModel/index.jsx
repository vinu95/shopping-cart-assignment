import { setCartVisibility } from "../../redux/features/cartSlice";
import CartItem from "./CartItem";
import styles from "./cartmodel.module.scss";

function CartModel({ selectedProducts, totalPrice, totalCount, dispatch }) {
  const isCartEmpty = totalCount < 1;
  return (
    <section className={styles.Cart__Container} tabIndex="0">
      <div className={styles.Cart__Header}>
        {!isCartEmpty ? (
          <p>
            My Cart (
            {totalCount > 1 ? `${totalCount} items` : `${totalCount} item`})
          </p>
        ) : (
          <p>My Cart</p>
        )}
        <button
          onClick={() => dispatch(setCartVisibility(false))}
          aria-label="Close Cart"
        >
          X
        </button>
      </div>
      <div className={styles.CartItem__Body}>
        {!isCartEmpty ? (
          <>
            {selectedProducts.map((eachProduct) => {
              return (
                <div className={styles.Cart__Item__Wrapper}>
                  <CartItem
                    key={eachProduct.id}
                    product={eachProduct}
                    dispatch={dispatch}
                  />
                </div>
              );
            })}
            <div className={styles.Cart__Promo}>
              <img src="/static/images/lowest-price.png" alt="Promo" />
              <p>You wont find it cheaper anywhere</p>
            </div>
          </>
        ) : (
          <div className={styles.Empty__Cart__Text}>
            <h3>No Items in your cart</h3>
            <p>Your favorite items are just click away</p>
          </div>
        )}
      </div>
      <div className={styles.Cart__Footer}>
        {!isCartEmpty ? (
          <>
            <p>Promo code can be applied on payment page</p>
            <button onClick={() => dispatch(setCartVisibility(false))} aria-label="Proceed to Checkout">
              <span>Proceed to checkout</span>
              <span>{`Rs.${totalPrice}  >`}</span>
            </button>
          </>
        ) : (
          <button className={styles.Empty__Cart} onClick={() => dispatch(setCartVisibility(false))} aria-label="Start Shopping">
            <span>Start Shopping</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default CartModel;
