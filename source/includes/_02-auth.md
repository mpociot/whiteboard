# Authentication

Most of the apps authorized to use the Mailshake API can only access their own team's data. For these apps, you can use our simple authentication. Any app can use our OAuth version 2 authentication.

<aside class="notice">If your app will access data for other teams OAuth is the only option.</aside>

## Simple

```javascript
let Mailshake = require('mailshake-node')('my-api-key');
Mailshake.me()
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
# curl uses the -u flag to pass basic auth credentials
# (adding a colon after your API key prevents cURL from asking for a password).
curl "https://api.mailshake.com/2017-04-01/me" \
  -u "my-api-key:"
```

Simply include your API key as a querystring parameter (`apiKey`), part of your body json  (`apiKey`), or via an http `Authorization` header that looks like:

`Authorization: Basic [base-64 encoded version of your api key]`

> Make sure to replace `my-api-key` with your API key.

## OAuth2

TODO:

## Test connection

```javascript
Mailshake.me()
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/me" \
  -u "my-api-key:"
```

> This endpoint returns a simple object with a [User](#User) model attached.

```json
{
  "user": "[User model]"
}
```

You can hit our `/me` endpoint to test that authentication is working. It will return information about the current user you are authenticating as.
