/* eslint-disable @next/next/no-img-element */

import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

type WixImageResizeProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill?: false;
      }
  );

export default function WixImageResize({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageResizeProps) {
  const imageUrl = mediaIdentifier
    ? props.scaleToFill || props === undefined
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          props.width,
          props.height,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;

  {
    /**not necessary to use next image here  */
  }
  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
