// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { EmblaOptionsType } from "embla-carousel";
// import useEmblaCarousel from "embla-carousel-react";
// import { Thumb } from "./EmblaCarouselThumbsButton";
// import Image from "next/image";

// type PropType = {
//   slides: number[];
//   options?: EmblaOptionsType;
// };

// const EmblaCarousel: React.FC<PropType> = (props) => {
//   const [images, setImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { slides, options } = props;
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [emblaMainRef, emblaMainApi,] = useEmblaCarousel(options);
//   const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
//     containScroll: "keepSnaps",
//     dragFree: true,
//   });
//   const [emblaRef, emblaApi] = useEmblaCarousel()

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//     console.log("emblaApi", emblaApi)
//   }, [emblaApi])

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext()
//   }, [emblaApi])

//   const onThumbClick = useCallback(
//     (index: number) => {
//       if (!emblaMainApi || !emblaThumbsApi) return;
//       emblaMainApi.scrollTo(index);
//     },
//     [emblaMainApi, emblaThumbsApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaMainApi || !emblaThumbsApi) return;
//     setSelectedIndex(emblaMainApi.selectedScrollSnap());
//     emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
//   }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaMainApi) return;
//     onSelect();

//     emblaMainApi.on("select", onSelect).on("reInit", onSelect);
//   }, [emblaMainApi, onSelect]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         // Replace with your actual folder name
//         const folderName = "wedding";
//         const response = await fetch(
//           `/api/cloudinary-images?folder=${folderName}`
//         );
//         const data = await response.json();
//         setImages(data);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className="embla">
//       <div className="embla__viewport" ref={emblaMainRef}>
//         <div className="embla__container">
//         {images.map((imgUrl, index) => (
//             <>
//             <div className="embla__slide">
//               <div className="embla__slide__number">

//                   <div key={index}>
//                     <Image
//                       src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${imgUrl}`}
//                       alt={`Wedding photo ${index + 1}`}
//                       width={1000}
//                       height={1000}
//                     />
//                   </div>

//               </div>
//             </div>
//             </>
//             ))}

//         </div>
//       </div>
//       <button className="embla__prev" onClick={scrollPrev}>
//         Prev
//       </button>
//       <button className="embla__next" onClick={scrollNext}>
//         Next
//       </button>

//       <div className="embla-thumbs">
//         <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
//           <div className="embla-thumbs__container">
//             {images.map((imgUrl, index) => (
//               <Thumb
//                 key={index}
//                 onClick={() => onThumbClick(index)}
//                 selected={index === selectedIndex}
//                 index={index}
//                 imgUrl={imgUrl}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmblaCarousel;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import HashLoader  from "react-spinners/HashLoader";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  folderName: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { slides, options, folderName } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // Main carousel instance
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);

  // Thumbnails carousel instance
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
  });

  // Navigation callbacks
  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  // Sync main carousel and thumbnails
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const selected = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(selected);
    emblaThumbsApi.scrollTo(selected);
  }, [emblaMainApi, emblaThumbsApi]);

  // Set up event listeners
  // Set up event listeners
  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    const handleSelect = emblaMainApi.on("select", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/cloudinary-images?folder=${folderName}`);
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full" >     
      <HashLoader
          color="#f9f9f9"
          size={50}
          aria-label="Loading carousel"
        />
      </div>
    )
  if (!images.length) return <div>No images found</div>;

  return (
    <div className="embla relative">
      {/* Main Carousel */}
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((imgUrl, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${imgUrl}`}
                alt={`Slide ${index + 1}`}
                width={1500}
                height={500}
                style={{ objectFit: "contain", height: "85vh" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button
        className="embla__prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-md hover:bg-gray-600"
        onClick={scrollPrev}
        aria-label="Previous"
      >
        <FaAngleLeft />
      </button>
      <button
        className="embla__prev absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-md hover:bg-gray-600"
        onClick={scrollNext}
        aria-label="Next"
      >
        <FaAngleRight />
      </button>
      </div>

      {/* Navigation Buttons */}
     

      {/* Thumbnails */}
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images.map((imgUrl, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgUrl={imgUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default EmblaCarousel;
