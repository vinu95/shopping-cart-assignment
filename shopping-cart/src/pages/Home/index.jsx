import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../../components/Carousel";
import { fetchBanners } from "../../redux/features/bannerSlice";

function Home() {
  const dispatch = useDispatch();
  const { bannersData } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(fetchBanners());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CarouselComponent bannersData={bannersData} />
    </>
  );
}

export default Home;
