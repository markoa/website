import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
  const signals = await getCollection('signals', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const sortedSignals = signals.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = await Promise.all(sortedSignals.map(async (post) => {
    // Get the raw MDX content, filter out imports, components, and props
    const mdxContent = (post.body || '')
      .split('\n')
      .filter(line => 
        !line.startsWith('import') && 
        !line.includes('<ImageLightbox') &&
        !line.includes('image={') &&
        !line.includes('alt=') &&
        !line.includes('class=') &&
        !line.includes('/>'))
      .join('\n')
      // Replace MDX-style line breaks with HTML ones
      .replace(/&lt;br\/&gt;/g, '<br/>');
    const htmlContent = parser.render(mdxContent)
      .replace(/&lt;br\/&gt;/g, '<br/>');

    // Skip items with no content
    if (!htmlContent.trim()) {
      return '';  
    }

    // Sanitize HTML but allow images and other useful tags
    const sanitizedContent = sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title']
      }
    });

    return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${context.site}signals/${post.slug}/</link>
        <guid isPermaLink="true">${context.site}signals/${post.slug}/</guid>
        <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        <content:encoded><![CDATA[${sanitizedContent}]]></content:encoded>
      </item>
    `;
  }));

  const rss = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" 
         xmlns:content="http://purl.org/rss/1.0/modules/content/"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Marko Anastasov</title>
        <description>Signals from Marko Anastasov</description>
        <link>${context.site}</link>
        <atom:link href="${context.site}signals/rss.xml" rel="self" type="application/rss+xml" />
        <language>en-us</language>
        ${items.filter(Boolean).join('')}
      </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
