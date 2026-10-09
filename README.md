My personal website.

To add social links to the most recent published post, pass one or more post URLs:

```sh
npm run blog:links https://x.com/markoa/status/2016517902397018264
```

To update a specific post, include its slug (the Markdown filename or directory
name) before the URLs:

```sh
npm run blog:links superplane-is-open-source \
  https://x.com/markoa/status/2016517902397018264 \
  'https://news.ycombinator.com/item?id=46793814'
```

The command supports X/Twitter, LinkedIn `/posts/` links, Hacker News items,
and Bluesky posts on `markoanastasov.bsky.social`. It updates only the platforms
you provide and preserves the rest of the post.

The `--` separator is unnecessary for these positional arguments. Quote URLs
containing shell special characters such as `?` or `&` so the shell passes them
through unchanged.
