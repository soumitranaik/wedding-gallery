"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";
import * as faceapi from "face-api.js";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  folderName: string;
};

const EmblaCarousel1: React.FC<PropType> = (props) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detections, setDetections] = useState<faceapi.FaceDetection[][]>([]);
  const { slides, options, folderName } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Main carousel instance
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);

  // Thumbnails carousel instance
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
  });

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelPath = '/models';
        const cdnPath = 'https://justadudewhohacks.github.io/face-api.js/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
          faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
          faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
          faceapi.nets.faceExpressionNet.loadFromUri(modelPath),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face models:", error);
      }
    };

    loadModels();
  }, []);

  // Detect faces when models and images are loaded
  useEffect(() => {
    if (!modelsLoaded || images.length === 0) return;

    const detectFaces = async () => {
      const allDetections: faceapi.FaceDetection[][] = [];

      for (let i = 0; i < images.length; i++) {
        const img = imageRefs.current[i];
        if (!img) continue;

        // Wait for image to load
        await new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        });

        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        allDetections.push(detections.map((d) => d.detection));

        // Draw detections on canvas
        const canvas = canvasRefs.current[i];
        if (canvas) {
          const displaySize = { width: img.width, height: img.height };
          faceapi.matchDimensions(canvas, displaySize);
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      }

      setDetections(allDetections);
    };

    detectFaces();
  }, [modelsLoaded, images]);

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
        const response = await fetch(
          `/api/cloudinary-images?folder=${folderName}`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [folderName]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <HashLoader color="#f9f9f9" size={50} aria-label="Loading carousel" />
      </div>
    );

  if (!images.length) return <div>No images found</div>;

  return (
    <div className="embla relative">
      {/* Main Carousel */}
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((imgUrl, index) => (
            <div className="embla__slide relative" key={index}>
              {/* Hidden image for face detection */}
              <Image
                ref={(el) => {
                  imageRefs.current[index] = el;
                }} // Note the block {} and no return
                src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${imgUrl}`}
                alt={`Slide ${index + 1}`}
                style={{ display: "none" }}
                width={500}
                height={500}
                crossOrigin="anonymous"
              />

              {/* Visible image */}
              <div className="relative">
                <Image
                  src={`https://res.cloudinary.com/dkqe85r8b/image/upload/v1733404004/${imgUrl}`}
                  alt={`Slide ${index + 1}`}
                  width={1500}
                  height={500}
                  style={{ objectFit: "contain", height: "85vh" }}
                  loading="lazy"
                />

                {/* Canvas for face detection overlay */}
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el;
                  }} // Note the block and no return
                  className="absolute top-0 left-0"
                  style={{ pointerEvents: "none" }}
                />
              </div>

              {/* Face detection info */}
              {detections[index] && detections[index].length > 0 && (
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                  {detections[index].length} face(s) detected
                </div>
              )}
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
          className="embla__next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-md hover:bg-gray-600"
          onClick={scrollNext}
          aria-label="Next"
        >
          <FaAngleRight />
        </button>
      </div>

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

export default EmblaCarousel1;
