import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  displayImage?: string;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
  displayImage,
}: Props) => {
  const localSrc = (src: any) => {
    let source: string = "";
    if (src.startsWith("http")) {
      source = src;
    }
    if (source.length === 0) {
      source = `/products/${src}`;
    }
    if (source.length === 0) {
      source = "/imgs/placeholder.jpg";
    }

    return source;
  };
  const imageToShow = displayImage ? localSrc(displayImage) : localSrc(src);

  return (
    <Image
      src={imageToShow}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
