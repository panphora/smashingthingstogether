+++
date = "2016-03-30"
title = "Make a simple static blog with Hugo and deploy it to GitHub Pages: An easy, step-by-step tutorial"
postid = 8
draft = true
+++

## Why?

A free, fast, easy to update, fully customizeable blog that allows you to use your own domain is a hard thing to find these days. Using a static website generator with GitHub pages gives you many benefits and a ton of flexibility, while also being completely free and super fast.

This is something you can easily do with Ghost or Wordpress if you have around $10/month to spare. However, the satisfaction of building something from scratch is indescribeable and $10/month is actually quite a lot of money, *especially* if you have more than one blog.

## Why Static?

Skip this section if you already know that static websites are, in general, faster, less expensive, more customizeable, and more secure than dynamic websites.

**Faster:** Many web servers are automatically optimized to serve static websites. Dynamic website *can* be just as fast, it just usually requires a lot more maintenance and tuning.

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

This lack of preprocessing support can be seen as a downside, but I actually think it's nice. The last time I tried to start up an old gulp project, I got about 3-4 warnings about out-of-date NPM dependencies. When all I want to do is write a simple blog post, this kind of thing is a constant source of annoyance.

If Hugo adds support for minifying and concatenating CSS and JavaScript in the future, I'll use it, but until then I'm going to enjoy keeping things simple.

# Let's build something!

## Table of contents

