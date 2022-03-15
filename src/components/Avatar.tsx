import Image, { ImageProps } from "next/image";
import cl from "@lib/cl";

interface Props {
  className?: string;
}

export default function Avatar(props: Props & ImageProps) {
  const { className, alt, src, ...ImageProps } = props;
  return (
    <div
      className={cl(
        "relative h-20 w-20 overflow-hidden rounded-full transition duration-500 sm:h-24 sm:w-24",
        className ? className : ""
      )}
    >
      <Image alt={alt} layout="fill" src={src} {...ImageProps} />
    </div>
  );
}
