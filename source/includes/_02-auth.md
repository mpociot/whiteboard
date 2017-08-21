# Authentication

Most of the apps authorized to use the Mailshake API can only access their own team's data. For these apps, you can use our simple authentication. Any app can use our OAuth version 2 authentication.

<aside class="notice">If your app will access data for other teams OAuth is the only option.</aside>

## Simple

```javascript
let url = require('url');
let https = require('https');

function request(path, args, callbackFn) {
  let options = url.parse(`https://api.mailshake.com/2017-04-01/${path}`);
  let body = args;
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json'
  };
  addAuthentication(options, body);
  let formattedBody = JSON.stringify(body);
  options.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
  let req = https.request(options, (res) => handleResponse(res, callbackFn));
  req.on('error', callbackFn);
  req.write(formattedBody);
  req.end();
}

function addAuthentication(options, body) {
  options.path += '?apiKey=my-api-key'; // Option #1
  options.headers.authorization = 'Basic my-api-key'; // Option #2
  body.apiKey = 'my-api-key'; // Option #3
}

function handleResponse(res, callbackFn) {
  let buffers = [];
  let totalLength = 0;
  res.on('data', (d) => {
    buffers.push(d);
    totalLength += d.length;
  });
  res.on('end', (d) => {
    let buffer = Buffer.concat(buffers, totalLength);
    let result = JSON.parse(buffer.toString());
    callbackFn(null, result);
  });
}
```

```bash
curl "https://api.mailshake.com/2017-04-01/me" \
  -H "Authorization: Basic my-api-key"
```

Simply include your API key as a querystring parameter (`apiKey`), part of your body json  (`apiKey`), or via an http `Authorization` header that looks like:

`Authorization: Basic my-api-key`

> Make sure to replace `my-api-key` with your API key.

<aside class="notice">Make sure to replace <code>my-api-key</code> with your API key.</aside>

## OAuth2

TODO:

## Test connection

```javascript
request('me', {});
```

```bash
curl "https://api.mailshake.com/2017-04-01/me" \
  -H "Authorization: my-api-key"
```

> This endpoint returns a [User](#User) model.

You can hit our `/me` endpoint to test that authentication is working. It will return information about the current user you are authenticating as.
