"use client";
import { useState, type ReactElement } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideShow.css";
import Image from "next/image";

export interface ProductSlideShowProps {
  images: string[];
  title: string;
  clasName?: string;
}

export function ProductSlideShow({
  title,
  clasName,
  images,
}: ProductSlideShowProps): ReactElement {
  const [thumbsSwiper, setThumsSwiper] = useState<SwiperType>();

  return (
    <div className={clasName}>
      <Swiper
        style={{ width: "400px", height: "600px" } as React.CSSProperties}
        navigation={true}
        autoplay={{ delay: 2000 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={400}
              height={400}
              src={`/products/${image}`}
              alt={title}
              className="rounded-lg "
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        style={{ marginLeft: "45px" }}
        onSwiper={setThumsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={800}
              src={`/products/${image}`}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
