import Link from "next/link";
import { useRef } from "react";
import {
  MdAudiotrack
} from "../icons"

interface IProps {
  images: any;
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading = "",
  imageRounded = false,
  type,
}: IProps) {
  const thumbnailRef = useRef<HTMLImageElement>();

  return (
    <Link href={`/${type}/${id}`} passHref>
      <div className="transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
        {images.length > 0 ? (
          <img
            src={images[0].url}
            alt={altTitle}
            ref={thumbnailRef}
            className={`object-cover w-full h-36  ${
              imageRounded ? "rounded-full" : "rounded"
            }`}
          />
        ) : (
          <div className="w-full h-40">
            <span className="flex items-center justify-center w-full h-full rounded bg-paper text-9xl">
              <MdAudiotrack />
            </span>
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="text-sm truncate text-gray">{subheading}</h6>
        )}
      </div>
    </Link>
  );
}
