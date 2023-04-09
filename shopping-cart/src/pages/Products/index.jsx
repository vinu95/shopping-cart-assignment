/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import ProductSidebar from "../../components/ProductSidebar";
import RequireAuth from "../../shared/RequireAuth";
import { addItemsToCart } from "../../redux/features/cartSlice";
import {
  fetchCategories,
  setSelectedCategory,
} from "../../redux/features/categorySlice";
import { fetchProducts } from "../../redux/features/productSlice";
import styles from "./products.module.scss";

function Products() {
  const dispatch = useDispatch();
  const { productsData, loading } = useSelector((state) => state.products);
  const { categoriesData, selectedCategory } = useSelector(
    (state) => state.categories
  );

  const filteredList = useMemo(() => {
    if (loading === false && productsData?.length > 0)
      return selectedCategory !== ""
        ? productsData?.filter(
            (eachProduct) => eachProduct.category === selectedCategory
          )
        : productsData;
  }, [selectedCategory, loading]);

  const handleCategory = (selectedCategoryId) => {
    if (selectedCategory === selectedCategoryId) {
      dispatch(setSelectedCategory());
      return;
    }
    dispatch(setSelectedCategory(selectedCategoryId));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
    if (categoriesData?.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <RequireAuth>
      <div className={styles.ProductsPage_Wrapper}>
        <ProductSidebar
          categories={categoriesData}
          handleCategory={handleCategory}
        />
        <div className={styles.Products__List__Container}>
          {filteredList?.map((eachProduct) => {
            return (
              <ProductCard
                key={eachProduct.id}
                product={eachProduct}
                addItemsToCart={() => dispatch(addItemsToCart(eachProduct))}
              />
            );
          })}
        </div>
      </div>
    </RequireAuth>
  );
}

export default Products;
