+++
date = "2017-10-22"
title = "Making a Web Game with JavaScript, Day 1"
slug = "making-a-web-game-day-1"
postid = 9
+++

I'm going to pass around a piece of paper to each of you. I want you to write what you know about making games and programming, what you're hoping to learn by the end of today, and why you want to learn it.

## What we'll be learning today:

1. Foundational concepts of programming
2. Introductory lesson on JavaScript
3. Making a game that lets a player control a character and move them around a game board

The first thing to understand is that the concepts we're learning today will be useful for making any kind of software, not just a game. I'm going to be throwing a lot of things at you and moving fast. I want you to get a handle on the basics and be able to play around with code a little, but you have to be willing to put in the research to look a lot of this stuff up in your free time too!

We have a lot to get to today. Two hours might seem like a lot of time, but it's not. We're going to learn the basics of programming and then build up a game with basic controls. Don't be afraid if you fall behind or feel like you don't understand something. I'll leave time for questions after every section and I'll be coming around to every table once we get started with the coding. It can take a while to get a handle on this stuff.

## What we'll be building

The being said, let me show you what we'll be building today:

- https://codepen.io/panphora/pen/xXmNow?editors=0010

**Features for version 1:**

- A map with terrain
- A character with a walking animation that starts in a random position
- The character can be moved around the map with arrow keys

And let me show you what we'll be building by the end of this series:

- https://collect-things-game.firebaseapp.com/ (this is still missing a multiplayer scoreboard and a few other minor features, but it's a mostly complete multiplayer version of the game)

