import { titleFont } from "@/config/fonts";

export interface TitleProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export function Title({ title, className, subTitle }: TitleProps) {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl mb-5">{subTitle}</h3>}
    </div>
  );
}
