import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const heroImage = "/gallery/sfondo.png";

const desktopScrim =
  "linear-gradient(90deg, rgb(16 17 20 / 0.72) 0%, rgb(16 17 20 / 0.58) 24%, rgb(16 17 20 / 0.34) 46%, rgb(16 17 20 / 0.14) 62%, rgb(16 17 20 / 0) 78%)";

export async function GalleryHero() {
  const page = await getTranslations("Pages.gallery");
  const t = await getTranslations("Gallery");

  return (
    <section className="grid overflow-hidden bg-midnight text-text-on-dark">
      <div className="relative col-start-1 row-start-1 aspect-[4/3] md:aspect-auto md:min-h-[28rem] lg:min-h-[32rem]">
        <Image
          src={heroImage}
          alt=""
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[100%_42%] md:object-[74%_center] lg:object-[70%_center]"
        />
        <div className="absolute inset-0 hidden md:block" style={{ background: desktopScrim }} aria-hidden="true" />
      </div>
      <div className="relative z-10 col-start-1 row-start-2 bg-midnight md:row-start-1 md:flex md:min-h-[28rem] md:items-center md:bg-transparent lg:min-h-[32rem]">
        <Container className="py-8 max-md:px-5 md:py-16 lg:py-20">
          <div className="max-w-xl">
            <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
            <h1 className="type-display mt-4 text-balance">{page("heading")}</h1>
            <p className="type-body-lg mt-6 text-text-on-dark">{t("hero.support")}</p>
            <p className="type-body mt-4 text-text-muted-on-dark">{t("hero.lead")}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
