import React from 'react';
import Image from 'next/image';

interface ImageType {
  url: string;
  // Add other properties here if necessary
}

interface PhotoGalleryProps {
  images: ImageType[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  return (
    <div className="imageContainer">
      <Image
        src={images[0].url}
        layout="responsive"
        width={1028}
        height={685}
        className="leftMainImage"
        alt="Main image"
      />

      <div className="rightImagesGrid">
        {images.slice(1,5).map((image: ImageType, index: number) => (
          <div key={index} className="rightImageContainer">
            <Image 
                src={image.url}
                layout="fill"
                className="rightImage"
                alt={`Side image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
