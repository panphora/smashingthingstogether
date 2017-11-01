+++
date = "2017-11-01"
title = "Making a Web Game with JavaScript, Day 3"
slug = "making-a-web-game-day-3"
postid = 10
+++


## What we'll be going over today

1. Reviewing basic programming concepts
2. Showing syntax for each piece of code
3. Going over a small code example 
4. Writing pseudo code for Step 6 of the game (where we left off)
5. Going through the actual code for Step 6
6. Going through steps 7-12 in pseudo code, followed by actual code

Here's the version of the game we'll get to today: https://codepen.io/panphora/pen/zPvzzY

In this version, we have a point system and our alien sprite is able to collect mushrooms.

## What we won't get to today

- Unfortuntely, we won't get to the multiplayer functionality today. However, I have a version of the code that you can review in your free time, here: [Code For Multiplayer Collecting Game](https://github.com/panphora/MultiplayerCollectingGame) (in order to run this code yourself, you need to sign up for a [Firebase](http://firebase.com/) account and create a project -- then plug your own credentials into the code you downloaded in that link, specifically in the `main.js` file and the `.firebaserc` file)
- If you want to see how the final version of the game works, you can view it here: https://collect-things-game.firebaseapp.com/
- I plan on writing a thorough tutorial with very detailed step by step instructions for how to create this multiplayer game on your own, including a bunch of things we didn't have time to go over in class. If you want a copy of this tutorial when it's finished, write your name and email address on the exercise sheet I'll be passing around in a moment.

## A gift

- Also, for coming to the 3rd and final class of this series, I'm going to give you a gift that will greatly help you on your journey to understanding the JavaScript language.


# The Basic Concepts

## Functions

### Definition

Functions do things. You can think of them as little robots that you can tell instructions to. The little robots will go off and do the thing you asked it to, as long as that's what it's programmed to do, and it will do it as many times as you want it to. 

### Example uses

- **Getting search results.** Every time you type a key into a search bar, a function takes your search and sends it off into the internet and comes back with suggested search terms.
- **Formatting text.** Each time you click the button to make text bold in a document, that key press is causing a function to go find your word and change its styling, so it looks bold.
- **Viewing a message.** When you click on a message in your email client or your text messages, a function goes to find the contents of that message and bring it back to you.
- **Playing a video.** When you click on a video and it pauses or plays, that's a function getting access to the video and telling it to pause or play for you.

To sum up, any time you interact with a web page or piece of software, a function is the thing that responds. So, if you type a key and something happens or you press a button and something happens, chances are a function is what made that thing happen.

## Objects

### Definition

Objects store information that you can look up later. They work as a series of key/value pairs. The key is the word you plug in to the object to get the value. So, you can also think of the key as a word in a dictionary and the value as its definition.

That's why objects are also known as dictionaries.

### Example uses

If a function is the thing that goes and gets the information for you, then an object is that information. It's a simple a compact way of storing a bunch of information in a single place.

- Information about a person. If a website stores details about someone, like their name, their age, their address, and their preferences, they use objects to do this.
- Information about an event. When you save an event and plug in the date it's happening and where it is, that information will probably be store in an object. The keys might be `date` and `location` and the values would be the actual date and location of the event.
- Information about a company. If you want to look up the name of a company and the date it was founded, this information is probably being stored in some kind of object. The keys in this case might be `companyName` and `dateFounded`. In order to access them, a function might ask the object what's in the `companyName` key and the object would hand them back the value.


## Arrays

### Definition

Arrays are simply lists and they can store any type of information inside of them. 

### Example uses

Arrays are a very common pattern and are used in some way in just about every interface. 

- Image gallery. A list of images.
- High scores. A list of players coupled with a list of numbers.
- Todo list. A list of phrases marked done or undone.
- Articles. A list of a bunch of text and images grouped together.
- Search results. A list of titles and descriptions which you can click on.
- Work history. A list of places someone's worked.

**Bonus fact:** 

A very common pattern is to group a bunch of objects inside a list. 

