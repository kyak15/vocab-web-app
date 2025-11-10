"use client";

type BookImageProps = {
  thumbnail?: string;
  size: "sm" | "md" | "lg" | "xl";
};

/**
 * Height ramps by size, then scales up at larger breakpoints.
 * Width is derived from aspect ratio (2:3), so no layout jump.
 */
const HEIGHTS: Record<BookImageProps["size"], string> = {
  // base      sm         md         lg         xl
  sm: "h-24   sm:h-28    md:h-32    lg:h-36    xl:h-40",
  md: "h-28   sm:h-32    md:h-36    lg:h-44    xl:h-48",
  lg: "h-36   sm:h-40    md:h-48    lg:h-56    xl:h-64",
  xl: "h-44   sm:h-48    md:h-56    lg:h-64    xl:h-72",
};

export default function BookImage({ thumbnail, size }: BookImageProps) {
  const heights = HEIGHTS[size];

  return (
    <div
      className={[
        "relative",
        // Aspect ratio keeps the box consistent across devices
        "aspect-[2/3]",
        // Height scales by breakpoints; width follows aspect
        heights,
        // Visual treatment
        "rounded-md overflow-hidden bg-gray-200",
        // Prevent the box from shrinking too small in tight rows
        "shrink-0",
      ].join(" ")}
      aria-label="Book cover"
    >
      {thumbnail ? (
        // Use absolute fill + object-cover to fill the box naturally
        <img
          src={
            thumbnail.startsWith("http://")
              ? thumbnail.replace("http://", "https://")
              : thumbnail
          }
          alt="Book cover"
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
}
