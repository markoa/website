import rss from "@astrojs/rss";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { getCollection } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

export async function GET(context) {
  if (!context.site) {
    throw new Error("site URL is not configured in your astro.config.mjs file");
  }

  // Get base URL without trailing slash
  let baseUrl = context.site.href;
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  // Create Astro container for rendering components
  const container = await AstroContainer.create({
    renderers: await loadRenderers([getMDXRenderer()]),
  });

  // Get and sort signals
  const signals = await getCollection("signals", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const sortedSignals = signals.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // Process each signal
  const feedItems = [];
  for (const post of sortedSignals) {
    try {
      // Get the content component
      const { Content } = await post.render();

      // Render content to string
      const rawContent = await container.renderToString(Content);

      // Process and sanitize content
      // For photo posts, add the image at the top
      let photoHtml = "";
      if (post.data.type === "photo" && post.data.image) {
        let imagePath;
        if (typeof post.data.image === "string") {
          // Handle string paths (e.g. "./_assets/photos/foggy-weekend.jpeg")
          imagePath = post.data.image.startsWith(".")
            ? `/signals/_assets/photos/${post.data.image.split("/").pop()}`
            : post.data.image;
        } else {
          // Handle Astro processed images
          imagePath = post.data.image.src;
        }
        const imageUrl = baseUrl + imagePath;
        photoHtml = `<p><img src="${imageUrl}" alt="${
          post.data.description || "Photo post"
        }"></p>`;
      }

      const content = await transform(
        (photoHtml + rawContent).replace(/^<!DOCTYPE html>/, ""),
        [
          // Make links and images absolute
          async (node) => {
            await walk(node, (node) => {
              if (node.name === "a" && node.attributes.href?.startsWith("/")) {
                node.attributes.href = baseUrl + node.attributes.href;
              }
              if (node.name === "img" && node.attributes.src?.startsWith("/")) {
                node.attributes.src = baseUrl + node.attributes.src;
              }
            });
            return node;
          },
          // Remove scripts and styles
          sanitize({ dropElements: ["script", "style"] }),
        ]
      );

      let feedLink = `/signals/${post.slug}/`;
      let feedTitle = post.data.title;

      // For link posts, use the external URL as the feed link
      if (post.data.type === "link" && post.data.url) {
        feedLink = post.data.url;
        feedTitle = `${post.data.title} →`;
      }

      feedItems.push({
        title: feedTitle,
        description: post.data.description || "",
        pubDate: post.data.pubDate,
        link: feedLink,
        content,
      });
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
      // Fallback to description if content processing fails
      feedItems.push({
        title: post.data.title,
        description: post.data.description || "",
        pubDate: post.data.pubDate,
        link: `/signals/${post.slug}/`,
        content: post.data.description || "",
      });
    }
  }

  return rss({
    title: "Marko Anastasov",
    description: "Signals from Marko Anastasov",
    site: context.site,
    trailingSlash: false,
    items: feedItems,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    customData: `
      <language>en-us</language>
      <atom:link href="${baseUrl}/signals/rss.xml" rel="self" type="application/rss+xml" />
    `,
  });
}
