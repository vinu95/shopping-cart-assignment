import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../../components/Carousel";
import CategoryCard from "../../components/CategoryCard";
import { fetchBanners } from "../../redux/features/bannerSlice";
import {
  fetchCategories,
  setSelectedCategory,
} from "../../redux/features/categorySlice";
import RequireAuth from "../../shared/RequireAuth";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bannersData } = useSelector((state) => state.banners);
  const { categoriesData, selectedCategory } = useSelector(
    (state) => state.categories
  );

  // const sortedCategories = [...categoriesData].sort((a, b) => a.order - b.order);

  const handleExploreCategory = (categoryName) => {
    if (selectedCategory === categoryName) {
      dispatch(setSelectedCategory());
      return;
    }
    dispatch(setSelectedCategory(categoryName));
    navigate("/products");
  };

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireAuth>
      <CarouselComponent bannersData={bannersData} />
      <section>
        {categoriesData?.map((eachItem, index) => {
          return (
            <CategoryCard
              key={eachItem.id}
              categoryIndex={index}
              categoryItem={eachItem}
              handleExploreCategory={handleExploreCategory}
            />
          );
        })}
      </section>
    </RequireAuth>
  );
}

export default Home;
