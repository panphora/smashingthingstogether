+++
date = "2015-06-02"
title = "Deploying Your App to Scalingo (Meteor.js)"
slug = "deploying-your-app-to-scalingo-meteor-js"
postid = 3

+++


Deploying Meteor webapps can be difficult. When I was trying to deploy to [Digital Ocean](https://www.digitalocean.com/) from my Windows machine, I ran into some serious issues. They were easy enough to resolve after I figured out what they were, but they required an extra 10-20 minutes of work *every* deploy.

I've heard good things about [Modulus](https://modulus.io/). Supposedly they make it really easy to get things set up with their automated command line tool. [The Meteor Podcast](http://www.meteorpodcast.com/) recommends them highly.

Today, I heard about [Scalingo](https://scalingo.com/) and decided to try it out. It was surprisingly easy to set up and I'm very tempted to stay with them simply because they're relatively inexpensive and super easy to work with (mostly because of the easy part).

## Step 1

Sign up for an account: https://scalingo.com/meteorjs-hosting

## Step 2

Create an app

![Scalingo Dashboard](https://s3.amazonaws.com/webnet/smashing-things/post-scalingo/scalingo-dashboard.png)

When you activate your account and login, you'll be presented with this screen. Click the big blue button and name your app. 

## Step 3

Install the Scalingo command line tool: http://cli.scalingo.com/

It's one command on linux or mac os, but they have installers for just about every operating system.

## Step 4

Generate a local ssh key.

**On mac or linux, use the following command:**

{{< highlight console >}}
ssh-keygen
{{< /highlight >}}

Accept the defaults. Press `<Enter>` through all the prompts. It'll look like this:

{{< highlight console >}}
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/username/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/username/.ssh/id_rsa.
Your public key has been saved in /Users/username/.ssh/id_rsa.pub.
{{< /highlight >}}

## Step 5

Add your new public SSH key to Scalingo using the command line tool.

{{< highlight console >}}
scalingo keys-add "YourComputerName SSH Key" /$HOME/.ssh/id_rsa.pub
{{< /highlight >}}

You can also do this through their web interface. Click on your profile name in the left sidebar and a tab called "SSH Keys" will be revealed.

![Scalingo username](https://s3.amazonaws.com/webnet/smashing-things/post-scalingo/scalingo-username.png)

## Step 6

Add a link to the Scalingo remote repository for your app. Your app needs to be part of a git repo in order for this step to work.

Inside your app directory:

{{< highlight console >}}
git remote add scalingo git@scalingo.com:yourappname.git
{{< /highlight >}}

See: [Scalingo - Getting Started with Meteor](http://doc.scalingo.com/languages/javascript/nodejs/getting-started-with-meteor.html)

## Step 7 (optional)

This step is only necessary if you want to use a custom domain name. If you're okay with the default domain name (https://yourapp.scalingo.io), skip this step.

1. Add a CNAME record from www.yourdomainname.com to yourapp.scalingo.io
2. Use an ALIAS record or CNAME record from your root domain (yourdomainname.com) to yourapp.scalingo.com.

The second step can be quite hard if your DNS service doesn't support it. I signed up for [DNSimple](https://dnsimple.com/) and used their custom ALIAS record to accomplish the second step. It can seem expensive to pay $5 a month for DNS (look for their Bronze plan), but there's a free trial and, when it comes to deploys, having an easy-to-use DNS service is amazing.

Also, make sure you add both the `www` and root domain of your website to Scalingo, under the **Domains** tab.

## Step 8 (optional)

This step is only necessary if you want to use HTTPS with your custom domain name. Skip this step if you're using the default https://yourapp.scalingo.io domain name.

I get my SSL Certificates from Namecheap. They're very inexpensive. Just make sure you use `www` in your domain name when ordering the certificate. (An SSL Certificate for `www.yourdomainname.com` will cover both the `www` version as well as the root domain, while an SSL Certificate for the root domain will only cover the root domain.)

Once you get your Certificate and Intermediate CA in an email, combine them into a file called `yourappname.crt`. Make sure you include the lines that look like:

{{< highlight console >}}
-----BEGIN CERTIFICATE-----
{{< /highlight >}}

and

{{< highlight console >}}
-----END CERTIFICATE-----
{{< /highlight >}}

Upload this file using the Scalingo web interface:

1. Go to the Domains tab
2. Click on the gear
3. Upload the `crt` file you just made, as well as they key that you generated on your own in order to get the certificate.

![Scalingo SSL](https://s3.amazonaws.com/webnet/smashing-things/post-scalingo/scalingo-ssl.png)
[Full-sized image](https://s3.amazonaws.com/webnet/smashing-things/post-scalingo/scalingo-ssl.png)

**Update 06/08/15:**

If you want your app to always redirect to the `https` version, you will also have to install the `force-ssl` package. You can find that here: [meteor force-ssl](https://atmospherejs.com/meteor/force-ssl)

I ran into one problem with the `force-ssl` package. When I went to my domain name, it would redirect to the scalingo default domain, e.g. yourapp.scalingo.com

In order to fix this, add this line to a file in your main `server` directory:

{{< highlight console >}}
Meteor.startup(function () {
  Meteor.absoluteUrl.defaultOptions.rootUrl = "https://yourdomainname.com";
});
{{< /highlight >}}

## Step 9 (optional)

This step is only necessary if your Meteor app isn't in the root of your git repository. Skip this step if you're using an example Meteor app or if you generated your app using `meteor create myapp`.

Using the Scalingo command line tool, add an environment variable pointing to the location of your app, relative to the root of your git repo.

In your project directory:

{{< highlight console >}}
scalingo -a myapp env-set PROJECT_DIR=path/to/app
{{< /highlight >}}

See: [Use a custom directory - Scalingo](http://doc.scalingo.com/deployment/project-dir)

## Step 10

Deploy your application to Scalingo. 

{{< highlight console >}}
git push scalingo master
{{< /highlight >}}

3...

2...

1...

**Go!**

You should see a screen of commands flash by. Some of them take a while to complete. In the end, though, you should have an app at https://yourapp.scalingo.io and at your custom domain (if you have one and if the DNS has had time to propagate).

**P.S.** Here's another good write-up on the topic: [How to Deploy a Meteor App in Scalingo - Dev 4 Days](http://dev4devs.com/2015/05/18/meteor-how-to-deploy-meteor-application-in-scalingo/)

