+++
date = "2016-11-11"
title = "Building a Simple Javascript Application"
slug = "building-a-simple-javascript-application"
postid = 8
+++

## Getting Started

New projects are always exciting. However, there's always the temptation to over-complicate things by planning ahead too much and adding on features that you won't even use in your final program.

For this project, we're just going to focus on the basics of getting a functional web-app up and running.

- This app will *not* be multi-user. It will just be for personal use. We can figure out how to make it multi-user later on.
- This app will be mobile responsive, so it will work on desktop browsers as well as mobile phones and tablets.
- You'll be able to access this app on the internet at the end of this tutorial.


## The Idea

This is the stage where we plan out the basic idea of our app. It's *really*, *really* easy to get carried away at this stage: adding in one "tiny" feature after another, which, taken together, complicate the finished product beyond recognition.

I'm going to try to keep it as simple as possible. We're going to build a ["Don't break the chain"](http://lifehacker.com/281626/jerry-seinfelds-productivity-secret) app and it's only going to just have one interactive element.

Here's what the final interface is going to look like:

![Don't Break the Chain](https://s3.amazonaws.com/webnet/thrivehive/dont-break.png)

Now, obviously, I'm cheating a little bit. I didn't start out with the idea for this interface right from the start. So, I'm going to try to take you through the whole process from start to finish, as it originally happened. This will give you an idea of what it might be for you to build an app from scratch.

When we're finished, we'll have a single page webapp that asks us a question: "Did you break the chain today?" If we answer "No", it will add that day as a block onto our calendar. If we don't answer for that day, we'll be left with a black "x" in the place of that day instead, reminding us that we broke the chain that day.


## Focus on functionality

I think design is just as important as functional code, however, I've found that the main stumbling block for a lot of people is just getting their head around something that technically works. So that's what I'm going to focus on.

To that end, we're going to skip over some parts.

For example, I'm not going to explain all of the libraries we're going to be using. I *will* explain the parts of these libraries that we use, but if you want to know more about them, please visit the links below.

- Firebase: https://firebase.google.com/
- jQuery: http://jquery.com/
- Normalize.css: http://necolas.github.io/normalize.css/
- Moment.js: http://momentjs.com/
- Underscore.js: http://underscorejs.org/


## A Starting Template

Also, I'm going to skip over explaining some of the basics of HTML. We're going to start out with a basic template already built. However, it's really very basic and if you look up an [HTML tutorial](http://www.dontfeartheinternet.com/04-from-scratch/) you'll probably be able to figure out what's going on.

**The template** (index.html):

{{< highlight html >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Don't break the chain</title>
  </head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css">
  <link rel="stylesheet" href="style.css">
  <body>
    <script src="https://cdn.firebase.com/js/client/1.0.21/firebase.js"></script>
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
    <script src="main.js"></script>
  </body>
</html>
{{< /highlight >}}

This is very close to the final HTML for the project. So, if you understand this much, we're good to move on to the next step.

**Download Project v1:** You can download all the files you need to start this project (`index.html`, `style.css`, and `main.js`) as a zip file by clicking here: [Download the starting template](https://s3.amazonaws.com/webnet/thrivehive/dont+break/dontbreakthechain-v1.zip)


## What about style?

I mentioned earlier that we don't want to focus too much on designing the app, so to that end I'm going to provide you with some basic styles to go along with the project. I'll explain some of them as we go along, but again, if you follow a basic CSS tutorial you'll be able to understand most of what's going on here.

Keep in mind that some of the elements mentioned in this stylesheet haven't been added to the page yet -- we'll get around to that later. While it may be tempting to figure out exactly what's going on, I'd strongly recommend just saving this code as a file called `style.css` (or by downloading it from the link above) and then move on to the even more interesting coding parts. Once we start to get an idea of how the code works, it will become easier to work with the whole package.

{{< highlight css >}}
*, *:before, *:after {
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
}

html {
  height: 101%;
}

.block {
  float: left;
  margin: 2px;
  background: black;
  color: white;
  padding: 10px 15px;
  text-align: center;
  font-size: 12px;
  width: 90px;
}

.blank {
  width: 90px;
  background: #ccc;
}

.blank .day-of-month {
  color: black;
}

.day-of-month {
  font-size: 30px;
  padding: 5px 0;
  font-weight: bold;
  font-size: 24px;
}


.main-button {
  color: white;
  text-decoration: none;
  padding: 8px 16px 9px;
  background: #CC2F2F;
  display: inline-block;
  border-radius: 3px;
}

.main-button:hover {
  background: #B22020;
}

.the-question {
  text-align: center;
  width: 280px;
  height: 160px;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 5px;
  margin: auto;
  position: absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;
  padding: 10px 20px 20px 20px;
  color: #B22020;
  background: #fff;
}

.the-question:hover {
  background: transparent;
}
{{< /highlight >}}

## A Quick Detour Before Diving In

In this project we're going to have data that we want to save. We're going to want this data to be available no matter which computer you access it from. In order to accomplish this we need access to a simple database.

Instead of setting up a database ourselves, we're going to take a shortcut and use a service called [Firebase](https://www.firebase.com/). It's simple to sign up for and it's **free**, so go do that now.

Once you're done signing up for a Firebase account, go ahead and create your first Firebase "app". You'll do that [here](https://console.firebase.google.com/). Name your app whatever you want and then add the following code to a file called `main.js`.

{{< highlight javascript >}}
var fb = new Firebase("https://<your-firebase>.firebaseio.com/");
{{< /highlight >}}

Replace the text "<your-firebase>" with your app name.

This will give us all we need in order to quickly get started saving and editing data.

**In short:** saving data is going to allow you to refresh the page or access it on a different computer and have it all still be there. It's going to be saved on an external computer maintained by Firebase.


## Diving In

The original idea I had for this app centered around one question: "Did you break the chain today?"

Every time I answered "No" to this question I wanted to add a little black box to the page.

In order to see what that might look like, let's write some basic code and run it in our browser's console. In pretty much any browser you can open its console by by pressing "F12" and clicking on the "Console" tab. I'd strongly recommend using Google Chrome for this, as it has the best Developer Tools (that's what you are now, btw: a developer).

Once we have the console open and we're on our `index.html` page, let's paste in the following code and press the `Enter` key, which will cause the code to run.

{{< highlight javascript >}}
$('<div></div>')
  .addClass('block')
  .appendTo('body');
{{< /highlight >}}

If we run this we should see a little black rectangle appear in the top left corner of the page.

The first line, `$('<div></div>')`, is using jQuery to create a new `<div>` html element. Then it's using jQuery's `addClass` method to add a class to that element. And, finally, it's "appending" or adding that element to the `<body>` element of the page, which already exists there (it's the `<body>` tag in our `index.html` file).

This can seem pretty complicated at first. And it is: there's a lot going on here. But right now we don't need to understand most of it. All we need to know is that this code creates an element, adds a class to it, and then adds that element to the page. 

It might be of interest to you that the above code can also be rewritten as follows:

{{< highlight javascript >}}
$('body')
  .append('<div class="block"></div>');
{{< /highlight >}}

Running either one will accomplish the same thing. But don't pay too much attention to this. As we go continue, things will start to make more sense.


## Making Our First Function

So, we can continue running the code above in the console over and over again (try pressing the up arrow while your cursor's in the console window, this will give you your previous statement).

However, it will be simpler in the longrun if we wrap this code in a function so that we can make it respond to different circumstances differently.

Functions are great because, if you build them well, you should hardly ever need to look inside them later on -- they just act as a snippet of reliable code that will do the same thing for you over and over again no matter how many times you call it.

Here's what a function looks like that just wraps the code we have so far:

{{< highlight javascript >}}
function makeBlock () {
  $('<div></div>')
    .addClass('block')
    .appendTo('body');
}
{{< /highlight >}}

If you want to run the code now (after adding this function to your `main.js` file, saving it, and reloading your `index.html` file in your browser), type the text `makeBlock()` in the console window on the same page.

Having this function is useful because if we want to use that code in multiple places now we won't have to copy and paste it -- we can just put the function there instead. This is super important because if you have lots of instances of the same code sprinkled around your project you might forget to update one of them when you're updating the others. Functions make it easy to deal with this problem.

In order to make this function a little more robust, however, we're going to make it possible to pass an argument into it. This will make it able to respond to differently depending on the data you pass to it, as I was saying before.

{{< highlight javascript >}}
function makeBlock (currentDay) {
  $('<div></div>')
    .text(currentDay)
    .addClass('block')
    .appendTo('body');
}
{{< /highlight >}}

Now this function will accept a string (which the function will call `currentDay`) and it will add this string as the text of the `<div>` element that it's creating. Try replacing the old function in your `main.js` file with this one. And then, when you run it in the console, pass in a string, like this:

{{< highlight javascript >}}
makeBlock('9/17/2014');
{{< /highlight >}}

This will add the current date to the blocks that you add to the page. Pretty cool, huh?

Now, at this point we're really starting to see how things work and it might be tempting to start thinking about the full-scope of our application again and wonder how we can make this function do even more to get us closer to our goal. It's certainly what I was thinking about after writing this function. I used it a few times and realized that it didn't care if I gave it the same date every time -- it would just create a duplicate block every time. This is not what we had in mind for the original application and it might be tempting to try to add a safeguard against duplicate dates here.

However, dates are the main pieces of data that we're working with, and as data, they should be handled separately from the interface. Whenever you start thinking about a data-related problem, try to take a step back and consider how you're consuming or handling your data *before* it reaches your front-end interface.


## Getting More Serious: How is the Data Going to be Organized?

It's usually after I start playing around with the interface a little that I start to think about how the data is going to be organized. If I can organize the data in a way that's easy to access and play around with, it will usually inform how I build the front-end tools that control how I display it.

This can seem like a boring task at first, but as you build more and more projects you'll realize that this is one of the most important steps. Well-organized data is *fun* to play around with. Badly-organized or complicated ways of organizing data can cause a lot of headaches later on.

I think the simplest way to store things for this project will be as simple array. I can keep an array of all the dates that have been completed already and loop through them to create the blocks.

Here's what that array might look like:

{{< highlight javascript >}}
  ["09/15/2014", "09/16/2014", "09/17/2014"]
{{< /highlight >}}

I had to think through this part a bit and I used a notepad that I keep next to my computer to write out all my thoughts. I recommend you do the same. At first I was thinking that we might also want to store the dates that we skip also or the date that we start working on our project. However, I realized that even though it removes some potential features from the project, we can mostly calculate what we need from the dates we already have. For example, I know there are date libraries out there that would make it relatively easy to calculate the dates in between dates so that instead of storing the skipped dates I could just calculate them on the fly as soon as the data's loaded.

**Download Project v2:** If you want to download the files, along with this new function, click here: [Download Version 2]()

## Loading the Data

Now, this part is a tiny bit complicated. It involves getting data from Firebase.

We already have this line in our `main.js` file (if you downloaded the files you'll need to uncomment this line):

{{< highlight javascript >}}
var fb = new Firebase("https://<your-firebase>.firebaseio.com/");
{{< /highlight >}}

Now, we're just going to add these lines below that line:

{{< highlight javascript >}}
fb.on('value', function (snapshot) {
  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    console.log("Here's our data: ", snapshot.val());
  }
});
{{< /highlight >}}

Now, if you save your `main.js` file and reload your page, you won't see anything pop up in the console. That's fine. Right now, when Firebase loads the data for us, it's handing us back the value `null`. And because we're checking `snapshot.val()` to see if it's truthy in our `if` statement, our `console.log` isn't going to print anything to the console.

Just as an experiment, you can try removing the if statement that's wrapping the `console.log` statement and see what's returned to you. However, feel free to just continue on if you want to start working with real data.

Okay, so now we're going to save some data to Firebase and watch it print out to the console.

All we need is the following line in order to save some data:

{{< highlight javascript >}}
fb.set({hello: 'hi'});
{{< /highlight >}}

Run this in the console.

This will save the object `{hello: 'hi'}` to your Firebase app's database. And you should seethe message `Here's our data:  Object {hello: "hi"}` in the console.

This is exciting... We're saving and receiving data from a database. So cool.

Okay, so now let's put some real data in there, something that looks like what we might want to use in our actual webapp. Run this in the console:

{{< highlight javascript >}}
fb.set(["09/15/2014", "09/16/2014", "09/17/2014"]);
{{< /highlight >}}

**Note:** Setting data like this will always overwrite what's already there, so be careful later on when calling this function without first adding it to the data you already have. We'll learn how to do this in just a bit.


## Consuming the Data

Okay, so now we're getting back data from Firebase and every time we load the page we should be seeing that data show up in the console. This is huge progress, but now we have to figure out what to do with this data.

The first thing I think we should do is make one of those black rectangles for all the dates we're getting back from Firebase. Here's the code we're going to use to do this (this is the entirety of the `main.js` file as of now):

{{< highlight javascript >}}
var fb = new Firebase("https://<your-firebase>.firebaseio.com/");

fb.on('value', function (snapshot) {
  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    var appData = snapshot.val();

    appData.forEach(function (item, index) {
      makeBlock(item);
    });
  }
});

function makeBlock (currentDay) {
  $('<div></div>')
    .text(currentDay)
    .addClass('block')
    .appendTo('body');
}
{{< /highlight >}}

So now if you save the `main.js` file and reload the page you should see three rectangles with dates in them.

**Download Project v3:** If you want to download the original files, along with the new code, click here: [Download Version 3]()

## Let's make it work

The last essential/functional piece we need is the ability to *add* a date and save this to the back-end database. After we manage to figure out how to do this, the code we've already written should work seemlessly to display that data. So, let's write a `saveDate` function.

We already specified that this code isn't going to save any date other than today, but in order to keep the code flexible and make it easier to debug we're going to make it so you can pass in a date to the `saveDate` function and make it able to handle that.

{{< highlight javascript >}}
function saveDate (newDate) {
  fb.set([newDate]);
}
{{< /highlight >}}

If we save this  new function in the `main.js` file and reload the page, running this function will work. Try typing the following in the console:

{{< highlight javascript >}}
saveDate('11/23/3000');
{{< /highlight >}}

You'll get a new block when you run this and it will appear next to the blocks you already have there.

However, if you refresh, you'll only have that block. All your other blocks will be gone. That's because we just overwrote our previous saved data.

So, let's make sure we extend our saved data instead of overwriting it.

The other thing we're going to do is remove the old blocks before adding them again, so that we don't run into issues with our data being out of sync with the display again.

## Removing Old Display Data

So, the first problem we want to solve is that our data is getting out of sync. Since the code that's run when we get a response from Firebase *only* adds blocks, but *doesn't* remove them, we can end up with blocks that no longer correspond to the array of dates in our data.

So right after we get the new data and before we use it, we're going to remove all the blocks from the page.

Here's what that block of code will look like: 

{{< highlight javascript >}}
fb.on('value', function (snapshot) {
  $('.block').remove();

  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    var appData = snapshot.val();

    appData.forEach(function (item, index) {
      makeBlock(item);
    });
  }
});
{{< /highlight >}}

Notice the line that reads `$('.block').remove();`. This will get all the elements on the page with the class "block" and remove them. 

This will make it so that *whenever* we receive new data, we also remove all the blocks before adding the ones that correspond to our data.

## Extending Saved Data Instead of Replacing It

This next section can be a little hard to understand at first, but once you get it, it will improve your understanding of Javascript programming in general.

The basic problem that we're running into now is that the data we load from Firebase *might* take a few milliseconds to load or it might take an hour to load. We have no control over this. You run into this problem when working with *any* server, even if you use your own local computer as a server. Firebase will (almost) never take more than a few hundred milliseconds to load, but it's important to keep in mind that *when* they give us the data back is not under our control, so we can never *depend* on it being there.

This is okay. This is what `promises` are for. Promises are pretty simple. They basically allow you to run some code as soon as something else happens somewhere else in your app.

Here's what our new code is going to look like:

{{< highlight javascript >}}
var fb = new Firebase("https://<your-firebase>.firebaseio.com/");
var whenDataLoaded = $.Deferred();
var appData;

fb.on('value', function (snapshot) {
  $('.block').remove();

  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    appData = snapshot.val();

    appData.forEach(function (item, index) {
      makeBlock(item);
    });
  } else {
    appData = [];
  }
});

function makeBlock (currentDay) {
  $('<div></div>')
    .text(currentDay)
    .addClass('block')
    .appendTo('body');
}

function saveDate (newDate) {
  whenDataLoaded.done(function () {
    if (appData) {
      appData.push(newDate);

    } else {
      appData = [newDate];
    }

    fb.set(appData);
  });
}
{{< /highlight >}}

We've done a couple things here. One, we've made the `appData` variable global, moving it outside of the function it was in before to the top level of our application. This makes it so we can access it from the `saveDate` function or *anywhere* in our application, even though the data is getting *set* inside of the Firebase `fb.on` code.

The second thing is the `promise` I was talking about, which I've named `whenDataLoaded`. It's set to be equal to `$.Deferred()`, which is jQuery's way of spelling `Promise`. 

The basic thing you have to understand about a promise is that it can be resolved -- and only once. This is done by calling `whenDataLoaded.resolve()` here. As soon as it's resolved, or even after it's resolved, if any function is called inside of the promise's `.done` callback, that function will be called.

In this case, we're calling the `.done` callback on the `whenDataLoaded` promise inside the `saveDate` function. This means that if the `saveDate` function is called *before* the data is loaded, it won't run *until* the data is loaded. And if it's called *after* the data is loaded, it will run anyways because the `whenDataLoaded` promise has already been resolved.

Basically, to sum this all up: this code is ensuring that *before* it saves the new data, the old data has already been loaded.

Then, you can see that in the `saveDate` function we check to see if `appData` has been defined -- basically asking: "Have we already saved some data to firebase or is this the first time through?" If the data exists, we push in some new data. If it doesn't exist yet, we make a new array with our new date as the only item. Then we overwrite the data in our Firebase app with our new data.

**Download Project v4:** If you want to download the original files, along with the new code, click here: [Download Version 4](). Try playing around with our new `saveDate` function in the console.

## Now We're Cookin'

Things are really getting going now. We have the ability to add a new date to our array of completed dates and it will even appear on the screen.

All we have to do is type the following line in the console:

{{< highlight javascript >}}
saveDate("whatever we want")
{{< /highlight >}}

And if we refresh the page, the data will still be there. This is good progress.

The next thing we want to do is make sure that we can't add the same date more than once. In order to do this we're going to use a function from the [Underscore.js](http://underscorejs.org/) library. Underscore is really great for working with arrays and objects in general, but we're just going to use it for this one function.

The function is called `_.uniq`.

And it's very cool. It takes an array as an argument and returns a copy of that array with all the duplicate elements removed.

Let's change how we handle incoming data to this:

{{< highlight javascript >}}
fb.on('value', function (snapshot) {
  $('.block').remove();

  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    appData = snapshot.val();

    appData = _.uniq(appData);

    appData.forEach(function (item, index) {
      makeBlock(item);
    });
  } else {
    appData = [];
  }
});
{{< /highlight >}}

You'll notice the only line we're changing is the one where we reset `appData` to an array with all unique items. 


## What's next? How About an Interface.

Let's make a little interface for handling the main question our application will be asking. This will ask the user, every day, if they've completed their task today, whatever it is.

Let's make it simple, just adding this code inside the body of the html:

{{< highlight html >}}
<div class="the-question">
  <h3>Did you break the chain today?</h3>
  <a href="#" class="main-button">No</a>
</div>
{{< /highlight >}}

This *needs* to go above the area where we're including the scripts and below the `<body>` tag.

You'll notice that if you hover over this new element with your mouse, the background will become transparent. This is so you can see the dates behind it, if there are any. If there aren't any dates behind it, it will just look normal.

**Note:** This new element, which holds our question, is being centered in the middle of the screen using a technique called ["Absolute Horizontal And Vertical Centering In CSS"](http://www.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/).

Now let's make it add today's date when you click the "No" button.

We need to add the following Javascript to our main.js file.

{{< highlight javascript >}}
$('.main-button').click(function (event) {
  event.preventDefault();
  saveDate(moment().format('MM/DD/YYYY'));
});
{{< /highlight >}}

After you add that code, save `main.js`, and refresh the page, try clicking the "No" button. Remember, it will only work once because we're not allowing duplicates.

We're doing a few things here. The first line of this code is saying: "Call the included function whenever someone clicks on an element with the class "main-button". And since our "No" button has that class, the function we provide the `click` binding will be called.

Then we're using the `event` object that's passed to this function (by jQuery) to prevent the default click action. Usually `<a>` links like this are used to take you to a new page on a site, but this one won't do that because its default action is being prevented here.

Lastly, we're saving a date using the function we made before. We're passing it in some special code though, code that will end up looking like the string `"09/18/14"`. The Moment.js library we're including gives us access to a global function called `moment`. When we call this function it will return an object that has a bunch of useful time and date related functions. One of them is called `format`. We're using that here to format our date into a string.

You can look at the [Moment.js](http://momentjs.com/) documentation if you want to explore more.

**Download Project v5:** If you want to download the original files, along with the new code, click here: [Download Version 5](). 

## Clearing the Data

Every once in a while I like making a function that I'm not going to use in the final code, but will be helpful for developing. It's just a shortcut for doing something that I've probably already done a few time while developing the app already.

In this case I just want to clear out all the data so I can start over and make sure things are working after I change something.

Let's add this function to `main.js`:

{{< highlight javascript >}}
function clearData () {
  fb.set([]);
}
{{< /highlight >}}

Very, very simple. But it should refresh all of the data in your application if you call it.

Try calling it now and then click the "No" button again. You should see a little rectangle with today's date in it.

It's awesome that you made it this far. We've almost got a complete little, personal application here. There are still a few problems with this little app, but we've almost got all the functionality we'll need.

## Let's Make it Look a Little Nicer

So, we've had a pretty good go so far. Let's make the dates look a little nicer before contiuing, so that we have a solid foundation to work with moving forward.

We're going to change the `makeBlock` function so that it presents the information in a slightly more appealing way, with the full month name and all the details on separate lines.

{{< highlight javascript >}}
function makeBlock (currentDay) {
  var momentObj = moment(currentDay, 'MM/DD/YYYY');
  var dayOfMonth = momentObj.date();
  var monthName = momentObj.format('MMMM');
  var year = momentObj.format('YYYY');

  $('<div></div>')
    .append('<div>' + monthName + '</div>')
    .append('<div class="day-of-month">' + dayOfMonth + '</div>')
    .append('<div class="year">' + year + '</div>')
    .addClass('block')
    .appendTo('body');
}
{{< /highlight >}}

As we saw earlier, the Moment.js library has the ability to output dates in a certain specified format. Well, it also has the ability to take them in in one format and output them in a brand new format.

So, in the first line of the function, we're passing in the current day, which is a string that looks like "11/05/99". We're turning that into a Moment object. Then we're getting the day of the month, the month name, and the year from that object.

After that, we use jQuery to insert these strings back into our little blocks. You can see we make a separate `<div>` element for each piece of information and append it to our block before adding the block to the `<body>` element.

## Missing Feature: Skipping Days

Okay, so we're missing one important feature that we said we were going to get around to eventually: what happens if you skip some days? Right now, if you skip some days, they just don't show up. This would be okay for a prototype to show a few people to see if they understand the general idea of the project, but in order to claim that it's a finished product we probably want to add in this missing feature.

Let's start out by talking through basically what we want to happen. I had to take out a notebook for this and write down the logic a few times. I made several mistakes along the way.

The first thing I knew we'd want to do is loop through all the dates we have so far. We'd find some way of turning them back into Moment objects and then we'd find some way to compare them. After comparing them and seeing how many milliseconds were between them (because dates are usually stored as milliseconds), we'd convert this milliseconds number into days and then insert that many days into our data in between the original dates.

So, for example, we'd end up with something like this as our data:

{{< highlight javascript >}}
["09/15/2014", "09/16/2014", "09/17/2014", "uncompleted data!", "uncompleted data!", "09/20/2014"]
{{< /highlight >}}

This would be fine. Although I immediately started getting a funny feeling about it. You always want to think twice before modifying your underlying data. You application expects the data to always be in the same form, so if you modify the format you're storing it in, you need to adapt the rest of your code so it can process it. Now, this is obvious and a lot of the time it's necessary to take this step and adapt all your underlying code for a new feature. 

But in this case, I decided that this wasn't a data concern -- this was a front-end display issue. I want my data to remain pure and simple, without corrupting it with all of the uncompleted dates. Usually, I've found that storing data that's in multiple formats in the same place isn't ideal. In this case we'd be adding weird strings that aren't dates alongside regular dates. 

After some thinking, I thought: why not just insert the empty dates directly into the front-end interface as soon as we find them, instead of adding them to the original array? 

So, we have to intercept the data right before it makes it into the interace, right before it's fed into the `makeBlock` function. Here's the code to accomplish this. Notice we're just modifying the Firebase-loading part of the code.

{{< highlight javascript >}}
fb.on('value', function (snapshot) {
  $('.block').remove();

  if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
    appData = snapshot.val();

    appData = _.uniq(appData);

    var previousDate = null;
    appData.forEach(function (item, index) {
      
      if (previousDate) {
        var momentObj = moment(item, 'MM/DD/YYYY');
        var differenceInDays = momentObj.diff(previousDate, 'days');

        if (differenceInDays > 1) {
          // add this many days to the rendered amount
          var addThisManyBlankBlocks = differenceInDays - 1;

          for (var i=0; i < addThisManyBlankBlocks; i++) {
            makeBlock('blank');
          }
        }

      }

      makeBlock(item);

      previousDate = moment(item, 'MM/DD/YYYY');
    });
  } else {
    appData = [];
  }

  whenDataLoaded.resolve();
});
{{< /highlight >}}

The only part we're modifying here is where we loop through the dates in the array. Before the loop, we're creating a variable where we're going to store the date that we just looped through, called `previousDate`. So, obviously, it will still be set to `null` on the first loop. At the end of the first loop, however, we set it equal to a Moment object that takes in the current date.

So, by the time the second loop comes along, the `previousDate` will be set to a Moment object. Our `if` statement will pass. Then we're going to turn the current date, called `currentItem` into a Moment object also. 

Then, we take advantage of a *really* cool feature that Moment objects have: a `diff` method. This method tells you the difference in time between two dates. And it even lets you specify a second argument that tells it what unit of time to return the difference in. This is perfect because we're looking for days, so we just pass in the string 'days' here.

If the difference in days is greater than one, we subtract that difference by one and add that many blocks to the interface by passing in the string `"blank"` to the `makeBlock` function. Of course we're going to have to go and modify our `makeBlock` function again, after this, but we kinda get the idea of what's going to happen there. After all that happens, we're going to make the block for the current item, using `makeBlock(item)`.

So, what ends up happening is we compare the current date in the loop with the previous date, get the number of days between them, and then add those days to the interface, in between the two dates. Then, we move on to the next date, and the process happens again.

Now, in order to make this work, we need to modify the `makeBlock` function so it can handle the string `"blank"`. This is pretty simple:

{{< highlight javascript >}}
function makeBlock (currentDay) {
  if (currentDay !== 'blank') {
    var momentObj = moment(currentDay, 'MM/DD/YYYY');
    var dayOfMonth = momentObj.date();
    var monthName = momentObj.format('MMMM');
    var year = momentObj.format('YYYY');

    $('<div></div>')
      .append('<div>' + monthName + '</div>')
      .append('<div class="day-of-month">' + dayOfMonth + '</div>')
      .append('<div class="year">' + year + '</div>')
      .addClass('block')
      .appendTo('body');
  } else {
    $('<div></div>')
      .append('<div>&nbsp;</div>')
      .append('<div class="day-of-month">x</div>')
      .append('<div class="year">&nbsp;</div>')
      .addClass('block blank')
      .appendTo('body');
  }
}
{{< /highlight >}}

All we have to say is: if the `currentDay` is not set to `"blank"`, do the normal thing and just add the standard date block. However, if it is equal to `"blank"`, fill the `<div>` elements with blank spaces, i.e. `&nbsp;`, and put a big "x" in the space where the day of the month went before. Also, add an extra class called `"blank"` to the block so we can style it differently in our css file.

After we add that code, we should have a completely working application. It will ask us every day: "Did you break the chain today?" And every time we answer "No", it will add a new completed date to our calendar. It will also find the skipped days between the completed dates and fill them in with "x" marks.

I hope you enjoyed this tutorial. This next part will be for if you want to get this application running on the internet. If you want, you can skip this section and move on to the next one, where I'll talk about how to continue building and playing with this code.

**Download Project v6:** If you want to download the original files, along with the new code, click here: [Download Version 6](). 

## Deploying to Firebase

*Important note*: before deploying you need to change all the urls in your project from 'http' to 'https' because firebase websites use a secure connection. If you followed the steps in this tutorial exactly you don't need to worry about this. But if you deploy and things don't look like they're working, check the console for errors related to this.

If you want to see the official instructions for deploying to Firebase: go to [Firebase.com](https://www.firebase.com/) and load up your account. Click the "Set up Hosting" link that corresponds to the current app you're working with.

Otherwise, just follow these instructions, which are exactly the same:

1. You should have [Node.js](http://nodejs.org/) installed (you do not need to run Node, just have it installed)

2. Run `npm install -g firebase-tools` or `sudo npm install -g firebase-tools` in your command line or terminal window

3. Go to the directory of your project in your command line or terminal window and run the command `firebase init`

4. Deploy your website with the command `firebase deploy`

That's it. You have your own, personal webapp now, at the url `<your-app-name>.firebaseapp.com/`

## Some Extra Functions Just for Fun

So, you may have noticed that it's hard to debug your application and figure out if it's working right as you go along, especially since you can only add one date at a time. 

You may have realized the usefulness of the `saveDate` function and how if you type it in the console with two very different dates, you'll get a lot of "x" dates between them.

If you haven't already, try typing the following code in the console:

{{< highlight javascript >}}
clearData();
saveDate('01/02/2014')
saveDate('09/02/2014')
{{< /highlight >}}
This should create two completed dates and a lot of blank dates in between them on your page.

Wouldn't it be cool if we could fill in a month at a time and tell the app what percentage of those days we missed out on? Then we could show people what a month of using the app might look like and we can start to see what interface issues we'll run into while using it over a long period of time.

I wrote the following function so that it'd be easy to accomplish this:

{{< highlight javascript >}}
function addMonth (monthNum, percentCompleted) {
  monthNum = monthNum < 10 ? '0' + parseInt(monthNum) : monthNum;
  var month = moment(monthNum + '/01/' + moment().year());
  var numDaysInMonth = month.daysInMonth();
  var extraZero;
  var daysInMonth = [];

  for (var i=1; i < (numDaysInMonth + 1); i++) {
    if (i < 10) {
      extraZero = '0';
    } else {
      extraZero = '';
    }

    if (!percentCompleted || Math.random() < (percentCompleted / 100)) {
      daysInMonth.push(monthNum + '/' + extraZero + i + '/2014');
    }
  }

  if (!appData) {
    appData = [];
  }

  fb.set(appData.concat(daysInMonth));
}
{{< /highlight >}}

Test it out by running the following code:

{{< highlight javascript >}}
addMonth(01, 70) // 01 is January and 70 is 70%
addMonth(02, 90) // 02 is February and 90 is 90%
{{< /highlight >}}

Be aware that you need to add months and dates consecutively because we don't currently have anything that sorts all the dates beforehand. Perhaps you could build such a function. If you do, take a look at the documentation for the built-in Javascript `sort` function. **Hint:** if you pass in a function when calling `.sort` on an array, you can control how that array is sorted. Try using the Moment library in combination with this functionality to build your own sort function and then sort the dates whenever they're loaded and before they're displayed in the interface.

**Download Project v7:** If you want to download the original files, along with the *final* code, click here: [Download Version 7](https://s3.amazonaws.com/webnet/thrivehive/dont+break/DontBreakTheChainv7.zip). 