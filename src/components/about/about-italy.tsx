import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { aboutMedia, funCasinoLogoSrc, funCasinoSite } from "@/components/about/about-media";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

function readFunCasinoLogo() {
  const file = path.join(process.cwd(), "public", "chi-siamo", "logo-funcasino.png");
  if (!existsSync(file)) {
    return null;
  }

  const buffer = readFileSync(file);
  if (buffer.length < 24 || buffer.toString("ascii", 12, 16) !== "IHDR") {
    return null;
  }

  return {
    src: funCasinoLogoSrc,
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

export async function AboutItaly() {
  const t = await getTranslations("About.italy");
  const shell = await getTranslations("Shell");
  const logo = readFunCasinoLogo();

  return (
    <section className="about-italy" aria-labelledby="about-italy-title">
      <div
        className="about-italy-media"
        style={
          {
            "--about-italy-ratio": `${aboutMedia.italy.width} / ${aboutMedia.italy.height}`,
          } as React.CSSProperties
        }
      >
        <Image
          src={aboutMedia.italy}
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          quality={85}
          className="about-italy-image"
        />
      </div>
      <Container className="about-italy-content">
        <div className="about-italy-copy">
          <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
          <h2 id="about-italy-title" className="type-display about-italy-title">
            <span className="about-italy-title-lead">{t("titleLead")}</span>
            <span className="about-italy-title-accent">{t("titleAccent")}</span>
          </h2>
          <div className="about-italy-prose">
            <p className="type-body-lg">{t("p1")}</p>
            <p className="type-body">{t("p2")}</p>
          </div>
          {logo ? (
            <div
              className="about-italy-logo-frame"
              style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
            >
              <Image
                src={logo.src}
                alt={t("logoAlt")}
                fill
                sizes="(min-width: 768px) 360px, 280px"
                className="about-italy-logo"
              />
            </div>
          ) : (
            <p className="about-italy-wordmark">Fun Casinò</p>
          )}
          <a
            className="about-italy-cta type-button"
            href={funCasinoSite}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t("cta")}</span>
            <span className="sr-only"> ({shell("newTab")})</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="about-italy-cta-arrow">
              <path
                d="M4 12 12 4M6.5 4H12v5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
