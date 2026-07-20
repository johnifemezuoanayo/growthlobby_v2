import Link from "next/link";
import React from "react";
import TopRightIcon from "../../Icons/TopRightIcon";

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  size?: "small" | "large";
  icon?: React.ReactNode;
};

const sizeClasses = {
  small: "h-9 px-3 text-xs",
  large: "h-12 px-6 text-base",
};

export function NavButton({
  href,
  children,
  showIcon = true,
  className = "",
  size,
  icon,
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 rounded transition hover:bg-white ${size ? sizeClasses[size] : "h-10 px-4 text-sm"} ${className}`.trim()}
    >
      {children}
      {showIcon ? (
        <span aria-hidden="true">{icon ?? <TopRightIcon />}</span>
      ) : null}
    </Link>
  );
}

export default NavButton;
