+++
date = "2016-03-30"
title = "Make a simple static blog with Hugo and deploy it to GitHub Pages: An easy, step-by-step tutorial"
postid = 8
+++

## Why Static?

Skip this section if you already know that static websites are, in general, faster, less expensive, more customizeable, and more secure than dynamic websites.

**Faster:** Many web servers are automatically tuned to serve static websites. Dynamic website *can* be just as fast, it just requires a lot more maintenance and tuning.

**Less expensive:** I pay a few cents per month to host a static website on Amazon's S3 service. I pay absolutely nothing to host a couple websites on GitHub pages. In contrast, the 3 simple Ghost blogs I host on Runkite end up costing me $15 a month.

**Easier to customize:** In my experience, building a theme for Tumblr/Wordpress/Ghost is much more complicated than building a theme for a simple static website. There are just a lot more moving parts in those systems. Of course, this means they have more functionality built in, but when it comes down most of these extra features hardly ever matter that much.

**More secure:** I'm in the process of moving most of my websites over to static websites because the server that I hosted all of my side projects on got hacked. There was an insecure version of Redis installed on it (my fault), but now that I'm transitioning over to static sites, insecure software is just one more thing I don't have to think about.

## Why Hugo?

Skip this section if you've already decided to work with Hugo.

When looking for a static website generator, I considered many things, but when it came down to it only one thing really matters: *Does this software make it easier or harder to write a blog post?*

I like writing. Hugo makes it easy to write. Not only is it fast, but it's incredibly focused. The directory structure is simple. The blog posts are all in plain text, formatted in Markdown. Syntax highlighting comes built in and doesn't even require JavaScript. 

I can open my laptop, create a text file, and start writing. I don't have to wait for Medium/Tumblr/Wordpress to load. I don't have to deal with updating plugins or making sure my blogging software is up to date. I don't even have to be on the internet.

I can just write. Hugo is great for that.

## Why not Hugo?

There's one big downside to Hugo: it doesn't preprocess any static assets. This means no Sass, Jade, or Coffeescript.

Either do the preprocessesing on your own using a watch task in Gulp or Grunt, or keep your CSS and JavaScript simple like I do.

This lack of preprocessing support can be seen as a downside, but I actually think it's nice. The last time I tried to start up an old gulp project, I got about 3-4 warnings about out-of-date NPM dependencies. This would have been a minor annoyance if I was building a big web application, because I'd just be grateful for the new updates to software I got for free, but when all I want to do is write a simple blog post, it's actually quite an annoyance.

If Hugo supports minifying and concatenating CSS and JavaScript in the future, I'll use it, but until then I'm going to enjoy keeping things simple.

# Let's build something!

## Table of contents

