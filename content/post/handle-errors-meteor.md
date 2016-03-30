+++
date = "2015-09-03"
title = "How to Handle Errors in Meteor Methods"
slug = "handling-errors-in-meteor-methods"
postid = 7

+++


If you define methods for altering your collections, you get the convenience of not having to define security-issue-prone `allow`/`deny` rules.

If you define these methods on **both** the client and the server, you get the benefit of Meteor's [latency compensation feature](https://www.discovermeteor.com/blog/latency-compensation/).

You can run into trouble, however, when you throw an error in a client-side method. You get the following unhandled exception:

{{< highlight text >}}
Exception while simulating the effect of invoking 'yourMethodName' 
{{< /highlight >}}

## Throwing errors on the client and the server

In order to get around this, you can create a wrapper function that will `throw` an error on the server and simply `return` it on the client.

**Edit 9/30/15:** The return values of Method stubs are ignored, so returning a `Meteor.Error` on the client doesn't really do anything.

This will let you write the same code on the client and server, while also giving you the ability to display errors to the user when the server method returns.

## The wrapper function

If you return the following `throwError` function in a method, it won't cause any unhandled exceptions on the client. And when the server method returns, it will hand off the error to the client. 

The error will be returned as the first argument to your `Meteor.call` callback in the version of the `Meteor.call` callback that's triggered by the server-side code. 

{{< highlight javascript >}}
throwError = function(error, reason, details) {
  var meteorError = new Meteor.Error(error, reason, details);

  if (Meteor.isClient) {
    // this error is never used
    // on the client, the return value of a stub is ignored
    return meteorError;
  } else if (Meteor.isServer) {
    throw meteorError;
  }
};
{{< /highlight >}}

This function was taken from this helpful blog post: [Smooth error handling for Meteor.methods](http://takidashi.com/smooth-error-handling-for-meteor-methods.html).

You can pass it the same arguments you would pass to a `new Meteor.Error` call, that is: `error`, `reason`, and `details`.

See the `Meteor.Error` [docs](http://docs.meteor.com/#/full/meteor_error) for more info.

## Handling errors

If a method call causes an error to be thrown, you most likely want to notify the user in some way. You can handle this in your client-side code by checking the type of error that's returned from your `Meteor.call` call.

{{< highlight javascript >}}
Meteor.call('saveProject', projectName, function (error, project) {
  if (error.error === "no-project-name") {
    sAlert.error("Please specify a project name.");
  }
});
{{< /highlight >}}

We check to see if the error returned is equal to an error name we know (i.e. "no-project-name") and then return the appropriate error if it is.

The above `sAlert.error` function is from the `juliancwirko:s-alert` package ([see here](https://atmospherejs.com/juliancwirko/s-alert)). It will cause a user-facing error message to pop up.

## Consolidating error messages

When you call and return your new `throwError` function, if you provide a nice user-facing error message as the `reason` text (the second argument you pass to `throwError`) you can simplify your client-side error handling code:

{{< highlight javascript >}}
Meteor.call('saveProject', projectName, function (error, result) {
  if (error) {
    sAlert.error(error.reason);
  }
});
{{< /highlight >}}

The above code will take the `reason` that you provided to the `throwError` function and display it to the user. This will cut down on the amount of custom code you have to write on the client.

**Edit 9/4/15:** However! Since some of the errors returned to a `Meteor.call` callback function won't be one's you've defined (e.g. database errors and errors thrown by package code), I recommend the following approach instead:

{{< highlight javascript >}}
// defined globally somewhere
isKnownError = function (error) { 
  var errorName = error && error.error;
  var listOfKnownErrors = ['no-project-name', 'user-not-logged-in', 'project-not-found'];

  return _.contains(listOfKnownErrors, errorName);
};

Meteor.call('saveProject', projectName, function (error, result) {  
  if (isKnownError(error)) {
    sAlert.error(error.reason);
  } else if (error) {
    sAlert.error("An unknown error occurred while saving your project.");
  } else {
    sAlert.success("Successfully saved your project.");

    successCallback();
  }
});
{{< /highlight >}}

This will save you from displaying potentially confusing errors to the client by checking to see if they're listed in your approved `listOfKnownErrors` array before displaying their `reason` to the client.

If you want, you can view this code as part of a sample project: [Method Demo - isKnownError Branch](https://github.com/panphora/methodDemo/tree/isKnownError). Thank you [@Siyfion](http://starvingdragon.com/) for helping me correct this code.

## Example application

If you want to see how this works in a demo Meteor application, go here: [Method Error Demo](http://methoderrordemo.meteor.com/).

After loading that page, try clicking the `Save Project` button without filling in the `input` box. It will display an error using the method described in this article.

You can find the code used for making this example application here: [Method demo](https://github.com/panphora/methodDemo).

## Questions?

If you have any questions, you can leave a comment here, contact me on twitter at [artisfyhq](https://twitter.com/artisfyhq), or email me at [david@storylog.com](mailto:david@storylog.com).

Thank you for reading!