import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

type EventFrameProps = {
  photo: GalleryPhoto;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
};

export function EventFrame({
  photo,
  alt,
  sizes,
  className,
  imageClassName,
}: EventFrameProps) {
  return (
    <div className={`ev-frame ${className ?? ""}`}>
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
        className={`ev-frame-image ${imageClassName ?? ""}`}
      />
    </div>
  );
}
