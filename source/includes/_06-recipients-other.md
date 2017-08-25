## AddStatus

```javascript
mailshake.recipients.addStatus({
  statusID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/add-status" \
  -u "my-api-key:" \
  -d statusID=1
```

> This endpoint returns a [AddStatusResponse](#Add-Status-Response) model.

Adding recipients is an asynchronous process, so this endpoint lets you check on how things are going. If `isFinished` is true, then the import has completed. The `problems` field will let you determine the exact success or failure of the import.

## List

```javascript
mailshake.recipients.list({
  campaignID: 1,
  search: 'Egon'
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/list" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d search=Egon
```

> This endpoint returns [paginated](#Pagination) [Recipient](#Recipient) models.

Lists all of the recipients in a campaign. You can use this endpoint to search recipients, filter by activity, or find recipients who have some of kind of problem (like a missing text replacement or an email that failed to send).

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | Yes | The campaign to look in.
filter | | No | [Criteria](#Filter-options) to filter recipients with.
search |  | No | Filters what recipients are returned.
nextToken |  | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

### Filter options

```javascript
// Find recipients who have not opened any messages
mailshake.recipients.list({
  campaignID: 1,
  filter: {
    action: 'opened',
    negateAction: true
  }
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/list" \
  -u "my-api-key:" \
  -H "Content-Type: application/json" \
  -X POST -d '{"campaignID":"1","filter":{"action":"opened","negateAction":true}}'
```

Field | Default | Required | Description
--------- | -------
action | | Yes | The kind of recipient activity to look for.
negateAction | false | No | `true` to find recipients who have NOT taken the given action.
campaignMessageID |  | No | If `action` is based on a message, you can limit it to only look at this message.

### Filter actions

Action | Description
--- | ---
opened | Recipients who have opened a message.
clicked | Recipients who have clicked a link.
replied | Recipients who have replied.
wasSent | Recipients who were sent a message.
bounced | Recipients who bounced.
paused | Recipients who are paused.
hasProblems | Recipients who have a missing text replacement or a failed sent email.

## Get

```javascript
mailshake.recipients.get({
  campaignID: 1,
  emailAddress: 'john@doe.com'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/get" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d emailAddress=john@doe.com
```

> This endpoint returns a [Recipient](#Recipient) model.

Gets a single recipient's basic information. A `not_found` error will be returned if the recipient could not be found.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
recipientID | | Maybe | The ID of a recipient.
campaignID |  | Maybe | The campaign that this recipient belongs to. Required if `emailAddress` is specified.
emailAddress |  | Maybe | The address of the recipient.

<aside class="notice">Either `recipientID` or `emailAddress` is required.</aside>

## Pause

```javascript
mailshake.recipients.pause({
  campaignID: 1,
  emailAddress: 'john@doe.com'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/pause" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d emailAddress=john@doe.com
```

> This endpoint returns a [Recipient](#AddStatusResponse) model.

Immediately pauses all sending for a single recipient. If any emails for recipient are currently being sent they will not be stopped.

A `not_found` error will be returned if the recipient could not be found.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign that this recipient belongs to.
emailAddress |  | Yes | The address of the recipient.

## Unpause

```javascript
mailshake.recipients.unpause({
  campaignID: 1,
  emailAddress: 'john@doe.com'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/unpause" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d emailAddress=john@doe.com
```

> This endpoint returns a [Recipient](#Recipient) model.

Resumes sending for a recipient. This team's sending calendar will reschedule itself to account for this recipient's pending emails. In rare cases it may take up to 5 minutes for the calendar to show updated scheduled times.

A `not_found` error will be returned if the recipient could not be found.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign to unpause.
emailAddress |  | Yes | The address of the recipient.

## Unsubscribe

```javascript
mailshake.recipients.unsubscribe({
  emailAddresses: 'john@doe.com,jane@doe.com'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/recipients/unsubscribe" \
  -u "my-api-key:" \
  -d emailAddresses=john@doe.com,jane@doe.com
```

> This endpoint returns an empty response.

Adds a list of email addresses to your unsubscribe list.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
emailAddresses |  | Yes | A comma-separated list of email addresses to unsubscribe.
