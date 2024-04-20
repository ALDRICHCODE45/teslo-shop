"use client";
import { type ReactElement } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideShow.css";
import Image from "next/image";

export interface ProductSlideShowMobileProps {
  images: string[];
  title: string;
  clasName?: string;
}

export function ProductSlideShowMobile({
  title,
  clasName,
  images,
}: ProductSlideShowMobileProps): ReactElement {
  return (
    <div className={clasName}>
      <Swiper
        style={{ width: "100%", height: "500px" }}
        pagination
        autoplay={{ delay: 2000 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2 p-0"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
