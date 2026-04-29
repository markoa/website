import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import sharp from "sharp";

type SignalPost = CollectionEntry<"signals">;

export async function getStaticPaths() {
  const posts = await getCollection("signals", ({ data }) => {
    return import.meta.env.PROD ? data.published : true;
  });

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as SignalPost;
  const svg = createOpenGraphSvg(post);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

function createOpenGraphSvg(post: SignalPost) {
  const titleLines = wrapText(post.data.title, 31, 4);
  const titleFontSize =
    titleLines.length > 3 ? 50 : titleLines.length > 2 ? 58 : 64;
  const titleLineHeight = Math.round(titleFontSize * 1.18);
  const date = formatDate(post.data.pubDate);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#454B5A"/>
  <text x="96" y="150" font-family="Lato, Arial, sans-serif" font-size="26" fill="#d7dbe3">${escapeXml(date)}</text>
  <text x="96" y="220" font-family="Lato, Arial, sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#ffffff">
    ${titleLines
      .map(
        (line, index) =>
          `<tspan x="96" dy="${index === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`
      )
      .join("")}
  </text>
  <text x="96" y="515" font-family="Lato, Arial, sans-serif" font-size="16" font-weight="300" fill="#d7dbe3" letter-spacing="3">AUTHOR</text>
  <text x="96" y="555" font-family="Lato, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff">Marko Anastasov</text>
  <text x="1104" y="515" text-anchor="end" font-family="Lato, Arial, sans-serif" font-size="16" font-weight="300" fill="#d7dbe3" letter-spacing="3">SOURCE</text>
  <text x="1104" y="555" text-anchor="end" font-family="Lato, Arial, sans-serif" font-size="24" font-weight="400" fill="#e5e7eb">markoanastasov.com/signals</text>
</svg>`;
}

function wrapText(text: string, maxLineLength: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxLineLength) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word);
    }

    if (lines.length === maxLines) break;
  }

  if (currentLine && lines.length < maxLines) lines.push(currentLine);

  const hasMoreWords = words.join(" ").length > lines.join(" ").length;
  if (hasMoreWords && lines.length > 0) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[.,;:!?]*$/, "")}...`;
  }

  return lines;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