**Features for version 3 (which we'll complete on the 3rd day of this series):**

- All the features in version 1
- Boundaries on the map, where the character can't walk
- Mushrooms that can be collected and appear in random positions
- Points for every mushroom the player collects, which show up in a multiplayer scoreboard
- Multiple players playing together over the internet!

## Why learn how to code?

If you already know why you want to code, skip this section.

Okay, now that you have an idea where we're heading, let me give you some reasons why you might want to learn how to code.

- Some of the most valuable companies in the world are technology companies. And every company in the world is adapting to add more technology to their products. I mean, it's practically required to have a website if you're in business! So, if you want to start a company or be really valuable to one, learning to code is a really good idea.
- Coding is also great for adding features to websites you already use. I do this to add and remove things from websites all the time. I hide notifications on Twitch. I hide the newsfeed on Facebook. I can see the ratings of YouTube videos before clicking on them. If something bothers me on a website, I can change it (just for me) by automatically adding a little code to the website when it loads. This makes my life a little bit easier. I also build applications and tools for myself when I come up with a new idea.
- Finally, knowing how to code will help you understand and add to the world around you. Self-driving cars, autonomous robots, and virtual reality. These are no longer science fiction. If you want to understand how they work and have a chance to add your own functionality to them, you need to know how to code. Even if you're a product designer or marketer at a technology company, in order to build something amazing, you'll want to be able to effectively communicate with the people who are working on the code. Knowing the basics will help you do that.


## Let's get started!

Let's say you want to make a game. In this game, you want to have some tanks moving around a game board and shoot at each other. Where would you start?

A good place to start might be designing the tanks or the terrain. Another good place might be deciding how many players you want to be able to play at once and whether you want them to play over the internet or from the same computer.

For our purposes, we're going to start with how the tanks will move around. We have a few options... Voice commands. Clicking a mouse button. Eye tracking. Using the keyboard. Swiping with a finger on a cell phone. 

However, to keep things simple — and because it's the one I know how to do the best — we'll start with keyboard controls, specifically, the arrow keys.

Can someone describe to me which direction we'll want the tank to move when we press the "up" arrow key?

"Up," that's right! Now, I'm going to convert this statement into what's called pseudo-code.

"⬆ means the tank moves up"


## Pseudo-code

So, what's pseudo-code?

It's describing code in a way that humans can easily understand, so you can plan out how a program will work. That means my pseudo-code might be different from yours.

I might write:

"⬆️ means the tank moves up"

But someone else might write:

"up arrow -> tank moves up"

Someone else:

"⬆️ means [todo: add a pictogram of tank on grid with an arrow pointing from the tank to the grid square above it]"

Someone else:

"when up arrow is pressed, add 1 to the player's y coordinate"

Pseudo-code is used to help you figure out what's going to happen when, why, and for how long before you start writing actual code. Eventually, after you plan everything out enough, you'll want to convert your pseudo-code into real code. 

But, it's essential to see how the pieces are going to fit together first, even for really experienced programmers.


## Writing Pseudo-code For Our Game

So, you should write pseudo-code in whatever way makes sense to you. You can figure out how to convert it into computer code later.

Now, I'm going to write out some basic pseudo-code for a really simple game. In this game, there's only one player and all they can do is move a tank around a board. Not much of a game, but it'll give us a start.

1. Create a character
2. Place character on the game board
3. When ⬆️, move character up
4. When ➡️, move character right
5. When ⬇️, move character down
6. When ⬅️, move character left

Pretty easy to understand, right? Any questions?

Now, let me take you through the real code that you might use for this. We'll start with the movements, so that's steps 3-6.


## First Introduction to Real Code!

{{< highlight javascript >}}
document.body.addEventListener("keydown", function (event) {
    if (event.keyCode === 39) {
        player.x = player.x + 10;
    }
})
{{< /highlight >}}

This is the code you might use to get your player in the game to move to the right.

It might seem like a lot of code for such a simple action, but before we get into it, let me explain how much power comes from understanding this code. 

This code is flexible, it doesn't have to be used for just detecting arrow keys. It basically lets you see whatever key is being pressed on a page. You could use code like this to add keyboard shortcuts to a website, add special combo codes for games, or for something like text formatting. You know how in Google Docs or Gmail, when you press `ctrl+b` and it makes your selection **bold**? That's done with code like this.


## Code? It's not that great after all...

So, the code I just showed you is very flexible and powerful...

But the more important thing I want you to understand about code is... *it doesn't matter.*

Let's go back to the pseudo-code.

1. Create a character
2. Place character on the game board
3. When ⬆️, move character up
4. When ➡️, move character right
5. When ⬇️, move character down
6. When ⬅️, move character left

Does this pseudo-code make sense to you? Do you pretty much know the type of game we're trying to make by looking at this? Do you know, basically, what's going to happen? 

Yes! ...right?

That's what matters. As long as you understand what you want to happen when, I guarantee you, you can find a way, with code, to make it happen. And, the specific words you use to translate your pseudo-code into actual code aren't going to matter that much, as long as you understand the underlying ideas. The ideas, the concept and how you tie them together are what matters. 

The code will take lots of getting use to, sure, but it's all just computer language. The reason we write in code is so that a computer can understand what you're trying to say. It's not supposed to totally make sense to you, especially not at first. 

Your first priority should always be making sure *you* understand what you're trying to do, not if the computer can understand you.

Okay, with that out of the way, let's get back to the code and I'll show you what's going on.


## An Introduction to Coding

We're going to learn a couple new words today. That's because we're learning a brand new language. With most new languages, you have to learn lots of new words, but with this one, you only need to learn a few. And, luckily, they're all in English.

Here are the words we'll be learning about today: 

1. function
2. object (i.e. dictionaries)
3. array (i.e. lists)
4. strings (i.e. words and phrases)
5. numbers
6. conditionals (i.e. if and else)
7. comparisons (i.e. equals, not equals, greater than, less than)
8. variables

## The Basics

There are a few concepts that will be useful to know when you're building things with code. These concepts are used in all kinds of programming languages, not just JavaScript. 

Knowing about them will help you convert pseudo-code into real code. There's just a few of them, but knowing about them will help you build just about anything. 


### The Basics: Functions

We'll start with an interesting one: **Functions**.

- illustration/doodle of 3 robots (todo: add this illustration)

Every function is different, but they all have something in common: they do stuff.

You can think of functions as little robots that go off and do things for you. One function might fetch you something, another one might calculate something, and another one might display something for you.

Functions are really useful and powerful and they're great because once you have one, you can tell it to do the same thing for you over and over again and it will never get tired of doing it, no matter how complicated or boring the task is.

Any questions about functions?

We'll go over the syntax for them later.

### The Basics: Objects

Ok, this next one is also *really* interesting. **Objects.**

- doodle/illustration of three bookshelves in a library standing next to each other (todo: add this illustration)

Objects are also called dictionaries. Here's how they work:

You plug in a key [todo: doodle of a key],
And they give you whatever's on the side of the corresponding door [todo: doodle of a door with a key hole in it]

*Why are objects also called dictionaries?* Because dictionaries work like this too. Give them a word and they give you back a corresponding definition.

#### Examples of objects

Every search works like this too. If you type in a word or phrase into Google, you get back a bunch of results, right?  Well, on the back-end Google is basically just using a really big object/dictionary. You plug in a word or phrase — the "key" — they look it up, and you get back a page of search results.

The Boston Public Library works like this, except it uses the Library of Congress Classification system, which uses call numbers as keys. 

People work like this too. Think of all the things people could look *you* up by. Your address, your phone number, your social security number. These are all keys, which, when passed into an object, might return a person like you.

#### Syntax

I'm going to go into the syntax for objects just a little, because it's so simple. The basic structure looks like this:

key : value

So, you plug the key — i.e. the search term — into Google, e.g. "the distance to the moon", and you'll get back an answer (i.e. "238,900 miles").

That's represented like this, for objects:

the distance to the moon : 238,900 miles

On the left of the colon is the key, on the right in the value. This is a really useful concept that we'll use a lot.

The complete syntax for an object actually looks like this:

{{< highlight javascript >}}
{
  key1: value1,
  key2: value2,
  key3: value3
}
{{< /highlight >}}

### The Basics: Arrays

Now, I'm going to go through a few more concepts, but these ones you mostly already know about. They're pretty simple, and not as interesting as functions or objects.

These concepts are arrays, strings, numbers, conditionals, comparisons, and variables.

Arrays are pretty simple — they're just lists. In terms of what you'd use them for, it's mostly straightforward, basically anything you'd use a list for.

If you search Google, you'll get a list of search results. This list is just a list — otherwise known as an array.

I'm going to call arrays lists for now, for the sake of simplicity.

Lists are seen everywhere, all over the internet and every app you've ever used uses them. Lists of friends on Facebook, lists of followers on Twitter or Instagram, lists of notifications in Snapchat, lists of movies on IMDB, lists of email messages in Gmail.


### The Basics: Strings

Let's move on to the next one: **Strings.**

Strings are words or phrases that you want to use in your program, most likely to display to the people using your program. So, if you want to say, "Hello, welcome to my game," you might want to use a string in your code to display this message.

The thing is, you're also writing words to make your program, so the computer needs a way to tell the difference between the words you mean it to understand and the ones that are actually words.

So, if you want to say hello or make a warning pop up, you have to write your words in quotes, like this:

"hello"

If you want to write a full sentence, it would look like this:

"I went to the park"


### The Basics: Numbers

Next is numbers. For the most part, we'll be doing pretty simple math, but when we do use it, it's going to come in really handy. 

With numbers, you don't need to do anything special.

When you're coding, `1 + 1 = 2`

This is how you multiply: `2 * 2 = 4`

Divide: `4 / 2 = 2`

And subtract: `2 - 1 = 1`


### The Basics: Conditionals

We only have a few more concepts to get through before you're able to understand the basic building blocks of code.

This next one is something you deal with every day: "If I do this, then this will happen. If I don't do this, then this other thing will happen."

For example, "if I buy a movie ticket, I'll have fun, but if I don't buy a movie ticket, I'll save $10."

This is something that's very useful when we're coding. Lots of times, we'll want the ability to control when someone's allowed to do something and when they aren't. 

For example, if you set up an online store, you'd want to make sure someone paid and that you have their address before you send them their package.

That might look something like this in pseudo-code:

- if this person paid and we have their address, then send them their package
- else, send them a message asking them to pay and also ask them to put in their address


### The Basics: Comparisons

Comparisons are also used in our daily life. Many times, they're used with the word "if".

Comparisons include "greater than", "less than", "equal", and "not equal", which are represented by the following symbols: `>`, `<`, `===`, and `!=`.

For example, we might say, "If that banana costs less than $1, then I'll buy it."

In someone's pseudo-code, this might look like this:

if (banana.price < 1)
  then buy banana
else
  buy an orange

Here's an example from something you might see in a software program like Facebook, written in pseudo-code: "If two people add each other as friends, then they can message each other"

And, written in something closer to code, it might read like this:

if (person 1 added person 2 as a friend AND person 2 added person 1 as a friend)
  then they can message each other
else
  they cannot message each other 


### The Basics: Variables

Ok, I've saved the hardest one for last, but it's also one of the most useful concepts: **Variables.**

This is a hard one because it might not make sense why we need them at first, but let me explain.

Variables let you store values, so you can use these values somewhere else in your program.

Let's say you have a program that asks someone their name and lets them type it in. You could store that away and then, later on, greet them by their name.

This is what that actually looks like, using real code:

{{< highlight javascript >}}
var name = prompt("What's your name?");
alert("Hello " + name);
{{< /highlight >}}

Variables are also really useful for keeping track of things you might be confused about when come back to your code later. You can use variables to name values, so your program makes more sense when you come back to it.

Let me give you an example:

{{< highlight javascript >}}
0 + 10 - 2
{{< /highlight >}}

If you looked at this code, you'd be able to figure out the result, but you might not know why it's trying tog get that result. However, if you label each number it might make more sense:

- diagram with labels above each part: "Initial position" above the 0, "Speed" above the 10, and "Wind resistance" above the 2 (todo: add this diagram)

If you're making a game in which the player is sailing a boat, but there's wind resistance, this is the equation you might use to calculate their new position after they try to move. Labels help you keep track of that.

Let me show you how that might look in code:

{{< highlight javascript >}}
var initialPosition = 0;
var speed = 10;
var windResistance = 2;

var newPosition = initialPosition + speed - windResistance;
{{< /highlight >}}

Now, any game wouldn't be that fun if nothing ever changed, right? If there were no bad guys and the whole game was just a flat path that you could walk on endlessly, it would be really boring... This is the other thing variables are good for — because you can change their values depending on the situation.

So, if there's a really hard level in your sailing game, you might change the value of the `windResistance` variable:

{{< highlight javascript >}}
var windResistance = 7;
{{< /highlight >}}

That would make it really hard for the boat to sail against the wind. They might need to boost their speed somehow! :)


