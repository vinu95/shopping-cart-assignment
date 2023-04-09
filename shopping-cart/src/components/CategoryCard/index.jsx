import styles from "./categorycard.module.scss";
function CategoryCard({ categoryIndex, categoryItem, handleExploreCategory }) {
  const { id, key, name, description, imageUrl } = categoryItem;
  return (
    <div
      className={
        categoryIndex % 2 === 0
          ? styles.Card__Wrapper
          : `${styles.Card__Wrapper} ${styles.Card__Reverse}`
      }
    >
      <div className={styles.home__Category_ImageWrapper}>
        <img src={imageUrl} alt={description} />
      </div>
      <div className={styles.home__CategoryCard_Details}>
        <h2>{name}</h2>
        <p>{description}</p>
        <button
          onClick={() => handleExploreCategory(id)}
        >{`Explore ${key}`}</button>
      </div>
    </div>
  );
}

export default CategoryCard;
