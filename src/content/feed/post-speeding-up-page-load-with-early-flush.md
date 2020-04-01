---
title: Speeding Up Page Load with Early Flush
date: 2017-6-26
link: /posts/speeding-up-page-load-with-early-flush
---

There are a lot of challenges to overcome when optimizing the page load speed of your website or web app. One of these is getting your most important assets downloaded to the client as quickly as possible. These assets likely include one or more CSS files and one or more JavaScript files. CSS is crucial to get to the client right away since it's needed for initial render. JavaScript may be equally as crucial if you're doing your rendering client-side. So these are the assets you want the browser to start downloading as soon as possible. One thing that can get in the way is generating the HTML for your page server-side. If generating the HTML takes any significant amount of time, the browser can't start downloading assets until your server generates and sends down all the HTML with the assets referenced via link and script tags. For example, on this blog I server-side render the React components that make up my pages, which usually requires waiting for a database call to complete before I can finish rendering the contents of a page. It'd be great if the browser didn't have to wait for the server to finish this work before it can start downloading assets.

Thankfully, there are a few techniques you can utilize to get the browser downloading your critical assets even before your server has finished generating all of the page's HTML. One of them is called [early flush](https://www.stevesouders.com/blog/2009/05/18/flushing-the-document-early/), and it involves sending down the HTML for a page in separate chunks instead of all at once. In this post, we'll take a look at how early flush works, how you can use it to get the browser downloading assets early, and how big of a difference it can make when your server has a lot to do.