"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

function Wedding() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Replace with your actual folder name
        const folderName = "wedding"; 
        const response = await fetch(
          `/api/cloudinary-images?folder=${folderName}`
        );
        const data = await response.json();
        setImages(data);
        console.log("Fetched image URLs:", data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    customPaging: function(i: number) {
      return (
        <a>
          <Image 
            src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${images[i]}`} 
            alt={`Thumbnail ${i}`}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
            width={200}
            height={200}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true
  };

  if (loading) return <div>Loading images...</div>;
  if (!images.length) return <div>No images found</div>;

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((imgUrl, index) => (
          <div key={index}>
            <Image 
              src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${imgUrl}`} 
              alt={`Wedding photo ${index + 1}`}
              style={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }}
              width={400}
              height={400}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Wedding;