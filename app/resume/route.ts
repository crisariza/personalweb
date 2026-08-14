import { readFile } from "node:fs/promises";
import path from "node:path";

const DOWNLOAD_FILENAME = "Cristian Ariza - Resume.pdf";
const PDF_PATH = path.join(process.cwd(), "public/Cristian Ariza - Resume.pdf");

export async function GET() {
  try {
    const buffer = await readFile(PDF_PATH);
    const encodedFilename = encodeURIComponent(DOWNLOAD_FILENAME);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Cristian Ariza - Resume.pdf"; filename*=UTF-8''${encodedFilename}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Resume not found", { status: 404 });
  }
}
