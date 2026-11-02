import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

const assets = {
  header: {
    src: "/loghi/logo-header.png",
    width: 1600,
    height: 437,
    className: "h-auto w-[200px] md:w-[220px] xl:w-[240px]",
    sizes: "(min-width: 1280px) 240px, (min-width: 768px) 220px, 200px",
  },
  footer: {
    src: "/loghi/logo-footer.png",
    width: 600,
    height: 600,
    className: "h-[112px] w-[112px] md:h-[132px] md:w-[132px]",
    sizes: "(min-width: 768px) 132px, 112px",
  },
} as const;

type BrandLogoProps = {
  label: string;
  variant: keyof typeof assets;
};

export function BrandLogo({ label, variant }: BrandLogoProps) {
  const asset = assets[variant];

  return (
    <Link href={routePathnames.home} className="inline-flex shrink-0">
      <Image
        src={asset.src}
        alt={label}
        width={asset.width}
        height={asset.height}
        sizes={asset.sizes}
        preload={variant === "header"}
        className={asset.className}
      />
    </Link>
  );
}
