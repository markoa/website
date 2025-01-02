import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";
import path from "path";

// Helper to normalize image paths and clean up query parameters
const normalizeImagePath = (imagePath) => {
  return imagePath
    .replace(/^\.\//, "") // Remove leading ./
    .replace(/^\//, "") // Remove leading /
    .replace(/\/+/g, "/") // Replace multiple slashes with single slash
    .split("?")[0]; // Remove query parameters
};

// Helper to construct full image URL
const getFullImageUrl = (site, imagePath) => {
  const baseUrl = site.toString().replace(/\/$/, ""); // Remove trailing slash from site
  return `${baseUrl}/${imagePath}`;
};

// Helper to process markdown content with images
const processMarkdownWithImages = async (body, postDir, site) => {
  const processedBody = body.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, alt, imagePath) => {
      const cleanPath = normalizeImagePath(
        path.join("signals", postDir, imagePath)
      );
      return `![${alt}](${getFullImageUrl(site, cleanPath)})`;
    }
  );

  return sanitizeHtml(await marked.parse(processedBody), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });
};

// Helper to process photo post image
const processPhotoImage = (image, site) => {
  let imagePath;
  if (typeof image === "string") {
    imagePath = normalizeImagePath(image);
  } else {
    const imageBasePath = image.src.split("?")[0];
    imagePath = normalizeImagePath(
      path.join("signals", "_assets/photos", path.basename(imageBasePath))
    );
  }
  return getFullImageUrl(site, imagePath);
};

export async function GET(context) {
  const signals = await getCollection("signals", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const sortedSignals = signals.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Marko Anastasov",
    description: "Signals from Marko Anastasov",
    site: context.site,
    items: await Promise.all(
      sortedSignals.map(async (post) => {
        let content = post.data.description || "";

        // Process markdown content if present
        if (post.body) {
          content = await processMarkdownWithImages(
            post.body,
            path.dirname(post.id),
            context.site
          );
        }

        // Handle photo posts
        if (post.data.type === "photo" && post.data.image) {
          const imageUrl = processPhotoImage(post.data.image, context.site);
          content = `<p><img src="${imageUrl}" alt="${
            post.data.description || "Photo post"
          }" /></p>${content}`;
        }

        return {
          title: post.data.type === "photo" ? "Photo" : post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link:
            post.data.type === "link"
              ? post.data.url
              : `/signals/${post.slug}/`,
          content,
        };
      })
    ),
  });
}
