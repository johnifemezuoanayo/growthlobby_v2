import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const logoSizes = {
  sm: {
    wrapper: "size-10",
    image: 40,
    text: "text-xl",
  },
  md: {
    wrapper: "size-12",
    image: 48,
    text: "text-2xl",
  },
  lg: {
    wrapper: "size-20 sm:size-24",
    image: 96,
    text: "text-3xl",
  },
};

export function BrandLogo({
  showText = true,
  size = "sm",
  priority = false,
}: BrandLogoProps) {
  const selectedSize = logoSizes[size];

  return (
    <Link
      href="/"
      aria-label="Growthlobby home"
      className="group flex w-fit items-center gap-3"
    >
      <span
        className={`relative flex ${selectedSize.wrapper} items-center justify-center overflow-hidden rounded-full shadow-[0_0_15px_rgba(192,237,11,0.4)] transition-transform duration-300 group-hover:rotate-12`}
      >
        <Image
          src="/svgs/logo-icon.svg"
          alt=""
          width={selectedSize.image}
          height={selectedSize.image}
          priority={priority}
          className="size-full object-contain"
        />
      </span>
      {showText && (
        <span
          className={`${selectedSize.text} font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-brand-primary`}
        >
          Growthlobby
        </span>
      )}
    </Link>
  );
}
