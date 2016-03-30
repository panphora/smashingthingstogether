+++
date = "2015-05-01"
title = "Using Scoped ReactiveVars to Control Tab Visibility (Meteor.js)"
postid = 1

+++


## Step 1

Install the ReactiveVar package.

{{< highlight PowerShell >}}
meteor add reactive-var
{{< /highlight >}}


## Step 2

When the template is created, initialize a new ReactiveVar and set its default value.

This ReactiveVar, this.currentPage, will be available on the page's Template instance.


{{< highlight javascript >}}
Template.DiscoverPage.created = function () {
  this.currentTab = new ReactiveVar('recent projects');
};
{{< /highlight >}}

## Step 3

Also, on template creation, add a function to the template instance to check if the current tab is equal to the passed in value.

We will re-use this function a couple times, so we're putting it on the template instance instead of defining it in a helper multiple times.

{{< highlight javascript >}}
Template.DiscoverPage.created = function () {
  this.currentTab = new ReactiveVar('recent projects');

  this.currentTabIs = function (tabName) {
    return tabName === Template.instance().currentTab.get();
  }  
};
{{< /highlight >}}

## Step 4

The html should look something like this:

{{< highlight html >}}
<template name="DiscoverPage">
  <div class="nav">
    <a class="tab-link {{selectedIfCurrentTabIs 'recent projects'}}" href="#" data-tab-name="recent projects">recent projects</a>
    <a class="tab-link {{selectedIfCurrentTabIs 'recent sketches'}}" href="#" data-tab-name="recent sketches">recent sketches</a>
  </div>
  {{#if currentTabIs 'recent projects'}}
    {{> RecentProjects }}
  {{/if}}
  {{#if currentTabIs 'recent sketches'}}
    {{> RecentSketches }}
  {{/if}}
</template>
{{< /highlight >}}

## Step 5

In order to make the html work, we need to add some helpers.

These will check the ReactiveVar we set up in the second step and re-run whenever it changes. (see Docs for ReactiveVar)

{{< highlight javascript >}}
Template.DiscoverPage.helpers({
  currentTabIs: function (tabName) {
    return Template.instance().currentTabIs(tabName);
  },
  selectedIfCurrentTabIs: function (tabName) {
    if (Template.instance().currentTabIs(tabName)) {
      return 'selected';
    } else {
      return '';
    }
  }
});
{{< /highlight >}}

You'll notice we're using the currentTabIs function twice here. 

## Step 6

Finally, we add a click event in order to change the ReactiveVar to the right tab.

{{< highlight javascript >}}
Template.DiscoverPage.events({
  'click .tab-link': function (e, template) {
    e.preventDefault();
    var $tabLink = $(e.currentTarget);
    var tabName = $tabLink.data('tab-name');

    template.currentTab.set(tabName || 'recent projects');
  }
});
{{< /highlight >}}

Done!

**The Benefits of using a scoped ReactiveVar**

The benefits of using a scoped ReactiveVar are many, but the best one is that it makes it a lot easier to re-use the same functionality multiple times on the same page without copying the code. We could very easily make these helper functions and events function global and then use them in multiple templates or the same template multiple times.

