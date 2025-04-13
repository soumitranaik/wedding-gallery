"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import * as faceapi from "face-api.js";
import Image from "next/image";
import HashLoader from "react-spinners/HashLoader";
import { Button } from "../../components/ui/moving-border-button";
import { FileUpload } from "@/components/ui/file-upload";
type FaceMatchResult = {
  imgUrl: string;
  distance: number;
  position: { x: number; y: number };
};

export default function FaceRecognitionScanner({
  folderName,
  similarityThreshold = 0.6,
}: {
  folderName: string;
  similarityThreshold?: number;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [matches, setMatches] = useState<FaceMatchResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("waiting-for-upload");
  const [referenceDescriptor, setReferenceDescriptor] = useState<Float32Array | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);

  // 1. Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      setStatus("Loading face models...");
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      setStatus("Waiting for reference image upload");
    };
    loadModels();
  }, []);

  // 2. Handle image upload
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setStatus("Processing uploaded image...");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const imageUrl = event.target?.result as string;
        setReferenceImage(imageUrl);
        
        // Create HTMLImageElement from blob
        const img = await faceapi.bufferToImage(file);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          throw new Error("No face found in uploaded image");
        }

        setReferenceDescriptor(detection.descriptor);
        setStatus("Ready to scan");
        await fetchImages();
      } catch (error) {
        console.error("Image processing failed:", error);
        setStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  // 3. Fetch images from Cloudinary folder
  const fetchImages = async () => {
    try {
      setStatus("Fetching images...");
      const response = await fetch(`/api/cloudinary-images?folder=wedding`);
      const data = await response.json();
      setImages(data);
      setStatus(`Ready to scan ${data.length} images`);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setStatus("Failed to load images");
    }
  };

  // 4. Process images for face matching (same as before)
  const processImages = async () => {
    if (!referenceDescriptor || images.length === 0) return;

    processingRef.current = true;
    setMatches([]);
    setStatus("Starting face recognition...");
    const newMatches: FaceMatchResult[] = [];
    const faceMatcher = new faceapi.FaceMatcher([
      new faceapi.LabeledFaceDescriptors("reference", [referenceDescriptor]),
    ]);

    for (let i = 0; i < images.length; i++) {
      if (!processingRef.current) break;

      try {
        setStatus(`Processing image ${i + 1}/${images.length}`);
        setProgress(Math.round(((i + 1) / images.length) * 100));

        const imgUrl = `https://res.cloudinary.com/dkqe85r8b/image/upload/q_auto,f_auto,w_800/${images[i]}`;
        const img = await faceapi.fetchImage(imgUrl);

        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        for (const detection of detections) {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          if (bestMatch.label === "reference" && bestMatch.distance < similarityThreshold) {
            newMatches.push({
              imgUrl,
              distance: bestMatch.distance,
              position: {
                x: detection.detection.box.x,
                y: detection.detection.box.y,
              },
            });
          }
        }

        if (i % 5 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
      } catch (error) {
        console.error(`Error processing image ${i}:`, error);
      }
    }

    setMatches(newMatches.sort((a, b) => a.distance - b.distance));
    setStatus(`Completed. Found ${newMatches.length} matches`);
    processingRef.current = false;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Find Yourself in Wedding Album</h2>
      
      {/* Upload Section */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-2">1. Upload Your Reference Photo</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <button
  onClick={() => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  }}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
>
  {referenceImage ? "Change Photo" : "Upload Photo"}
</button>

{/* Take a photo with camera */}
<button
  onClick={() => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment"); // use "user" for front camera
      fileInputRef.current.click();
    }
  }}
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
>
  Take Photo
</button>
        
        
        {referenceImage && (
          <div className="mt-4">
            <Image
              src={referenceImage}
              alt="Reference"
              width={200}
              height={200}
              className="rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Status and Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span>Status: {status}</span>
          {progress > 0 && <span>{progress}%</span>}
        </div>
        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Action Button */}
      {/* <button
        onClick={processImages}
        disabled={!referenceDescriptor || status.includes("Processing")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-8"
      >
        {status.includes("Processing") ? "Processing..." : "Start Recognition"}
      </button> */}
      <Button
      onClick={processImages}
      disabled={!referenceDescriptor || status.includes("Processing")}
        borderRadius="1.75rem"
        className="bg-transparent text-white  border-neutral-200 dark:border-slate-800"
      >
         {status.includes("Processing") ? "Processing..." : "Start Recognition"}
      </Button>

      {/* Loading Indicator */}
      {status === "loading" && (
        <div className="flex justify-center mt-8">
          <HashLoader color="#3b82f6" size={50} />
        </div>
      )}

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match, index) => (
          <div key={index} className="border rounded-lg overflow-hidden relative">
            <Image
              src={match.imgUrl}
              alt={`Match ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Similarity: {(1 - match.distance).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}