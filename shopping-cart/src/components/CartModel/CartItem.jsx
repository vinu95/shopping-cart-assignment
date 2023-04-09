import { decreaseQuantity, increaseQuantity } from '../../redux/features/cartSlice';
import styles from './cartmodel.module.scss';

function CartItem({product, dispatch}) {
    return (
        <div className={styles.CartItem__Wrapper}>
            <img src={product?.imageURL} alt="" />
            <div className={styles.CartItem__Description}>
                <h1>{product?.name}</h1>
                <div className={styles.CartItem__Price__Wrapper}>
                <div className={styles.CartItem__Qty__Container}>
                    <button onClick={() => dispatch(decreaseQuantity(product?.id))}>-</button>
                    <p>{product?.quantity}</p>
                    <button onClick={() => dispatch(increaseQuantity(product?.id))}>+</button>
                    <p>{`Rs.${product?.price}`}</p>
                </div>
                <p>{`Rs.${product?.price * product?.quantity}`}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;