import Image from "next/image";
import { useState } from "react";

export default function Carousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <section className="py-4 border-t">
      <div className="relative h-[600px] rounded-lg ">
        <Image
          src={`/uploads/${images[currentImage]}`}
          fill
          style={{
            objectFit: "contain",
            borderRadius: "20px",
            maxWidth: "100%",
          }}
          alt="images"
        />
      </div>
      {images.length > 1 && (
        <div className="flex justify-center items-center pt-3">
          {images.map((img, index) => {
            return (
              <span
                className={`border block mr-2 last:mr-0 rounded-full cursor-pointer${
                  index == currentImage
                    ? " bg-blue-700  h-3 w-3 "
                    : " bg-gray-300 h-2 w-2"
                }`}
                key={img}
                onClick={() => {
                  setCurrentImage(index);
                }}
              ></span>
            );
          })}
        </div>
      )}
    </section>
  );
}
