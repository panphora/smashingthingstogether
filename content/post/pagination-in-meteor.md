+++
date = "2015-08-17"
title = "Pagination in Meteor.js (with Iron Router support)"
slug = "pagination-in-meteor-js-with-iron-router-support"
postid = 6

+++


Pagination might at first seem like a pretty easy, if not downright fun, feature to implement. However, like a lot of seemingly-small features, it can quickly balloon into a multi-day or multi-week project.

To give you an idea of how complicated pagination can be to implement, check out this 3 part tutorial written by the talented [Nick Riebeek](https://github.com/riebeekn):

1. [Part 1](http://experimentsinmeteor.com/paging-and-sorting-part-1/)
2. [Part 1a](http://experimentsinmeteor.com/paging-and-sorting-part-1a/)
3. [Part 2](http://experimentsinmeteor.com/paging-and-sorting-part-2/)

At the end of this tutorial, the author ends up with a well-designed, but pretty basic, pagination system. There's a "Previous" button and a "Next" button, but no ability to skip directly to a page by clicking on its page number &mdash; or to skip directly to the first or the last page. 

Also, unfortunately, the code in these blogs posts was not designed to be modular, so a lot of the code would have to be rewritten and customized for every page that has pagination on it or, ideally, reworked to be modular.

## Let's use a package instead!

We're going to use a package because we don't want to go through the hassle of implementing a pagination system ourselves. We're lucky there happens to be a really good pagination package already available: [Meteor Pages](https://atmospherejs.com/alethes/pages)

This is the best, most feature-complete package I've found for adding pagination to Meteor. Some of its features include:

- The ability to pre-fetch data from neighboring pages. The default it to grab 3 pages ahead of the first page, so when you click on pages 2-4, they should load instantly.
- A local cache of each page is stored on the client, so data is never fetched more than once.
- The whole collection isn't sent to the client. Only the data that's necessary is fetched. This is especially good for projects with large collections. **Note:** All collection data will be sent to the client anyways if you have the default `autopublish` package installed.

One downside of using this package, as we'll see later in this post, is it can be a little hard to customize. However, since [pagination isn't coming to the core Meteor tools any time soon](https://trello.com/c/YxHqvlXW/67-pagination-in-core), this package will probably be the best solution for a while.

# Getting started

## Create an app

Create an app if you don't have one already:

{{< highlight console >}}
meteor create [your-app-name]
{{< /highlight >}}

## Add the required packages

Add the [Meteor Pages](https://atmospherejs.com/alethes/pages) package, which we'll use to handle pagination:

{{< highlight console >}}
meteor add alethes:pages
{{< /highlight >}}

Add the [Iron Router](https://atmospherejs.com/iron/router) package, which we'll use to handle routing:

{{< highlight console >}}
meteor add iron:router
{{< /highlight >}}

## Add some data to a collection, so we have something to page through

**Note:** You only need to do this section if you don't already have a collection with lots of data in it.

Create a folder called `lib` in your project's main directory and create a file called `test-data.js` there.

{{< highlight console >}}
cd your-app-directory/
mkdir lib
cd lib
nano test-data.js # use your favorite text editor to create the file
{{< /highlight >}}

Add the following code to the `test-data.js` file. 

{{< highlight javascript >}}
Items = new Mongo.Collection("items");

if (Meteor.isServer && Items.find().count() !== 1000) {
  // this will delete the data in the items collection
  Items.remove({});

  // adds an index to make sorting by the 'id' property quicker
  Items._ensureIndex({
    id: 1
  });

  // adds 1000 documents to 'items' collection
  for (var i = 1; i < 1001; i++) {
    Items.insert({
      id: i,
      text: 'Hello from item #' + i + '!'
    });
  }
}
{{< /highlight >}}

This will generate 1000 documents, each with some unique text, and insert them into a collection called `items`.

We make sure we're indexing this collection by the `id` property, so it'll be easy to sort by this property later.

## Create the main templates

Include the following markup in your main `html` file. If you generated your project with `Meteor create`, this file will be called `[your-project-name].html`

{{< highlight html >}}
<template name="Layout">
  {{> yield}}
</template>

<template name="Items">
  {{> pages}}
  {{> pagesNav}}
</template>
{{< /highlight >}}

The first template, which we name `Layout` here, is an **Iron Router** convention. It's the layout, or container, that your app's pages will be rendered into.

The second template, which we name `Items` here, is what we'll use to render this particular page's content into.

So, to clarify, our page's data goes in the `Items` template, which, in turn, is rendered into the `Layout` template.

Inside the `Items` template, we have the `pages` and `pagesNav` helpers. These are bundled with the **Meteor Pages** package and are handled automatically. 

The `pages` helper is responsible for handling the display of the main part of the page, where all of our "items" will be displayed as a list. 

{{< highlight text >}}
Item 1 
Item 2
Item 3
etc.
{{< /highlight >}}

The `pagesNav` helper, on the other hand, is responsible for displaying the pagination controls, which appear at the bottom of the page and look something like this: 

{{< highlight text >}}
<<  <  1  2  3  4  5  6  7  >  >>
{{< /highlight >}}

## Let's initialize the pagination functionality!

Now we can initialize a `Meteor.Pagination` object, and get pagination working!

{{< highlight javascript >}}
Pages = new Meteor.Pagination(Items, {
  route: "/items/",
  router: "iron-router",
  routerTemplate: "Items",
  routerLayout: "Layout",
  sort: {
    id: 1
  },
  templateName: "Items"
});
{{< /highlight >}}

There are many settings that we can add in the initialization code, but the above code covers the basics. Check out the [Settings](https://github.com/alethes/meteor-pages/#settings) section of the **Meteor Pages** documentation for even more options. (The settings under the "Available to the client" heading are the ones you can customize.)

The `route` setting specifies the route that will be used for showing the different pages. Since we're using "/items/" here, the second page will look like "/items/2" and the third page will look like "/items/3".

The `router` setting specifies that we're using the **Iron Router** package for routing requests. This is the only router that **Meteor Pages** supports out of the box, although you can manually add others.

The `routerTemplate` setting specifies the template we're using to display the main content of this page. It should contain the `pages` and `pagesNav` helpers in it.

The `routerLayout` setting specifies the layout that this page will be rendered into.

The `sort` setting enables sorting on the collection. We're sorting our collection using the `id` property. (We could just as easily sort it by a different property, like `createdDate`, if the items in this collection had this property.)

The `templateName` setting isn't strictly necessary. You only need to use it if the value of your `routerTemplate` setting doesn't match the name of your collection. 

I'm in the habit of using all lowercase letters for my collection names and a capitalized word for my template names, so I need to use the `templateName` setting, as you can see. (If you're interested, you can read more about this issue here: [Meteor Pages Issue 95](https://github.com/alethes/meteor-pages/issues/95)).

**Note:** This configuration assumes you're okay with the **Meteor Pages** package handling this route for you. If you want to handle the route yourself, but add paging to some part of your page, [check out this tip](#extratiphowtoaddpaginationtoanexistingroute).

## We're all done! 

Well, not quite...

Everything should be working now. *Wooo!* 

However, you may want to customize the look and feel of your pagination items and controls. If this is the case, read on.

## Customizing the look of each item

Right now we're using a template that's bundled with **Meteor Pages** to display each item. 

Let's add a custom template to override the built-in template by using the `itemTemplate` setting in our initialization code.

{{< highlight javascript >}}
Pages = new Meteor.Pagination(Items, {
  itemTemplate: "Item", // add your template's name here
  route: "/items/",
  router: "iron-router",
  routerTemplate: "Items",
  routerLayout: "Layout",
  sort: {
    id: 1
  },
  templateName: "Items"
});
{{< /highlight >}}

Now let's write the code for the `Item` template, which will be passed all of the properties from each item. 

In this case, it will have access to the `id` and `text` properties, but we'll only be displaying the value of the `text` property.

{{< highlight html >}}
<template name="Item">
  <div class="item">{{text}}</div>
</template>
{{< /highlight >}}

We're just using a very simple `<div>` here, with the text of the item inside of it.

Let's style it to make it look a little better. Put the following code in your main `css` file. If you generated your project with `Meteor create`, this file will be called `[your-project-name].css`.

{{< highlight css >}}
.item {
  width: 300px;
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
}
{{< /highlight >}}

Now we have a nice looking item template that doesn't automatically show all the properties of our items, like the default template did. 

Feel free to customize it further.

## Customizing the pagination controls

What about the pagination controls, the ones that look like this:

{{< highlight text >}}
<<  <  1  2  3  4  5  6  7  >  >>
{{< /highlight >}}

Can we customize these too?

You'll notice they already look pretty nice. The HTML is structured well and each button is styled clearly. However, it's natural to want to change these things to suit the design of your app.

Here's where things get a little difficult.

I would strongly suggest just trying to work with the default HTML that's already there. You can achieve most styles you're looking for simply by overwriting the default CSS with your own. 

If you can make this work for you, then you've really lucked out.

However, if you're set on being able to modify the underlying HTML, continue on.

## There must be a setting for this...

There **is** actually a setting called `navTemplate`, which, according to the documentation, is "the name of the template used for displaying the pagination navigation".

However! Unfortunately, this setting is "unavailable to the client". This means it can't be modified without directly modifying the package code. It's tied to other functionality in the package too much to be easily modifiable.

You can see a proposal I created on GitHub to allow  users to modify this setting: [Meteor Pages Issue 166](https://github.com/alethes/meteor-pages/issues/166). It hasn't been responded to yet.

If you're still set on being able to modify the HTML directly, and you're okay with modifying the underlying package code, continue on to the dark side...

## A quick warning about modifying the source code of an external package

I would hardly ever suggest modifying the source code of another package and here's why...

It has 3 major drawbacks that I can think of:

1. As a good open-source citizen and responsible developer, if a package is missing a feature you need, you should fork the project and submit a pull request to the original author, after adding the functionality that you want. This way, everyone can benefit from your work.
2. It will be harder to update this package in the future. Not only will you be breaking the functionality that automatically tells you about updates to this package, you'll also be making it harder for other developers working on your project to update it. That's because even if they manually update it in the future, they'll somehow have to figure out how to re-implement all the changes you made into the new version of the package (which can be incredibly challenging if the package's API has changed significantly).
3. You're also making your code harder to debug. Expecting your developers to know that you made a change to an external package in your local repository is unfair and usually very hard to document. If a bug pops up due to your modifications, it will be hard to track down and fix it. 

If you're okay with all of the above concerns... keep reading.

## Modifying the pagination controls template

Download the alethes:pages package into a /packages folder in the root of your project

{{< highlight console >}}
cd your-app-directory/
mkdir packages
cd packages
git clone https://github.com/alethes/meteor-pages.git
{{< /highlight >}}

Change the package's name. You'll need to go into the package's package.js file inside of the `meteor-pages-master` folder that you just downloaded. At the top of that file, change the name of the package from "alethes:pages" to "alethes:pages-modified" or something like that.

{{< highlight console >}}
cd meteor-pages-master/
nano package.js
{{< /highlight >}}

Here's what the new code will look like:

{{< highlight javascript >}}
Package.describe({
  "name": "alethes:pages-modified", // change this line
  "summary": "State of the art, out of the box Meteor pagination",
  "version": "1.8.4",
  "git": "https://github.com/alethes/meteor-pages"
});
{{< /highlight >}}

Now, remove the original package:

{{< highlight console >}}
meteor remove alethes:pages
{{< /highlight >}}

And install your new custom package.

{{< highlight console >}}
meteor add alethes:pages-modified
{{< /highlight >}}

**Warning:** As I mentioned above, this will prevent Meteor from pinging you with update notifications for this package (because you're changing its name).

Now you can modify the template where the pagination controls are kept, which you can find in `your-app-directory/packages/meteor-pages-master/client/templates.html`

{{< highlight console >}}
cd your-app-directory/packages/meteor-pages-master/client/
nano templates.html # use your favorite text editor here
{{< /highlight >}}

The template you want to modify is called `_pagesNav`. 

Here's an example of how I modified mine:

{{< highlight html >}}
<template name="_pagesNav">
  {{#if show}}
    <div data-pages="{{name}}" class="pagination-cont">
      <div class="pagination">
      {{#each navigationNeighbors}}
        {{#unless isNavLink}}<div class="sm-hide clear"></div>{{/unless}}
        {{#if isNextLink}}<div class="sm-hide clear"></div>{{/if}}
        <a class="pagination-item block {{#unless isNavLink}}number{{/unless}} ml1 mr1 left plain-nav-link-with-hover {{active}} {{disabled}}" href="{{link}}">{{p}}</a>
      {{/each}}
      </div>
    </div>
  {{/if}}
</template>
{{< /highlight >}}

This is just an example, but it's what I'm using in my own project. It made it easier for me to make my pagination controls responsive, as well as replace the arrows (">" and "<") with labels, like "Next" and "Previous".

In order to get this template working, I also had to add some additional helpers to the `_pagesNav` template. 

These helpers can be found in `your-app-directory/packages/meteor-pages-master/client/controllers.coffee`

{{< highlight console >}}
cd your-app-directory/packages/meteor-pages-master/client/
nano controllers.coffee # use your favorite text editor here
{{< /highlight >}}

Here's an example of how you could modify these:

{{< highlight javascript >}}
Template._pagesNav.helpers
  // Note:
  // the "show", "link", and "navigationNeighbors" helpers 
  // aren't shown here because they come with the package
  isNavLink: (text) ->
    // this tells the template that this is not a page number link
    // which lets me style these links differently
    navLinkNames = ['First', 'Previous', 'Next', 'Last'];

    if navLinkNames.indexOf(this.p) >= 0
      return true
  isNextLink: (text) ->
    // this lets me know which link is the "Next" link
    // and I use this to implement a custom layout
    if this.p is 'Next'
      return true
{{< /highlight >}}

The helper that I appreciate the most here is the `isNavLink` helper. In my design I planned to style the "First", "Previous", "Next", and "Last" buttons differently than the individual page buttons, and this gave me ability to easily add different classes to the page number links so I could style them differently.

Thats it! 

You're all set with your completely custom pagination!

## Extra tip: how to add pagination to an existing route

Let's say you have an existing route with its own data and you want to add paging to a small section of the page.

The author of the **Meteor Pages** package has some notes on how to do that here: [Issue 104: Use Existing Iron-Router Route](https://github.com/alethes/meteor-pages/issues/104). Basically, you can remove the built-in routing setting and handle changing the pages yourself. He provides some sample code for how to accomplish this.

## This code is on GitHub

You can access all of the code mentioned in this article here: [Pagination demo](https://github.com/panphora/pagination-demo)

This repository doesn't include the custom "alethes:pages-modified" package that we made above. If you want to add that in, you'll have to do it yourself.

## Questions?

If you have any questions, you can leave a comment here, contact me on twitter at [artisfyhq](https://twitter.com/artisfyhq), or email me at [david@storylog.com](mailto:david@storylog.com).

**Also,** If anyone has a different solution for customizing the `_pagesNav` template, please let me know!