## Real code: A re-introduction

Before we get started building our game, let's go back to that first bit of real code that I showed you and I'll explain the different parts:

{{< highlight javascript >}}
document.body.addEventListener("keydown", function (event) {
    if (event.keyCode === 39) {
        player.x = player.x + 10;
    }
})
{{< /highlight >}}

So, remember objects/dictionaries? They let us put in a key and get back a value? Well, there are a few of those here.

One of the ways you can access the value from an object is by putting a period after the object's name and typing in the key's name.

So, `document` here is an object. We can access the value of the `body` key inside of this object by typing:

{{< highlight javascript >}}
document.body
{{< /highlight >}}

Then we get the value of `body`.

What does the value of `body` equal? Well, it's another object. Then, inside the `body` object, there's a key called `addEventListener`, which corresponds to a function. Remember when we talked about functions? They're things that go off and do stuff for us.

In this case, the `addEventListener` function helps us figure when an event on the page occurs. This could be a mouse click or scroll event, someone pressing a key on a keyboard, or someone writing text in a text area. The function expects an "argument", which is something we haven't touched on before.

In this case, the argument we're passing in is a string: "keydown". This string tells the `addEventListener` function that the specific type of event we're looking for is someone pressing a key on a keyboard. If we had passed in the string "click" instead, it would tell us about mouse clicks. If we passed in the string "scroll", it would tell us about every time someone scrolled down the page.

