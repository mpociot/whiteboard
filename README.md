<img src="http://marcelpociot.de/git/whiteboard.jpg" style="width: 100%" alt="Whiteboard" />

# Whiteboard
#### Simply write beautiful API documentation.
========

This project started as a fork of the popular [Slate](https://github.com/tripit/slate) API documentation tool, which uses ruby. Since I found the initial setup of Slate quite cumbersome, I started this NodeJS based project.

<a href="http://marcelpociot.de/whiteboard/"><img src="http://marcelpociot.de/git/whiteboard_responsive.jpg" style="width: 100%" alt="Whiteboard" /></a>

Check out a Whiteboard [example API documentation](http://marcelpociot.de/whiteboard/).

## Getting Started with Whiteboard

### Prerequisites

You're going to need:

 - **[Node JS](https://nodejs.org/en/)**

_Yes, that's it!_

### Getting Set Up

 1. Clone this repository to your hard drive with `git clone https://github.com/mpociot/whiteboard.git`
 2. `cd whiteboard`
 3. Install the dependencies: `npm install`
 4. Start the test server: `npm start`

Now go ahead and visit <http://localhost:4000> and you will be presented with a beautiful example API documentation as a starting point.

Go ahead and modify the markdown file at `source/index.md` to suit your needs.

### Publishing your API documentation

The easiest way to publish your API documentation is using this command within your `whiteboard` directory:

`npm run-script generate`

This will generate a `public` folder which you can upload anywhere you want.

> **Windows users:** You need to install the global `hexo-cli` package using `npm install -g hexo-cli`. To publish your API documentation under windows use `hexo generate`.

If you want other (more automated) deployment options like **git**, **heroku**, **rsync** or **ftp** - please take a look at the [Hexo deployment documentation](https://hexo.io/docs/deployment.html).

### Generate the documentation programmatically

To generate the API documentation programmatically, for example in your automated build process, use the whiteboard module.
The `generate` method will return a promise.

```js
var Whiteboard = require('whiteboard');
Whiteboard.generate()
  .then(function(){
    // Generation was successful
  })
  .catch(function(){
    // Handle error
  })
```

### Slate compatibility
Since both Whiteboard and Slate use regular markdown files to render the API documentation, your existing Slate API documentation should work just fine. If you encounter any issues, please [submit an issue](https://github.com/mpociot/whiteboard/issues).

### In depth documentation
For further documentation, read the [Slate Wiki](https://github.com/tripit/slate/wiki) or the [hexo documentation](https://hexo.io/docs/).

### Documentations built with Whiteboard

* [DISTRIBUTOR API Documentation](https://wifidistribution.com/docs) from [wifidistribution.com](https://wifidistribution.com) 
* [CommoPrices API Documentation](https://api.commoprices.com/docs/) from [commoprices.com](https://commoprices.com/) 
* [TradeIt JSON API](https://www.trade.it/documentation/api) from [trade.it](https://www.trade.it/) 

Feel free to submit a PR with a link to your documentation.

### Contributors

Slate was built by [Robert Lord](https://lord.io) while at [TripIt](http://tripit.com).

Whiteboard was built by Marcel Pociot.
