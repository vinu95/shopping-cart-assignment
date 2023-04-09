import styles from "./product.module.scss";

function ProductCard({ product: { id, name, price, description, imageURL }, addItemsToCart }) {
  return (
    <div className={styles.Product__Wrapper}>
      <h3>{name}</h3>
      <div className={styles.Product__tablet__Wrapper}>
        <img src={imageURL} alt={name} />
        <div className={styles.Product__mobile_wrapper}>
          <p className={styles.Product__Description}>{description}</p>
          <div className={styles.Product__Price__Wrapper}>
            <p> MRP Rs.{price}</p>
            <button onClick={addItemsToCart} aria-label={`Buy ${name} @ Rupees ${price}`}>
              Buy Now&nbsp;
              <span className={styles.Product__Price}>{`@ MRP Rs.${price}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
