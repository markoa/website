---
title: "Using Flickr API with Ruby and r2flickr"
description: "Using the r2flickr gem to search Flickr photos from Ruby"
pubDate: 2010-05-13 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2010/05/13/using-flickr-api-with-ruby-and-r2flickr/"
---

If you want to use Flickr API with Ruby, there are [plenty of options](http://github.com/search?langOverride=&language=ruby&q=flickr&repo=&start_value=1&type=Repositories&x=28&y=22). The one we've been using for a long time was [rflickr](http://rubyforge.org/projects/rflickr/) by Trevor Schroeder, which is an implementation that matches the [Flickr API](http://www.flickr.com/services/api/) as it is officially documented. However, it was unmaintained in RubyForge's svn repo, and it needed some fixes, so we eventually published [r2flickr](http://github.com/markoa/r2flickr). You can install it as a regular gem:

```bash
sudo gem install r2flickr
```

Here's a hint on how you can search for photos with a certain tag and get some information about each of them:

```ruby
flickr = Flickr.new(FLICKR_CACHE_PATH, FLICKR_API_KEY, FLICKR_SHARED_SECRET)

photos = flickr.photos.search(
  :tags => "sunrise",
  :per_page => 20, :page => 1,
  :sort => "date-posted-desc"
)

photos.each do |photo|
  info = photo.flickr.photos.getInfo(photo.id)
  puts "#{info.title} from #{info.ownername}"
  puts photo.url('t')
end
```

For more details, check out the [project on GitHub](http://github.com/markoa/r2flickr).
