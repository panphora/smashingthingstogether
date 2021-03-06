+++
date = "2015-06-03"
title = "Make Your First Meteor.js Package"
slug = "make-your-first-meteor-js-package"
postid = 4

+++


This tutorial will take you through the steps I took in order to make my first Meteor package.

## The Problem

I wanted to be able to show some elements on the page when my app was in production (i.e. deployed to a live server) and other elements when it was in development mode (i.e. on my local machine).

In the end, I wanted to be able to write code like this:

{{< highlight html >}}
{{#if isProdEnvironment}}
<div class="sign-up-message">Please sign up for our newsletter: <a href="http://eepurl.com/bjYG-9">Sign up</a></div>
{{/if}}
{{< /highlight >}}

**Note:** One reason you might want this functionality is if there are certain services that you don't want to be used for testing by your developers, like a sign up form that you don't want polluted with fake email addresses. The reason I'm using it is to hide an ugly red banner that I need to show in production because my site isn't ready yet, but I want to be able to show it off to friends and family.

## Step 1

Create a package inside your app directory.

{{< highlight console >}}
cd yourAppDirectory/
meteor create --package panphora:environment-template-helpers
{{< /highlight >}}

`panphora` is my Meteor username and `environment-template-helpers` is the package name.

See: http://docs.meteor.com/#/full/writingpackages

## Step 2

Add your package to your Meteor project.

{{< highlight console >}}
meteor add panphora:environment-template-helpers
{{< /highlight >}}

This will install the package as part of your Meteor app and let you start developing it live.

## Step 3

Edit your `package.js` file. Here's what mine looks like:

{{< highlight javascript >}}
Package.describe({
  name: 'panphora:environment-template-helpers',
  version: '0.0.1',
  summary: 'Use template helpers to determine if you are in development or production',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('templating', 'client');
  api.use('session', 'client');
  api.addFiles('server/environment-template-helpers.js', 'server');
  api.addFiles('client/environment-template-helpers.js', 'client');
});
{{< /highlight >}}

Most of this is generated by default.

Inside the `Package.onUse` function I tell Meteor that I need to use two of its built-in packages: `templating` and `session`.

I also include two files, one that will be loaded on the server and one that will be loaded on the client. If you want to use a file on both the server and the client, just don't specify a `client` or `server` string after the location of the file. For example: `api.addFiles('lib/environment-template-helpers.js')`.

You'll also notice I removed the reference to the default test file. Not a good idea usually, but this is a basic tutorial.

## Step 4

Editing the server file.

In the `server/environment-template-helpers.js` file I add some code for detecting if we're in production or not. 

**Note:** I checked multiple cloud hosting providers and all of them set the `NODE_ENV` environment variable to 'production' when in production, so the following should work.

{{< highlight javascript >}}
Meteor.methods({
  isProductionEnvironment: function () {
    var nodeEnv = process.env.NODE_ENV + '';

    if (nodeEnv.toLowerCase() === 'production') {
      return true;
    } else {
      return false;
    }
  }
});
{{< /highlight >}}

I default to `development` mode if `NODE_ENV` is set to anything other than 'production'.

This method will allow me to call the `isProductionEnvironment` function on the client and get back either a `true` or a `false` value.

## Step 5

Editing the client file.

I call the `isProductionEnvironment` method from the client and use the result to set some `Session` variables.


{{< highlight javascript >}}
Meteor.call('isProductionEnvironment', function (error, isProd) {
  if (error) {
    throw new Meteor.Error('detect-environment', 'Could not determine if in a production environment or not.');
  } else {
    Session.set('isDevEnvironment', !isProd);
    Session.set('isProdEnvironment', isProd);
  }
});
{{< /highlight >}}

I throw a `Meteor.Error` here if I get an error back from the server. I'm not sure if this is a best practice, but it doesn't seem to do any harm if it's triggered. Although, of course, the `Session` variables will never get set if it is.

## Step 6

Let's make some global template helpers that we can use in our client templates.

We need to get the `Session` variables that we set in the last step into our templates. Luckily, we can define global helpers than can be used in *any* template.

Let's define some in the `client/environment-template-helpers.js` file.

{{< highlight javascript >}}
Template.registerHelper('isDevEnvironment', function (template) {
  return Session.get('isDevEnvironment');
});

Template.registerHelper('isProdEnvironment', function (template) {
  return Session.get('isProdEnvironment');
});
{{< /highlight >}}

These helpers will let us do this: 

{{< highlight html >}}
{{#if isDevEnvironment}}
We're in development mode!
{{/if}}
{{< /highlight >}}

and 

{{< highlight html >}}
{{#if isProdEnvironment}}
We're in production mode!
{{/if}}
{{< /highlight >}}

Continue this tutorial only if you want to learn how to add your package to the Meteor package directory.

## Step 8

Move your package into a separate git repository.

{{< highlight console >}}
cd yourAppDirectory/
# your app directory
cd packages/
# your app's packages directory
cp -R environment-template-helpers $HOME/GitHub
# copy your package into a separate folder
cd $HOME/GitHub/environment-template-helpers
# move into your package directory
git init
# initiate a git repository
git add .
# add all the files in this directory to your repository
git commit -am "initial commit"
# make your first commit
{{< /highlight >}}

Now, create a new repo on [GitHub](https://github.com/), then follow along with the commands below.

See: [Add an existing project to GitHub - GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)

{{< highlight console >}}
git remote add origin <GitHubURL>
git push origin master
{{< /highlight >}}

Back in **Step 3** you may have noticed that there was an empty field in the `package.js` file called `git`. This is where we can now add a link to our new GitHub project. This is an important step, so that other developers can review our code when they're auditing our package.

Fill out the `git` field in `package.js`, commit this change, and then push this change to GitHub.

## Step 9

One last step before you can get your package out into the world!

Go into your package's directory publish it:

{{< highlight console >}}
cd yourAppDirectory/
meteor publish --create
{{< /highlight >}}

You only need the `--create` flag the first time you publish a package.

That's it! It's out there now! You can search for it by searching for your username or a keyword, for example:

{{< highlight console >}}
meteor search environment-template
{{< /highlight >}}

**Note:** Every time you call `meteor publish` you need to update the version number in your `package.js` file. That's how Meteor will know that's it's a new version.

**Note:** Meteor will auto-generate a file called `.versions` and put it inside your package directory. You should include this file in your git repository. It helps make sure that other people who download your package end up using all the same versions of your package dependencies. For example, in this package, we're using version `1.1.0` of the `session` package and version `1.1.1` of the `templating` package.

## Step 10

Clean up time!

We're going to remove the local version of this package from our app and add in our newly published version. (This step is totally optional).

{{< highlight console >}}
meteor remove panphora:environment-template-helpers
# remove the package from your Meteor app
rm -rf packages/environment-template-helpers/
# remove the package's directory and files
{{< /highlight >}}

**Warning:** Always be super careful when using the `rm -rf` command, as it's potentially very dangerous (the `r` and the `f` stand for `recursive` and `force` respectively. These are **very** dangerous words when working with files and folders.)

Add your brand new package:

{{< highlight console >}}
meteor add panphora:environment-template-helpers
{{< /highlight >}}

**Woohoo! First package done!**

https://atmospherejs.com/panphora/environment-template-helpers

Good luck. Feel free to ask questions below in the comment area.