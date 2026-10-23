import Image from "next/image";
import type { CSSProperties } from "react";
import { brands, type BrandLogo } from "@/data/brands";
import { Container } from "@/components/ui/container";

const marqueeStyles = `
.brand-marquee-viewport {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 86px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 1.75rem, #000 calc(100% - 1.75rem), transparent);
  mask-image: linear-gradient(90deg, transparent, #000 1.75rem, #000 calc(100% - 1.75rem), transparent);
}

.brand-marquee-train {
  display: flex;
  width: max-content;
  animation: brand-marquee-scroll 42s linear infinite;
}

.brand-marquee-sequence {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin: 0;
  padding: 0 2.5rem 0 0;
  list-style: none;
}

.brand-marquee-sequence > li {
  display: flex;
  align-items: center;
}

.brand-marquee-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--logo-mw) * 0.78);
  height: calc(var(--logo-mh) * 0.78);
  flex: 0 0 auto;
}

.brand-marquee-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.74;
  transform: scale(1);
  transition:
    filter 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.brand-marquee-viewport:hover .brand-marquee-train {
  animation-play-state: paused;
}

.brand-marquee-logo:hover img {
  filter: none;
  opacity: 1;
  transform: scale(1.08);
}

@keyframes brand-marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (min-width: 768px) {
  .brand-marquee-viewport {
    height: 112px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 2.75rem, #000 calc(100% - 2.75rem), transparent);
    mask-image: linear-gradient(90deg, transparent, #000 2.75rem, #000 calc(100% - 2.75rem), transparent);
  }

  .brand-marquee-sequence {
    gap: 3.25rem;
    padding-right: 3.25rem;
  }

  .brand-marquee-logo {
    width: var(--logo-mw);
    height: var(--logo-mh);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-marquee-viewport {
    height: auto;
    overflow: visible;
    -webkit-mask-image: none;
    mask-image: none;
    padding-block: 0.85rem;
  }

  .brand-marquee-train {
    display: block;
    width: auto;
    max-width: 100%;
    animation: none !important;
    transform: none !important;
  }

  .brand-marquee-sequence {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    row-gap: 0.85rem;
    padding-right: 0;
  }

  .brand-marquee-sequence[data-duplicate] {
    display: none !important;
  }
}
`;

function BrandMark({ brand, decorative = false }: { brand: BrandLogo; decorative?: boolean }) {
  const svg = brand.src.endsWith(".svg");

  return (
    <span
      className="brand-marquee-logo"
      style={{ "--logo-mw": `${brand.maxWidth}px`, "--logo-mh": `${brand.maxHeight}px` } as CSSProperties}
    >
      <Image
        src={brand.src}
        alt={decorative ? "" : brand.name}
        width={brand.width}
        height={brand.height}
        quality={svg ? undefined : 75}
        sizes={`${brand.maxWidth}px`}
        unoptimized={svg}
      />
    </span>
  );
}

export function BrandMarquee() {
  return (
    <div className="bg-ivory">
      <style>{marqueeStyles}</style>
      <Container>
        <div className="brand-marquee-viewport">
          <div className="brand-marquee-train">
            <ul className="brand-marquee-sequence">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <BrandMark brand={brand} />
                </li>
              ))}
            </ul>
            <ul className="brand-marquee-sequence" data-duplicate="" aria-hidden="true">
              {brands.map((brand) => (
                <li key={`${brand.id}-copy`}>
                  <BrandMark brand={brand} decorative />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