Now, how can a function tell us when something has happened or give us data we requested from us? One way would be to pop something up on the screen for us. This could be done by the function calling `alert()` inside of itself. However, what if we don't want to display the result in the browser?

Another way a function could return data to us &mdash; in fact the most common way &mdash; would be to just give us a result back from the function, which we can assign to a variable. This is called returning a value, and when a function does this, we can get the value it returns like this: 

{{< highlight javascript >}}
var searchResults = getSearchResultsFor("movie times");
{{< /highlight >}}

This is great for most types of functions. With most functions, they're meant for a single purpose and once you call them, they've done their job. You can forget about them until the next time you need them.

However, sometimes you need new data every time an event happens. For example, if you're building a game and you want to know when someone presses a key &mdash; as soon as they press the key. 

In this case, a very common pattern is to pass a function into another function. Then, the function you pass in will be called whenever the event happens, on the dot. And that's what's happening here:

{{< highlight javascript >}}
document.body.addEventListener("keydown", function (event) {
    if (event.keyCode === 39) {
        player.x = player.x + 10;
    }
})
{{< /highlight >}}

The second argument to `addEventListener` is a function that will get called whenever someone presses a key on the keyboard.


### Side note: Function syntax

This is how you define a function:

{{< highlight javascript >}}
function () {
  // code that's run when the function runs
}
{{< /highlight >}}

