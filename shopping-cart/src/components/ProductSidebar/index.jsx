import { useSelector } from "react-redux";
import styles from "./productsidebar.module.scss";
function ProductSidebar({ categories, handleCategory }) {
  const { selectedCategory } = useSelector((state) => state.categories);
  return (
    <div className={styles.Category__Wrapper}>
      <ul className={styles.CategoryList}>
        {categories?.map((eachCategory) => {
          return (
            <li
              tabIndex="0"
              key={eachCategory.key}
              aria-label={`${eachCategory.name} category`}
              role="button"
              className={
                eachCategory.id === selectedCategory
                  ? styles.Selected__Category
                  : ""
              }
              onClick={() => handleCategory(eachCategory.id)}
            >
              {eachCategory.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductSidebar;
