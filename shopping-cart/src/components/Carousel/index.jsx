import Carousel from "nuka-carousel";
import styles from "./carousel.module.scss";

function CarouselComponent({ bannersData = [] }) {
  return (
    <section aria-label="Products Carousel">
      <div className={styles.Carousel__Container}>
        <Carousel wrapAround autoplay>
          {bannersData?.map((eachBanner) => {
            return (
              <img
                key={eachBanner.id}
                src={eachBanner.bannerImageUrl}
                alt={eachBanner.bannerImageAlt}
              />
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}

export default CarouselComponent;
