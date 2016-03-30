+++
date = "2015-05-29"
title = "How to Make Custom Sign Up and Login Forms (Meteor.js)"
slug = "how-to-make-a-custom-sign-up-form-meteor-js"
postid = 2

+++


If you're making a basic website, the `accounts-ui` package is a great option to get started with (https://atmospherejs.com/meteor/accounts-ui). 

However, if you want to add some custom styles to your sign up and login forms, follow along here.

## 1. Install some basic packages

{{< highlight console >}}
meteor add accounts-password
meteor add juliancwirko:s-alert
{{< /highlight >}}

The `accounts-password` package depends on the `accounts-base` package, so that will also be installed.

The `juliancwirko:s-alert` package will show alerts in the corner of the screen. We'll use this to let a user know they entered an email address or password that's invalid.

## 2. Configure the alerts

I put the following code in the main `lib` folder (in a file called `startup.js`) to configure the style of the popup alerts.

Putting it in the `lib` folder ensures it will be loaded before other files, although that's not strictly necessary here.

{{< highlight javascript >}}
Meteor.startup(function () {
  if (Meteor.isClient) {
    sAlert.config({
      effect: 'flip',
      position: 'bottom-right',
      timeout: 5000,
      html: false,
      onRouteClose: true,
      stack: true
    });
  }
});
{{< /highlight >}}

If you want to also use the flip animation I'm using here, you have to install a separate package for that:

{{< highlight console >}}
meteor add juliancwirko:s-alert-flip
{{< /highlight >}}

You can see all the available options and effects for this package here: http://s-alert.meteor.com/

## 3. Make some helper functions for validating your forms

We're going to want to make sure that each user enters a valid email address and password, so we're just going to write those functions ahead of time. 

They'll be included in the `submit` event binding for both the Login form and the Sign up form.

{{< highlight javascript >}}
checkEmailIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 1 && aString.indexOf('@') > -1;
}

checkPasswordIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 7;
}
{{< /highlight >}}

Don't use the `var` keyword here unless you want these functions to be scoped to the file they're in. Meteor allows you to omit the `var` keyword to make a variable global across all files.

I put these function in a `helpers.js` file in my main `lib` folder. This way we can use them anywhere on the server or the client.

## 4. Build the html for the Sign up form

{{< highlight html >}}
<template name="SignUp">
  <form class="sign-up-form">
    <div>  
      <input class="email-address-input" type="text">
    </div>
    <div>
      <input class="password-input" type="password">
    </div>
    <div>
      <button type="submit">Sign up</button>
    </div>
  </form>
</template>
{{< /highlight >}}

You'll probably want to add some more style to this, or at least some `label` elements and `placeholder` values for the email and password fields.

## 5. Build the html for the Login form

The login form is pretty much identical.

{{< highlight html >}}
<template name="Login">
  <form class="login-form">
    <div>  
      <input class="email-address-input" type="text">
    </div>
    <div>
      <input class="password-input" type="password">
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
</template>
{{< /highlight >}}

## 6. Set up the event handlers for the Sign up form

{{< highlight javascript >}}
Template.SignUp.events({
  'submit .sign-up-form': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        sAlert.error('Invalid email address');
      }
      if (!isValidPassword) {
        sAlert.error('Your password must be at least 8 characters long');
      }
    } else {
      Accounts.createUser({
        email: emailAddress,
        password: password
      }, function (error) {
        if (error) {
          sAlert.error('Account creation failed for unknown reasons :(');
        } else {
          Router.go('loggedInHome');
        }
      });
    }
  }
});
{{< /highlight >}}

1. We grab the form element and wrap it in jQuery and use it to find the inputs we're interested in.
2. We get the values for the email and password inputs and trim these values of white space (just in case a user enters in their email address followed by a few spaces or something).
3. We check to see if the email and password values are valid using the functions we made in the 3rd step and show an alert to the user if they're invalid.
4. If they're valid, we create a new account with the `Accounts.createUser` function. If that returns an error, we surface an error for the user. If it's successful, we redirect them to a new page

### Some notes

We're using the `sAlert` function from the alert package we installed earlier to show alerts.

We're also redirecting the user to a new route after they sign up, using [Iron Router](https://github.com/iron-meteor/iron-router). This is a route and template you have to set up separately. I recommend using the `iron-meteor` scaffolding tool (https://github.com/iron-meteor/iron-cli).

## 6. Set up the event handlers for the Login form

{{< highlight javascript >}}
Template.Login.events({
  'submit .login-form': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        sAlert.error('Invalid email address');
      }
      if (!isValidPassword) {
        sAlert.error('Your password must be at least 8 characters long');
      }
    } else {
      Meteor.loginWithPassword(emailAddress, password, function (error) {
        if (error) {
          sAlert.error('Account login failed for unknown reasons :(');
        } else {
          Router.go('loggedInHome');
        }
      });
    }
  }
});
{{< /highlight >}}

This event handler is almost identical to the last one, except for the selector used to get the submit event on the form (it's now `submit .login-form` instead of `submit .sign-up-form`). Also, the SignUp template uses the `Accounts.createUser` function, while the Login template uses the `Meteor.loginWithPassword` function.

These functions have slightly different APIs (`Accounts.createUser` takes an object for its first argument and `Meteor.loginWithPassword` just takes three flat arguments), so be careful with that.

## Finishing up

This is a really basic example. For a full-featured application, you'll also want to allow the user to reset their password.

Look into [Accounts.forgotPassword](http://docs.meteor.com/#/full/accounts_forgotpassword) and [Accounts.resetPassword](http://docs.meteor.com/#/full/accounts_resetpassword) for more information about how to do this. 

There's also a good write-up on this over on Ben McMahen's blog: http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor