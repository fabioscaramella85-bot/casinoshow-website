import {
  careerLimits,
  extensionOf,
  isCareerCvExtension,
  preliminaryCvError,
  type CareerCvExtension,
} from "./schema";

export type CareersCv = {
  filename: string;
  contentType: string;
  size: number;
  bytes: Uint8Array;
};

const genericMime = new Set(["", "application/octet-stream", "binary/octet-stream"]);

const mimeByExtension: Record<CareerCvExtension, readonly string[]> = {
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

const pdfMagic = [0x25, 0x50, 0x44, 0x46];
const oleMagic = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
const zipMagic = [
  [0x50, 0x4b, 0x03, 0x04],
  [0x50, 0x4b, 0x05, 0x06],
  [0x50, 0x4b, 0x07, 0x08],
];

function startsWith(bytes: Uint8Array, magic: readonly number[]): boolean {
  if (bytes.length < magic.length) {
    return false;
  }
  return magic.every((value, index) => bytes[index] === value);
}

function includesAscii(bytes: Uint8Array, needle: string): boolean {
  const pattern = new TextEncoder().encode(needle);
  if (pattern.length === 0 || bytes.length < pattern.length) {
    return false;
  }
  const last = bytes.length - pattern.length;
  for (let index = 0; index <= last; index += 1) {
    let matched = true;
    for (let offset = 0; offset < pattern.length; offset += 1) {
      if (bytes[index + offset] !== pattern[offset]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return true;
    }
  }
  return false;
}

export function safeCvFilename(filename: string, extension: CareerCvExtension): string {
  const base = filename.split(/[/\\]/).pop() ?? "";
  const stem = base.replace(/\.[^.]+$/, "");
  const cleaned = stem
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, careerLimits.filename);
  return `${cleaned || "curriculum"}.${extension}`;
}

function contentMatches(bytes: Uint8Array, extension: CareerCvExtension): boolean {
  if (extension === "pdf") {
    return startsWith(bytes, pdfMagic);
  }
  if (extension === "doc") {
    return (
      startsWith(bytes, oleMagic) &&
      includesAscii(bytes, "WordDocument") &&
      !includesAscii(bytes, "Workbook")
    );
  }
  const zip = zipMagic.some((magic) => startsWith(bytes, magic));
  return (
    zip &&
    includesAscii(bytes, "word/document.xml") &&
    !includesAscii(bytes, "vbaProject.bin") &&
    !includesAscii(bytes, "xl/workbook.xml") &&
    !includesAscii(bytes, "ppt/presentation.xml")
  );
}

export async function inspectCv(
  file: File | null,
): Promise<{ ok: true; cv: CareersCv } | { ok: false; error: string }> {
  const early = preliminaryCvError(file);
  if (early || !file) {
    return { ok: false, error: early ?? "errors.cv" };
  }

  const extension = extensionOf(file.name);
  if (!isCareerCvExtension(extension)) {
    return { ok: false, error: "errors.cvType" };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.byteLength !== file.size || bytes.byteLength > careerLimits.cvBytes) {
    return { ok: false, error: "errors.cvSize" };
  }

  if (!contentMatches(bytes, extension)) {
    return { ok: false, error: "errors.cvContent" };
  }

  const declared = file.type.trim().toLowerCase();
  const allowed = mimeByExtension[extension];
  if (declared && !genericMime.has(declared) && !allowed.includes(declared)) {
    return { ok: false, error: "errors.cvContent" };
  }

  return {
    ok: true,
    cv: {
      filename: safeCvFilename(file.name, extension),
      contentType: allowed[0],
      size: bytes.byteLength,
      bytes,
    },
  };
}
