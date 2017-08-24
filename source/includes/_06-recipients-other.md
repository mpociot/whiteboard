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
curl "https://api.mailshake.com/2017-04-01/recipients/add" \
  -u "my-api-key:" \
  -d statusID=1
```

> This endpoint returns a [AddStatusResponse](#Add-Status-Response) model.

Adding recipients is an asynchronous process, so this endpoint lets you check on how things are going. If `isFinished` is true, then the import has completed. The `problems` field will let you determine the exact success or failure of the import.

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
