# Pushes

> The type of request we'll send to your servers:

```json
{
  "resource_url": "https://api.mailshake.com/2017-04-01/..."
}
```

```javascript
let express = require('express');
let bodyParser = require('body-parser');
let PushHandler = require('mailshake-node').PushHandler;

// Start your web server
let app = express();
app.use(bodyParser.json({}));

// Hook up the Mailshake push handler
let handler = new PushHandler(mailshake, {
  baseUrl: 'https://yourwebsite.com',
  rootPath: 'path/to/your/handler',
  secret: 'my-secret'
});
handler.on('push', push => {
  console.log(JSON.stringify(push, null, 2));
});
handler.on('pushError', err => {
  console.error(`${err.code}: ${err.stack}`);
});
handler.expressHook(app);

// Start your server
app.listen(80);

// Verify that it's hooked up properly by visiting your site, something like:
// https://yourwebsite.com/path/to/your/handler/my-secret/some-unique-id
```

One of the cooler things you can do with the Mailshake API is subscribe to pushes. Whenever an action occurs that you've subscribed to, Mailshake will make a HTTP request to your servers so you can react in real time.

Your servers need to accept `POST` requests from us using the `application/json` content type. We'll include a simple object with `resource_url` as its only key. Send an HTTP request to this url and be sure to include the same authentication as with our other API operations.

Your server should respond to us with a `200` status indicating that you've handled the request (otherwise we'll wait and try a few more times in case your server is under maintenance).

<aside class="notice">If you no longer need a subscription, you can send back a status of `410`.</aside>

## Create

```javascript
handler.subscribe('Clicked')
  .then(targetUrl => {
    // Save your targetUrl somewhere so you can unsubscribe later
  })
  .catch(err => {
    console.error(`${err.code}: ${err.stack}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/push/create" \
  -u "my-api-key:" \
  -d event=Clicked \
  -d targetUrl=https://mysite.com/some-secret/some-unique-id
```

Starts a subscription for a type of push.

<aside class="warning">`targetUrl` must be unique for every subscription.</aside>

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
targetUrl | | Yes |The publicly accessible url to your servers that we should send a `POST` request to. We _highly_ recommend using `https` and including a secret key so that other actors can't send requests as if they were Mailshake. <aside class="notice">To make sure your url is unique for each subscription, you might append a unique querystring</aside>
event | | Yes | The [type of event](#Events) you're subscribing to.
filter | | No | If you only want subscriptions when certain criteria are met, specify them as a JSON object.

### Filters

You can apply a filter to some events so that you only get pushes that meet certain criteria.

**Filter fields:**

Field | Description
--------- | -------
campaignID | To only get events for a specific campaign.
campaignMessageID | For events based on message, only get events for a specific message.
excludeDuplicates | `true` if you don't want to get pushes for duplicate opens or clicks.
matchUrl | For clicks you can only be notified when this exact url is clicked.
messageType | For sent messages you can be notified only when certain [types of messages](#Message-Types) are sent.

### Events

Event | Description
--------- | -------
Clicked | Someone clicked a link.
Opened | Someone opened an email.
Replied | Someone replied to one of your emails.
MessageSent | Mailshake sent an email on your behalf.
LeadCreated | A lead was created.
LeadStatusChanged | A lead's status was changed.

## Delete

```javascript
let targetUrl; // Look this up from when you subscribed
handler.unsubscribe(targetUrl)
  .then(() => {
    // Done
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/push/delete" \
  -u "my-api-key:" \
  -d targetUrl=https://mysite.com/some-secret/some-unique-id
```

Unsubscribes a push you previously created. Since all subscribed pushes require a unique `targetUrl`, that's all you need to send in to delete your push.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
targetUrl | | Yes | The unique target url of a push.