1. [Install Hugo](#installhugo)
2. [Create a site](#createsite)
3. [Clean up](#cleanup)
4. [Site-wide data](#sitewidedata)
5. [Layouts and templates](#layouts)
6. [Static assets](#staticassets)
7. [Your first blog post!](#firstblogpost)
8. [View your blog](#viewblog)
8. [Syntax highlighting](#syntaxhighlighting)
9. [Comments with Disqus](#disqus)
10. [Host on GitHub Pages](#githubpages)
11. [How to deploy](#deploy)

<a name="installhugo"></a>
## 1. Install Hugo

On OS X, if you have Homebrew:

{{< highlight console >}}
brew update && brew install hugo
{{< /highlight >}}

Otherwise, download the installer here: https://github.com/spf13/hugo/releases

For more a more detailed guide, go here: https://gohugo.io/overview/installing/

<a name="createsite"></a>
## 2. Create a site

{{< highlight console >}}
hugo new site your_site
{{< /highlight >}}

<div class="tip mt1point5"><b>Tip:</b> You can download the basic site we create in steps 2-6: <a href="https://github.com/panphora/Basic-Hugo-Site">Basic Hugo Site</a></div>

<a name="cleanup"></a>
## 3. Clean up

For a simple blog, you don't need the `archetypes` or `data` directories, so I just deleted them for now.

You don't have to delete them, but I'm not going to explain what they're for in this tutorial.

{{< highlight console >}}
cd your_site
rm -r archetypes
rm -r data
{{< /highlight >}}

<a name="sitewidedata"></a>
## 4. Site-wide data

Add some basic info about your site to the `config.toml` file. You'll be able to use this info in all your templates.

{{< highlight text >}}
baseurl = "http://yoursite.com/"
languageCode = "en-us"
title = "Your Site Title"

[Params]
  author = "Your Name"
  description = "Your Site Description"
{{< /highlight >}}

<a name="layouts"></a>
## 5. Layouts and templates

This is where we get into the design of the site. We'll to keep things simple for now.

You can skip this section if you'd prefer to install a theme from the [Hugo Themes Directory](http://themes.gohugo.io/). It's as simple as:

{{< highlight console >}}
mkdir themes && cd themes
git clone <theme_clone_url>
{{< /highlight >}}

Otherwise, continue with the instructions here:

The files you'll need to create in this folder are:

- `partials/head.html`
- `partials/foot.html`
- `post/list.html`
- `post/single.html`
- `index.html`

Files in the `partials` directory are html snippets that you can use in any template. We'll pass them the parent template's context, so they'll be able to display post data or data defined in your `config.toml` file.

Inside the `post` directory there are two files, `list.html` and `single.html`. The `list.html` file will be used to render the front page's list of blog posts. The `single.html` file will be used to render a single blog post.

The `index.html` file is used to render the front page of your site.

Here's an example of what these files could look like for a *very* simple blog:

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
  <div class="container">
    <div class="site-header">
      <h1 class="site-title"><a href="{{ .Site.BaseURL }}">{{ .Site.Title }}</a></h1>
      <h2 class="page-description">{{ .Site.Params.description }}</h2>
    </div>
{{< /highlight >}}

The `head.html` partial is included in the `index.html` and `single.html` templates, which means it will show up on every page of your blog. 

In this partial, we set up all the basics for a basic, functional HTML template. We use the `Title` variable defined in your `config.toml` file, we have a link to a stylesheet, and we set up a basic header.

In the closing partial, `footer.html`, we close off all of the HTML tags created here.

**partials/foot.html**
{{< highlight html >}}
    <footer>&copy; {{ .Site.Params.author }} &middot; Proudly published with <a href="http://gohugo.io/">Hugo</a></footer>
  </div>
</body>
</html>
{{< /highlight >}}

The `foot.html` partial is included in the `index.html` and `single.html` templates, which means it will show up on every page of your blog. 

In this partial, we include a link back to Hugo, as well as a copyright notice. We also close all of the HTML tags that we opened in the `head.html` partial.

**post/list.html**
{{< highlight html >}}
<a href="{{ .Permalink }}" class="post">
  <header class="post-header">
    <h2 class="post-title">{{ .Title }}</h2>
    <time class="post-date" datetime='{{ .Date.Format "2006-01-02" }}'>posted {{ .Date.Format "Mon, Jan 2, 2006" }}</time>
  </header>
  <section class="post-excerpt">
    {{if .IsPage}}
      <p>{{ .Summary }}...</p>
    {{end}}
  </section>
</a>
{{< /highlight >}}

The `list.html` template is responsible for rendering a blog post's content on the home page, as part of a list of blog posts. It includes a reference to a template variable called `Permalink` and another one called `Summary`. These variables are automically generated for you by Hugo. 

The `Permalink` variable will be replaced by a link to your full post when you generate your site. And the `Summary` variable will, by default, automatically be set to the first 70 words of a blog post's content.

**post/single.html**
{{< highlight html >}}
{{ partial "head.html" . }}
<main class="content" role="main">
  <article class="post">
    <header class="post-header">
      <h2 class="post-title">{{ .Title }}</h2>
      <time class="post-date" datetime='{{ .Date.Format "2006-01-02" }}'>posted {{ .Date.Format "Mon, Jan 2, 2006" }}</time>
    </header>
    <section class="post-content">
      {{ .Content }}
    </section>
  </article>
</main>
{{ partial "foot.html" . }}
{{< /highlight >}}

The `single.html` template is responsible for rendering a single blog post. It includes references to the `head.html` and `foot.html` partials because it represents an entire page, unlike the `list.html` template.

This template includes the `Title`, `Date`, and `Content` variables. Hugo provides the ability to format the date. You can use pretty much any format here, as long as you use 2006 for the year, January for the month, and the 2nd for the day.

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

The `index.html` template is used to generate the front page of your site. It includes references to the `head.html` and `foot.html` partials because it represents an entire page.

In this template, we loop through the pages, which are stored inside a variable called `Data`. Then, if the page has a type of "post", we render it using the `list.html` template. Otherwise, we ignore it.

For this simple blog, we will only have one type of page, but it's still good to leave this check in here in case we add more types later.

<a name="staticassets"></a>
## 6. Static assets

For a basic blog, you have all you need. But we should definitely add a stylesheet to make things look a little bit nicer.

The following CSS should provide some very basic styling for your blog.

{{< highlight css >}}
/* normalize.css 4.0.0 */
progress,sub,sup{vertical-align:baseline}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0} figcaption, menu,article,aside,details,figure,footer,header,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0} [hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700} select,button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{cursor:pointer}[disabled]{cursor:default}[type=submit], [type=reset],button,html [type=button]{-webkit-appearance:button}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}button:-moz-focusring,input:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}/*# sourceMappingURL=normalize.min.css.map */

/* main style */

body {
  line-height: 1.4em;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

h1 { font-size: 2.2rem }
h2 { font-size: 1.7rem }
h3 { font-size: 1.5rem }
h4 { font-size: 1.25rem }
h5 { font-size: 1rem }
h6 { font-size: .875rem }

a {
  text-decoration: underline;
  color: #0074d9;
}

.container {
  max-width: 52rem;
  margin: 0 auto;
}

.site-header {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.site-title {
  margin-bottom: 1.5rem;
}

.site-title a {
  color: #222;
  text-decoration: none;
}

.site-title a:hover {
  color: #aaa;
}

a.post {
  display: block;
  text-decoration: none;
  color: #222;
  padding: 1rem 1rem .5rem 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  border: 1px solid transparent;
  margin-bottom: 2rem;
}

a.post:hover {
  border: 1px solid #ccc;
}

.post-title {
  margin-bottom: .5rem;
}

footer  {
  margin-top: 3rem;
  color: #999;
}

footer a {
  color: #999;
}
{{< /highlight >}}

<div class="tip mt1point5"><b>Tip:</b> You can download the basic site we create in steps 2-6: <a href="https://github.com/panphora/Basic-Hugo-Site">Basic Hugo Site</a></div>


<a name="firstblogpost"></a>
## 7. Your first blog post!

<a name="viewblog"></a>
## 7. View your blog

extra note: you can customize permalinks

<a name="syntaxhighlighting"></a>
## 8. Syntax highlighting

<a name="disqus"></a>
## 9. Comments with Disqus

<a name="githubpages"></a>
## 10. Host on GitHub Pages

taken directly from: https://gohugo.io/tutorials/github-pages-blog#configure-git-workflow

make sure you have a `README.md` file before starting this

{{< highlight console >}}
# Create a new orphand branch (no commit history) named gh-pages
git checkout --orphan gh-pages

# Unstage all files
git rm --cached $(git ls-files)

# i added this
git rm -r *

# Grab one file from the master branch so we can make a commit
git checkout master README.md

# Add and commit that file
git add .
git commit -m "INIT: initial commit on gh-pages branch"

# Push to remote gh-pages branch
git push origin gh-pages

# Return to master branch
git checkout master

# Remove the public folder to make room for the gh-pages subtree
rm -rf public

# i added this too
git commit -am "removed public dir"

# Add the gh-pages branch of the repository. It will look like a folder named public
git subtree add --prefix=public git@github.com:<github_username>/<github_repo_name>.git gh-pages --squash

# Pull down the file we just committed. This helps avoid merge conflicts
git subtree pull --prefix=public git@github.com:<github_username>/<github_repo_name>.git gh-pages

# Run hugo. Generated site will be placed in public directory (or omit -t ThemeName if you're not using a theme)
hugo -t ThemeName
# or just
hugo

# Add everything
git add -A

# Commit and push to master
git commit -m "Updating site" && git push origin master

# Push the public subtree to the gh-pages branch
git subtree push --prefix=public git@github.com:<github_username>/<github_repo_name>.git gh-pages
{{< /highlight >}}


<a name="deploy"></a>
## 11. How to deploy

make `deploy.sh` file

{{< highlight bash >}}
#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public git@github.com:panphora/panphora.git gh-pages
{{< /highlight >}}

<a name="githubpagesdomain"></a>
## 11. Custom domain on GitHub Pages

1. Adding your custom domain to a CNAME file: https://help.github.com/articles/setting-up-your-pages-site-repository/
  - this might not work with our subtree setup
2. Setting up an apex domain and www subdomain: https://help.github.com/articles/setting-up-an-apex-domain-and-www-subdomain/
  - ALIAS <your_domain>.com to <github_username>.github.io
  - CNAME www.<your_domain>.com to <github_username>.github.io

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