1. Install Hugo https://gohugo.io/overview/installing/
2. Create a site
3. Clean up (delete https://gohugo.io/content/archetypes/ and delete /data)
4. Add some site-wide data
5. Add a layout (index, list, single, head, footer)
6. Add static assets (css, images, js, svgs, favicon)
7. Add a blog post
8. Add syntax highlighting
9. Add disqus
10. Host on GitHub
11. How to deploy after writing a new post


## Install Hugo

On OS X, if you have Homebrew:

{{< highlight console >}}
brew update && brew install hugo
{{< /highlight >}}

Otherwise, download the installer here: https://github.com/spf13/hugo/releases

For more a more detailed guide, go here: https://gohugo.io/overview/installing/

## Create a site

{{< highlight console >}}
hugo new site your_site
{{< /highlight >}}

## Clean up

For a simple blog, you don't need the `archetypes` or `data` directories, so I just deleted them for now.

You don't have to delete them, but I'm not going to explain what they're for in this tutorial.

{{< highlight console >}}
cd your_site
rm -r archetypes
rm -r data
{{< /highlight >}}

## Add some site-wide data

Add some basic info about your site to the `config.toml` file. You'll be able to use this info in all your templates.

{{< highlight text >}}
baseurl = "http://yoursite.com/"
languageCode = "en-us"
title = "Your Site Title"

[Params]
  author = "Your Name"
  description = "Your Site Description"
{{< /highlight >}}

## Add a layout

This is where we get into the design of the site. We'll to keep things simple for now.

The files you'll need to create in this folder:
- partials/foot.html
- partials/head.html
- post/list.html
- post/single.html
- index.html

**Partials** are html snippets that you'll use in multiple places. In this example, we're creating a `foot.html` file for the footer html and a `head.html` file for the header, so we can include each one wherever we want.

Inside the `post` directory are two files, `list.html` and `single.html`. The `list.html` file will be used to render the front page's list of posts. The `single.html` file will be used to render a single blog post.

The `index.html` file is they template for your front page. It will include the `list.html` file so it can render the list of blog posts to the home page.

Here's an example of what these files could look like for a simple blog:

**partials/foot.html**
{{< highlight html >}}
    <footer class="site-footer clearfix">
      <section class="poweredby">Proudly published with <a href="http://gohugo.io/">Hugo</a></section>
    </footer>
  </div>
  <script type="text/javascript" src="{{ .Site.BaseURL }}js/main.js"></script>
</body>
</html>
{{< /highlight >}}

**partials/head.html**
{{< highlight html >}}
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en-us">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <title>{{ .Title }}</title>
  <link rel="stylesheet" href="{{ .Site.BaseURL }}css/main.css">
</head>
<body>
  <div class="site-wrapper container">
    <div class="main-header">
      <h1 class="page-title"><a href="{{ .Site.BaseURL }}">{{ .Site.Title }}<img class="site-logo" alt="{{ .Title }} Logo" src="{{ .Site.BaseURL }}svgs/logo.svg" /></a></h1>
      <h2 class="page-description">{{ .Site.Params.description }}</h2>
    </div>
{{< /highlight >}}

**partials/list.html**
{{< highlight html >}}
<a href="{{ .Permalink }}" class="post">
  <header class="post-header">
    <h2 class="post-title">{{ .Title }}</h2>
    <time class="post-date">posted {{ .Date.Format "Mon, Jan 2, 2006" }}</time>
  </header>
  <section class="post-excerpt">
    {{if .IsPage}}
      <p>{{ .Summary }}...</p>
    {{end}}
  </section>
</a>
{{< /highlight >}}

**partials/single.html**
{{< highlight html >}}
{{ partial "head.html" . }}
<main class="content" role="main">
  <article class="post">
    <header class="post-header">
      <h1 class="post-title">{{ .Title }}</h1>
      <div class="extra-post-info">
        <time class="post-date" datetime="{{ .Date.Format "2006-01-02" }}">posted {{ .Date.Format "Mon, Jan 2, 2006" }}</time>
      </div>
    </header>
    <section class="post-content">
      {{ .Content }}
    </section>
  </article>
</main>
{{ partial "foot.html" . }}
{{< /highlight >}}

**partials/index.html**
{{< highlight html >}}
{{ partial "head.html" . }}
<main id="content" class="content" role="main">
  {{ range .Data.Pages }}
    {{ if eq .Type  "post" }}
      {{ .Render "list"}}
    {{ end }}
  {{ end }}
</main>
{{ partial "foot.html" . }}
{{< /highlight >}}

This will give you:
- A header and footer included on every page
- A site title and description based on the one your set up in config.toml
- A reference to a stylesheet in your <head>
- A reference to a js file after the main content, before the <body> closes
- A list of posts with the date and a summary
- A single post view with the title, date, and content of the post


What's happening here:
- Hugo uses the `index.html` file to render a list of all your posts. It gets them from the `Data.Pages` template variable.
- Hugo renders all of the individual posts using the `single.html` template. 
- If someone clicks on a post on the home page, they're taken to the corresponding post.



---------


Things you need to know

/content
  we have types of content, but just one for now: post
  posts can have data
    drafts
  posts are formatted in markdown
  syntax highlighting built in!

/layouts
  two things you need for a blog: list layout, single layout
  you can put these in a folder called post or default, probably better to put them in post
  partials for header and footer
  index file for the home page and post loop

/static
  not automatically preprocessed
    no sass
    no concatenation
    no minification
    does this matter that much? not if you keep these assets few and small, but yes if not
      you can use a watcher here to preprocess files -- i prefer not to to keep things simple
  put css, images, js, svgs, favicon here

config
  site name
  site description
  site url
  author?

adding disqus

hosting on github
  deploy process
  making the public folder a subtree
  script for commit and push out everything

what making a new post is like
  front matter
  does disqus have to be manual? can i use slug?
  markdown formatting
  code highlighting
  add draft tag if not done yet
  run deploy script

