import { GalleryPageView } from "@/components/gallery/gallery-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("gallery");
}

export default function GalleryPage() {
  return <GalleryPageView />;
}
