import Image, { ImageProps } from "next/image";

import cl from "@lib/cl";

interface Props {
  size: string;
}

export default function Avatar(props: Props & ImageProps) {
  const { size, alt, src, ...imageProps } = props;
  return (
    <div
      className={cl("relative overflow-hidden rounded-full transition duration-500")}
      style={{ width: size, height: size }}
    >
      <Image alt={alt} layout="fill" src={src} {...imageProps} />
    </div>
  );
}