In the above examples, we have high scores. To display that, we need to know the name and the points for each player. Each player is probably represented by an object inside of a list, with a key of `name` and key of `points`. 

For the todo list, we use the same pattern, but the keys would probably be `todoText` to keep track of the todo and `todoDone` to keep track of if it's done or not.

Think of any newsfeed in an app you've used. All of these newsfeeds use this pattern too. Each one is simply a list of titles, descriptions, images, and comments. The data of each item in the newsfeed is put into an object, which is in turn put into a list.


## Strings

### Definition

Strings are words or phrases that you don't want to be interpreted as computer code. 

One of the most common uses for strings are for when you want to display a message on the screen for someone to see.

### Example uses

- Warning message. When you enter in a password that's too short or try to delete something that can't be deleted, a website might pop up a warning message. This message is usually created by giving a string to a function to display.
- Popup message. Have you ever gotten a popup message asking you for your name or payment information? The message itself was probably created from a string –– and when you put in your name or payment information that's converted into a string too.
- Displaying an image. If you want to add an image to a website using code, you have to let the computer know where the image is located. You need to give the computer this information by puttin the location inside of a string.
- Voice input. If you've ever talked to Siri or Alexa or used a voice input command, the computer is taking your voice and converting it into a string of words behind the scenes. Then, it's giving this string to a function that interprets it and plays a song or turns up the temperature in your home.


## Numbers and Math

### Definition

In code, a number is just a number. You can do the same things with a number by writing out an equation by hand as you can with a computer -- all you have to do is type it out and the computer will be able to calculate the result.

### Example uses

- Physics in a game. If you've ever played a video game, all of the visuals you're looking at have been very quickly calculated by mathematical equations. Every strand of hair, every movement, every ripple in the water. If your character is tired and moves slower, that's math. If you drive into a wall and the car stops, that's math.
- Calculating payment amounts. If you've ever bought something online, your total balance due, minus your gift card amount and plus taxes and shipping, was calculated by multiplying, subtracting, and adding numbers together.
- Animations. If you've ever seen a fancy animation on a website or in a game, chances are it was generated by code and some mathematical expressions behind the scenes.

## Conditionals

### Definition

Conditionals control whether something happens or not. 

You're very familiar with using conditionals in your own life. You might say to yourself, "if it's not raining outside, I'll go to the store." You've just used the most common type of conditional: **if**.

In code, we need conditionals all the time to check if certain things are true, so that we can cause other things to happen -- or pop up a warning if we bump into an error.

### Example uses

- Ordering a package online. If you paid for an item online, you should receive that package in the mail. Behind the scenes, the store you're shopping at checks to see if you paid and if it has a valid address. If it does, it sends you the package.
- Search suggestions. If you go to Google.com and type in an exclamation mark, you should notice that no search suggestions come up. That's because, somewhere, Google is checking to see if you've typed in a valid search phrase and if you haven't, it doesn't show you any suggestions.
- Contoling a character in a game. A very common way to move a character in a game is to press the arrow keys on your keyboard. It's very easy to tell when *any* key is pressed, but in order to tell specifically *which* key was pressed, we need to check it with an `if` statement to make sure it's the right one. 
- Making sure a password is secure. A lot of websites won't let you sign up for an account unless you have a password that's a certain length and passes certain requirements. They do this with a simple check -- and then say, "if this check passes, let them sign up, otherwise, show them an error."

## Comparisons

### Definition

A comparison is used to see how two or more things measure up to each other. We can use comparisons to see if two or more things are equal to each other. 

We can also use them to see if a number is greater or less than another number. Or if one value is not equal to another value.

Here are all the comparisons:
- Greater than
- Less than
- Equal to
- Not equal to

### Example uses

Comparisons are most commonly used with a conditional. We use comparisons inside a conditional to see if we should continue to the next step or not.

