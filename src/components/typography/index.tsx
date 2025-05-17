"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactNode, createElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Typography variants with specific font sizes, weights, and styles.
 * Each variant corresponds to a unique combination of font weight and size.
 */
type FontWeight = "Bold" | "SemiBold" | "Medium" | "Regular";
type HeadingSize = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "H7" | "P";
type TypographyVariant = `${FontWeight}_${HeadingSize}`;

/**
 * Navigation direction for the link when `navigate` is used.
 */
type LinkDirection = "forward" | "back";

/**
 * Props for the Typography component.
 */
interface TypographyProps {
  /** Typography variant defining font size, weight, and style */
  variant: TypographyVariant;
  /** Content to be displayed inside the typography component */
  children: ReactNode;
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Maximum number of lines to display (for line clamping) */
  maxLines?: number;
  /** Link direction, used for navigation on click */
  navigate?: LinkDirection;
  /** Link URL if typography is used as a link */
  link?: string;
  /** Target for link, like "_blank" for new tab */
  target?: string;
  /** Disable text selection */
  disableSelect?: boolean;
  /** Click handler function */
  onClick?: () => void;
  /** Custom color for the label text */
  labelColor?: string;
  /** HTML element to render (defaults based on variant) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

/**
 * Typography component for rendering styled text based on variant types.
 * Supports link navigation and color customization.
 */
export const Typography: FC<TypographyProps> = ({
  variant,
  children,
  className = "",
  maxLines = 0,
  navigate,
  link = "",
  target = "",
  disableSelect = false,
  labelColor,
  onClick,
  as,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, string> = {
    Bold: "font-bold",
    SemiBold: "font-semibold",
    Medium: "font-medium",
    Regular: "font-normal",
  };

  const fontSizeMap: Record<HeadingSize, string> = {
    H1: "text-[30px] md:text-[39px]",
    H2: "text-[25px] md:text-[31px]",
    H3: "text-[20px] md:text-[25px]",
    H4: "text-[16px] md:text-[20px]",
    H5: "text-[14px] md:text-[16px]",
    H6: "text-[13px] md:text-[14px]",
    H7: "text-[12px] md:text-[13px]",
    P: "text-[16px]",
  };

  // Extract font weight and heading size from variant
  const [fontWeight, headingSize] = variant.split("_") as [FontWeight, HeadingSize];

  // Generate style classes
  const fontWeightClass = fontWeightMap[fontWeight] || "font-normal";
  const fontSizeClass = fontSizeMap[headingSize] || "text-base";
  const lineHeightClass = headingSize === "P" ? "leading-[160%]" : "leading-[140%]";

  const styleClasses = `${fontSizeClass} ${lineHeightClass} ${fontWeightClass}`;

  // Line clamping style
  const lineClampStyle =
    maxLines > 0
      ? {
          display: "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : {};

  const router = useRouter();

  const handleClick = (): void => {
    onClick?.();

    if (navigate) {
      navigate === "back" ? router.back() : router.forward();
    }
  };

  // Determine appropriate HTML element based on variant or override
  const getElement = (): string => {
    if (as) return as;

    // Default element mapping based on headingSize
    const elementMap: Record<HeadingSize, string> = {
      H1: "h1",
      H2: "h2",
      H3: "h3",
      H4: "h4",
      H5: "h5",
      H6: "h6",
      H7: "h6", // No h7 in HTML, fallback to h6
      P: "p",
    };

    return elementMap[headingSize] || "span";
  };

  const element = getElement();

  const content = createElement(
    element,
    {
      className: cn("text-light_dark_ dark:text-text_dark", styleClasses, className),
      style: {
        userSelect: disableSelect ? "none" : "auto",
        color: labelColor,
        ...lineClampStyle,
      },
      onClick: handleClick,
      ...props,
    },
    children,
  );

  return link ? (
    <Link href={link} target={target} className="max-w-fit">
      {content}
    </Link>
  ) : (
    content
  );
};
