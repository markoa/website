import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

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
    trailingSlash: false,
    items: sortedSignals.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/signals/${post.slug}/`,
    })),
  });
}