- Applying promo codes. When we enter a promo code on a website to get a discount or a special deal, the website checks to make sure the promo code matches a valid promo code that's active. The website says, "if this promo code is equal to one of the valid promo codes I have on file, then give this person a discount, otherwise, tell them the promo code is invalid."
- Calculating free shipping. On some website stores, we get free shipping if our order is above a certain amount. After we add all our items to our cart and begin the checkout process, the website checks to make sure the total cost of our items is greater than the minimum required for free shipping. If it is, we get the discounted shipping.
- Respawning a character in a game. A lot of games give their characters a certain number of lives. If the character runs out of lives, then they have to start over from the beginning of the game. In the code, the game checks to see if the character's lives isn't equal to zero. If it's not, the player can try again, if it is, they have to start the game over again.


## Booleans

### Definition

True or false. 

We can use these values inside of conditionals to see if we can move onto the next stage or not. 

**Bonus fact:** All of the comparisons (i.e. greater than, less than, equal to, not equal to) result a boolean value. So, saying "if 2 is greater than 1, give them free shipping" is the same as saying "if true, give them free shipping".


### Example uses

- Marking todos complete. Each todo in a todo list manager will probably be represented by an object. One of the keys on that object will control whether the todo has been completed or not by setting it to true or false.
- Unsubscribing from emails. If you've ever clicked the unsubscribe link at the bottom of a newsletter, you've been responsible for setting a value to false somewhere. Every time you do that, in some database, right next to your email address, a key gets flipped from true to false.
- Unlocking advanced features. Have you ever signed up for the free plan of a product only for them to keep bugging you to sign up for the Pro plan? The upgraded plan might give you more credits to spend in a game, more functionality, or increased limits. All of that is probably controlled by setting some key called `hasProPlan` to `true`;

## Variables

### Definition

Variables are ways of labeling values.

We can assign numbers, functions, lists, or objects to variables in order to give them a name that we can reference later.

Variables, as their name implies, can change later. So, we might start off having a variable set equal to `1`, but later on decide to set that same variable equal to `2`.

### Example uses

- Keeping track of a name. If you sign into you email account, sometimes it greets you by name. This is done by setting a variable equal to you name as soon as you load the website and then using this variable whenever they want to display it.
- Keeping track of a stock's value. If you've ever looked up the value of a company's stock on the internet, it displays as a number, as well as a historical chart. In order to keep updating that number and the chart, the values have be stored somewhere. Variables would work well for this.
- Changing the difficulty mode. In a lot of games, there's an "easy mode" and a "hard mode". When you master the easy mode, you might change a setting that makes the game a bit harder. The game would probably keep track of this difficulty setting inside a variable.


# Reviewing the Syntax

## Functions

### Creating
### Calling
### More examples

## Objects

### Creating
### Accessing
### More examples

## Arrays

### Creating
### Accessing
### More examples

## Variables

### Creating
### Accessing
### Changing
### More examples

## Strings

### Creating
### Accessing
### Combining
### More examples

## Numbers

### Writing numbers in code
### Operations
### Special functions
### More examples

## Conditionals

### Writing a conditional in code
### More examples

## Comparisons

### Writing a comparison in code
### Using with a conditional
### More examples

## Booleans

### Writing a boolean in code
### Using with a conditional
### More examples


# Example Program #1

## Example

## Description

Ask for someone's name and then tell them hello


# Example Program #2

## Example

## Description

Get the sale percentage from a store to figure out if we want to go there or not


# Continuing where we left off in the mushroom collecting game 

## Where we left off 

What we've done so far:

- 

## Pseudo Code for Step 6 (animating our character sprite)




## Code for Step 6





# Step 7 (random position for character sprite)

## Pseudo Code


## Actual Code



# Step 8 (create character sprite within boundaries and keep it there)

## Pseudo Code


## Actual Code


# Step 9 (add mushroom sprite)

## Pseudo Code


## Actual Code


# Step 10 (mushroom random starting position)

## Pseudo Code


## Actual Code


# Step 11 (let the character collect the mushroom)

## Pseudo Code


## Actual Code


# Step 12 (add points when the character collects the mushroom)

## Pseudo Code


## Actual Code