If we want the function to have a name, so we can refer to it or call it later, we can write it like this: 

{{< highlight javascript >}}
function getSearchResults () {
  // code that's run when the function runs
}
{{< /highlight >}}

## Back to our code

Okay, so, to review: we have an object, `document`, that has another object inside of it, `body`, that has a function inside of it, called `addEventListener`.

When we call `addEventListener`, it expects to be passed two arguments. 

The first argument is the type of event we want to be notified about.

The second argument is a function, that we define, that will be called whenever that event takes place.

So, in this case, when a user presses a key on the keyboard, the function we passed to `addEventListener` will be called. And, to top is off, when `addEventListener` calls our little function, it will also be nice enough to give us some of the details about the event.

In the example, we refer to these details with the name `event`. It's an object that has a lot of information in it, but the thing that tells us which key was actually pressed is under the key inside it labeled `keyCode`.

We check to see if the value of `keyCode` represents the key for the right arrow (i.e. 39), and then, if it is, we move our character to the right. 

(You can learn more about the key code for specific keys here: http://keycode.info/)

---

In plain English:
- We ask the computer to tell us when someone presses a key. 
- When that key press happens, the computer tells us some of the details about which key was pressed. 
- We use this information to see if the right arrow key was pressed. 
- In the case that the right arrow was pressed, we move our character to the right.


## Okay, let's make a game!

The first thing I want to tell you is we won't be building this game from scratch. We'll be using a game library to help us out. 

The reason for using a library is this: when something has been built thousands of times before (like games and game libraries have), you can learn a lot from established solutions and get a lot of the hard work done for you for free.

If you want to build a game from scratch, instead of using a library, it will be a lot easier for you to do that after understanding the basic principles of game development. 

By using a library from the start, you'll have a head start on other people who just dive in because you'll start closer to a working solution. Not only will you know what it takes to make a nice-looking game that performs well, has animations, and has tile maps that you can build yourself &mdash; you also won't get discouraged as easily by fumbling with the basics.


### Coin Collecting Game: Part 1: A Moving Sprite

Okay, let's get started!

Here's the first bit of code I want us to look at: https://codepen.io/panphora/pen/PJXvEj?editors=0010

The first thing to notice is that we already have a working animation! That's huge. And, with very little code!


#### Game Development Concepts

There are bound to be a lot of things you don't understand when you first look at this.

But, let's go back to basics, to what I said in the beginning — the specific code doesn't matter, as long as you understand the concepts. So, let's first go through the basic concepts that every game designer should understand.

Those are:

1. Sprites
2. Coordinates
3. The game loop

Each of these concepts is super simple on its own, but when you put them together you have the basics for making a game. 

##### Sprites

Sprites are items or characters or tiles on a map that you want to display on a screen. They might be a shape or they might be a drawing or icon. Ideally, in nice-looking game, they'll animate as they move. So, when the character jumps, it will looks like they're actually jumping because the image will change to have the character's legs pull in and their arms fly up.

We're initiating the sprite on the 3rd line. We pass in an object, with key/value pairs. This object sets up all the initial settings for our sprite.

In fact, that's how we're creating most of the functionality for this game: passing in an object, with key/value pairs, into a function, and assigning the return value to a variable.


##### Coordinates

Coordinates are just where the sprites appear on the screen. If we have a sprite that moves to the right, we need to know where it starts, so we can tell it where to go next.

With this game library, the 0,0 coordinate is in the top left. That means the further the sprite gets from the top left corner, the higher these coordinates go. If the sprite has negative coordinates, it's off the screen. And if it has coordinates around 800,800, it's close to the bottom right. 

The first coordinate is the `x` coordinate and it represents how far the sprite is from the left side of the game board. The second coordinate is the `y` coordinate and it represents how far the sprite is from the top of the game board.

These `x` and `y` coordinates are being passed in as the first two settings we're passing in when we create the sprite.


##### The game loop

The game loop is also simple. In order to trick your eyes into thinking something is actually moving across a screen, it has to move smoothly, that is, its coordinates have to update very often every second. The game loop makes sure this happens by updating all the positions of the players and then rendering the players. It does this about 60 times a second. 

You can change the amount of times the game loop renders, if you want. You can have it render 30 times a seconds. If you set the fps too low and increase the movement speed too much (change the value of the movement speed by changing the value of `dx` to something really high, like `50`; change the fps by adding a key value pair as the first argument being passed to the game loop that looks like: `fps: 10`), the block should look like it's stuttering across the screen. 

The game loop has two parts. The first part is the update function, where we make sure the sprites have the most recent values. And the second part is where we render those values.

In the update function, we can see there's a little extra logic to make the sprite loop around if it goes beyond the bounds of the game board. This basically says that once the sprite is off the board, place it just to the left of the board. This allows the sprite to loop endlessly.

I should mention one of the big reasons why a game loop is used. Every time the player moves, their character needs to move. In some games, the whole scene changes as the character moves. What would happen if we only move the character without erasing the previous version? You can see what this might look like by completing the last exercise below.

- Exercise: play around with the initial `x` and `y` coordinates to give the red square a different starting position.
- Exercise:  try getting the square to move really fast across the screen.
- Exercise: try to get the square to reset its position after traveling for 300 pixels.
- Exercise: Add `clearCanvas: false` to the arguments you pass into `kontra.gameLoop` and you'll see exactly what happens when the canvas doesn't clear after every game loop.


### Coin Collecting Game: Part 2: Moving with Keyboard Controls

Here's the next part: https://codepen.io/panphora/pen/ZXVNMP?editors=0010

This is where we add code to let us move the sprite around using the keyboard arrow keys. The code goes into the `update` function.

So, first of all, this is easier than doing it yourself. You can use natural language instead of key codes. And inside the update function, you have access to the sprite. The sprite is accessed with the `this` keyword.

The `this` keyword is special, and not something we have time to get into right now. But, basically, it lets us have access to the sprite because we're in a function that's passed into the sprite.

We also add some code to prevent the default action of the arrow keys. This is also a little easier to write because we're using the Kontra library, but wouldn't be hard to write without it. If we remove this code to prevent the default action and our game board was large enough, whenever you pressed the down button, the page would scroll down. You character would also move, but the unintended scrolling would be annoying to say the least.

(Exercise: Try mapping the control keys to somewhere else on your keyboard. For example, try using the `w` key for up, the `s` key for down, the `a` key for left, and the `d` key for right.)

### Coin Collecting Game: Part 3: Loading a Sprite Image

Here's the third part: https://codepen.io/panphora/pen/NaeVEM?editors=0010

This is where things get fun — we start to add designs for our sprites to the game. We can add any design we want here, any image will work if we upload it and add a reference to it.

The code we're using to load the assets and wait until their loaded, saves us from having to learn how to do it ourselves. Again, it's not super hard to do, but let me give you an idea of what it might look like in pseudo-code if we wanted to load two images (which we'll do pretty soon) and we wanted to write this ourselves:

1. create a new image objects
2. set the value of the first image object to a url
3. set the value of the second image object to a url
4. wait for the first image to load
5. after the first image loads, wait for the second image to load

This also handles repainting the sprite as it moves, as I mentioned before.


### Coin Collecting Game: Part 4: Loading a Tile Sheet

The fourth part: https://codepen.io/panphora/pen/mBaYgM?editors=0010

Okay, so now we've got a little character running around the map, but they don't have any terrain to run over. It's just a black screen in the middle of the page. Let's fix that!

In this step, we're going to load up a tile sheet. 

Let me show you what that looks like: https://s3-us-west-2.amazonaws.com/s.cdpn.io/126441/map_tilesheet.png

Tile sheets are meant to contain a bunch of terrain, items, and characters that you can use in your game. You can tell the computer how to tell how big each tile is in the image and it's the designers job to make sure that each tile is an equal size. After you know how big each tile is, it's just a matter of counting from 1, from the top left, to figure out which tile you want to place down.

So, first we load the image up, the same way we loaded up our character's sprite.

Then, we initialize the tile engine, to tell Kontra how big each tile is and how big the total size of the map is.

We add the image we loaded into the tile engine. 

And then we get this neat little interface where all we have to do is specify the tile number and Kontra will paint it onto the game board for us — as long as we render the tile engine in the game loop!

This saves us a lot of time. Imagine loading each of these tiles in the tile sheet by ourselves, figuring out the coordinates we want to paint them in, and then, if we ever wanted to change things down the road, we'd have to do a lot of the calculation over again. By thinking through this ahead of time, game developers have come up with the standard of tile sheets and maps that you can add individual tiles to, which ends up saving everyone a lot of time!

(exercise: look at the tile sheet image and try to make your map use a different tile for the terrain. play around with it and don't be afraid to get it wrong.)


### Coin Collecting Game: Part 5: Adding Layers to the Map

The fifth part: https://codepen.io/panphora/pen/yzGWrw?editors=0010

Now, we're going to add another layer to our game map. The first layer is going to be ocean and the second layer is going to be an island. You can play around with this at this point and try to make the terrain look however you want it to.

This is a big step. We've gone from having terrain that looks very bland to something that looks a bit more realistic. We've started to create our own little world here. And now that you know how the pieces fit together, you'll be able to go off and download other tile sheets and make your own game worlds.

The zeros in the ground layer are transparent, as well as some of the edges of the island. That's why we get to see the water underneath.


### Coin Collecting Game: Part 6: Add a Walking Animation

The sixth part: https://codepen.io/panphora/pen/jGXooQ?editors=0010

Okay, it's been a long day, I know, but we're approaching the last part. This next part will let us see our character walk!

The first thing we're going to do is load up a sprite sheet instead of the image of the alien standing still. A sprite sheet is used for animations. It's just an image with every frame of the animation in it and we can loop through them however we want.

First, we tell Kontra what the height and width of each frame is inside the image. That makes a sprite sheet for us that we can animate.

Next, we pass that generated animation to our sprite in the animations key. Now, every five frames, when update is called on this sprite, it'll look like it's walking!

This makes it really easy for us again, to add an animation to our character. Something that would take a bit more effort to implement on our own. However, I encourage you to play around with the code and try to figure out how it works

### Coin Collecting Game: Part 7: Load Sprite in a Random Position

The seventh part: https://codepen.io/panphora/pen/xXmNow?editors=0010

(Only if we have time) (todo: add text for this section)


## Wrapping Up

If you're interested in learning the basics of game development, there's no better way to start than exploring some code that doesn't use a game library and trying to figure it out and play around with it

Here's an example project i built that does just that: https://codepen.io/panphora/pen/KgxwZz

Try customizing this game to your liking. For example, try replacing the character or the sound that plays when they collect coins. This is intended for people who want to start from the basics, and also want to learn HTML and CSS.

For the rest of you, who are more interested in learning programming, please continue playing around with the code I've shown you today.

We'll meet up next week to review how to code and fix a few things with our game. For example, you'll notice that the character can walk outside the bounds of the island. That's something we'll fix next week. We'll also add items for the character to pick up, which will give him points, and we'll add a little counter to keep track of the points.

The week after next week, we'll make this game multiplayer, so more than one person can play at once!













