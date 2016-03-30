+++
date = "2016-03-30"
title = "How to Make a Blog with Hugo"
postid = 8
draft = true

+++

Why do this?
  cheaper than Ghost/Wordpress/Medium/whatever, as in, free
  faster
  looks how you want it to
  very portable
  easy to write for (it's on your computer, no internet required)

Things you need to know

/content
  we have types of content, but just one for now: post
  posts can have data
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

