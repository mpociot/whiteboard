# Introduction

> **API Endpoint**
> <code>https<span></span>://api.mailshake.com/2017-04-01</code>

```javascript
// Install our node package
npm install mailshake-node --save

// See source here
https://github.com/colinmathews/mailshake-node
```

Thank you for checking out the Mailshake API! We ♥️ devs because that's who we are, so we hope you'll find our API enjoyable. If you notice a typo or have a suggestion on making this documentation better, just open up a pull request on [the repository that runs this site](https://github.com/colinmathews/mailshake-api-docs) and we'll check it out.

You'll interact with the Mailshake API by making `GET` or `POST` requests (`POST` is recommended when sending larger payloads). All responses are JSON-formatted, and each application has its own quota limits based on your Mailshake subscription.

## Getting your API key

API access is currently only available to our enterprise customers. If your team is ready for an upgrade, click the "Contact Us" button under [Enterprise plan](https://mailshake.com/#pricing).

## Making requests

When making a `POST` request you can send content as a typical form payload by using the header:

`Content-Type: application/x-www-form-urlencoded`

or you can write JSON data to the request by using the header:

`Content-Type: application/json`

See [authentication](#Authentication) for examples of how to make requests and [limits](#Limits) to understand your app's constraints.

## Responses

> Single-item responses will be in this format:

```json
{
  "object": "campaign",
  "id": 1,
  "title": "My campaign",
  "created": "2017-08-19T02:31:22.218Z"
}
```

Most endpoints return a single model of data. Check out our [models section](#Models) for specific examples and be sure to check out the [errors section](#Errors) section, too.

## Pagination

> Paginated data will look like this:

```json
{
  "nextToken": "...",
  "results": [
    { ... },
    { ... }
  ]
}
```

> Get the next page of data like so:

```javascript
mailshake.campaigns.list({
  nextToken: '...'
})
  .then(result => {
    // ...
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/list" \
  -u "my-api-key:" \
  -d nextToken=...
```

Endpoints that return multiple results will include a `nextToken` parameter that you can pass into another request to fetch the next results. These endpoints will also accept a `perPage` parameter to control the size of the record sets.

If `nextToken` is not supplied or if the number of results returned is less than the `perPage` setting, you are looking at the last page of data.

## Versioning

As we develop future versions of our API that are backwards-incompatible, we will leave the old version running and create a new url for the latest version. We will retain support for obsolete versions for a generous period of time and will send email notifications of any changes.

Current version:
`https://api.mailshake.com/2017-04-01`

Future version format:
`https://api.mailshake.com/XXXX-YY-ZZ`
