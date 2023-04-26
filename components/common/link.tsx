import NextLink from "next/link";

export const Link = ({
  className,
  ...props
}: Parameters<typeof NextLink>[0]) => (
  <NextLink
    {...props}
    className={`hover:text-soft-pink-600 ${className ?? ""}`}
  />
);
