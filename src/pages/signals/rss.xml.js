import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

export async function GET(context) {
  const signals = await getCollection('signals', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const sortedSignals = signals.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Marko Anastasov',
    description: 'Signals from Marko Anastasov',
    site: context.site,
    items: await Promise.all(
      sortedSignals.map(async (post) => {
        const { Content } = await post.render();
        const content = await marked.parse(post.body);
        
        return {
          title: post.data.type === 'photo' ? 'Photo' : post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: post.data.type === 'link' ? post.data.url : `/signals/${post.slug}/`,
          content: sanitizeHtml(content),
        };
      })
    ),
    customData: `<language>en-us</language>`,
  });
}
