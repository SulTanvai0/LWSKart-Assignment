"use client";

import Image from "next/image";
import { useState } from "react";

const ImageDiv = ({ photosArray }) => {
    const [image, setImage] = useState(photosArray[0]);

    return (
        <div>
            {/* Large Image */}
            <Image
                src={image}
                width={500}
                height={500}
                alt="product"
                className="large-image w-full"
            />

            {/* Small Images */}
            <div className="grid grid-cols-5 gap-4 mt-4">
                {photosArray.map((photo, i) => (
                    <Image
                        onClick={() => setImage(photo)}
                        key={i}
                        src={photo}
                        alt={`product ${i + 1}`}
                        className={`small-image w-full cursor-pointer border ${photo === image ? "border-2 border-red-500" : ""}`}
                        width={100}
                        height={100}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageDiv;
