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

To get your API key, go to the <a href="https://mailshake.com/app/#/redirect/extensions/api" target="_blank">Extensions &gt; API page</a> in Mailshake and create your key. If your team is looking for higher limits, click the "Contact Us" on that page.

<span class="api-menu-cont">![API Menu Item](images/api-menu.png)</span>

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
mailshake.campaigns.list()
  .then(result => {
    console.log(`Page 1: ${JSON.stringify(result.results, null, 2)}`);
    // Just call `next` on the result to fetch the next page.
    return result.next();
  })
  .then(result => {
    console.log(`Page 2: ${JSON.stringify(result.results, null, 2)}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/list" \
  -u "my-api-key:" \
  -d nextToken=...
```

Endpoints that return multiple results will include a `nextToken` parameter that you can pass into another request to fetch the next results. These endpoints will also accept a `perPage` parameter to control the size of the record sets.

If `nextToken` is null then you're looking at the last page of data.

## Versioning

As we develop future versions of our API that are not backwards-compatible, we will leave the old version running and create a new url for the latest version. We will retain support for obsolete versions for a generous period of time and will send email notifications of any changes.

Current version:
`https://api.mailshake.com/2017-04-01`

Future version format:
`https://api.mailshake.com/XXXX-YY-ZZ`
