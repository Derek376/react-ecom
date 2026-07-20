// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { bannerLists } from "../../utils";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-96 sm:h-125 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.subtitle}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex h-full items-center px-8 sm:px-12 lg:px-16">
                <div className="max-w-lg text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {item.title}
                  </h3>
                  <h1 className="text-4xl sm:text-5xl font-bold mt-2">
                    {item.subtitle}
                  </h1>
                  <p className="mt-4 font-medium sm:font-bold">
                    {item.description}
                  </p>
                  <Link
                    className="mt-6 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                    to="/products"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
