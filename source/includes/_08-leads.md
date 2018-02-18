# Leads

A lead in Mailshake is a recipient who may be interested in whatever you're pitching in your campaigns. [Lead Catcher](https://mailshake.com/lead-catcher/) will automatically find leads based on criteria you set up, but you can also create and manage leads via the API.

## List

```javascript
mailshake.leads.list({
  campaignID: 1,
  status: 'open'
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/list" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d status=open
```

> This endpoint returns [paginated](#Pagination) [Lead](#Lead) models.

Lists your leads. You can use this endpoint to search leads, filter by status, or find leads assigned to one of your teammates.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | No | Filter leads to the ones from this campaign.
status | | No | Filter to leads in a [particular status](#Lead-Statuses).
assignedToEmailAddress | | No | Leads assigned to this teammate.
search |  | No | Filters what leads are returned.
nextToken |  | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Get

```javascript
mailshake.leads.get({
  campaignID: 1,
  emailAddress: 'john@doe.com'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/get" \
  -u "my-api-key:" \
  -d campaignID=1 \
  -d emailAddress=john@doe.com
```

> This endpoint returns a [Lead](#Lead) model.

Gets a single lead. A `not_found` error will be returned if the lead could not be found.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
leadID | | Maybe | The ID of a lead.
recipientID | | Maybe | The ID of the recipient that this lead is for.
campaignID |  | Maybe | The campaign that this recipient belongs to. Required if `emailAddress` is specified.
emailAddress |  | Maybe | The address of the recipient.

<aside class="notice">Either `leadID`, `recipientID` or `emailAddress` is required.</aside>

## Create

```javascript
mailshake.leads.create({
  recipientIDs: [1, 2, 3]
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });

// Or

mailshake.leads.create({
  campaignID: 1,
  emailAddresses: [
    'a@johndoe.com',
    'c@johndoe.com',
    'd@johndoe.com'
  ]
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/create" \
  -u "my-api-key:" \
  -d recipientIDs=1
  -d recipientIDs=2
  -d recipientIDs=3

# Or

curl "https://api.mailshake.com/2017-04-01/leads/create" \
  -u "my-api-key:" \
  -d campaignID=1
  -d emailAddresses=a@johndoe.com
  -d emailAddresses=b@johndoe.com
  -d emailAddresses=c@johndoe.com
```

> This endpoint returns [CreatedLeads](#CreatedLeads) model.

Creates one or more leads from recipients of a campaign. You can either pass in the IDs of recipients or if it's easier, you can pass their email addresses instead. If a recipient was already a lead and was closed, this will reopen them as a lead.

### Parameters

You can specify `recipientIDs` or `emailAddresses` or both.

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | No | The ID of the campaign from which to create a lead. <aside class="warning">Required if `emailAddresses` is passed.</aside>
emailAddresses |  | No | A list of email addresses to find recipients from for creating leads. This list will be added to the `recipientIDs` parameter if both are passed.
recipientIDs |  | No | A list of recipient IDs to create leads from. This list will be added to the `recipientIDs` parameter if both are passed.

## Close

```javascript
mailshake.leads.close({
  leadID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/close" \
  -u "my-api-key:" \
  -d leadID=1
```

> This endpoint returns an empty response.

Marks a lead as "closed" which means you completed a successful interaction. The opposite of closing a lead is ignoring a lead.

### Parameters

Other than `campaignID`, only one identifier is required -- just use what's most convenient to you.

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | No | <aside class="warning">Required if `emailAddress` is passed.</aside>
emailAddress | | No | The email address of a recipient in this campaign.
recipientID | | No | The ID of the recipient that this lead refers  to.
leadID | | No | The ID of the lead.

## Ignore

```javascript
mailshake.leads.ignore({
  leadID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/ignore" \
  -u "my-api-key:" \
  -d leadID=1
```

> This endpoint returns a [LeadStatus](#LeadStatus) model.

Marks a lead as "ignored" when means the conversation didn't go anywhere. This is the opposite of "closing" a lead.

### Parameters

Other than `campaignID`, only one identifier is required -- just use what's most convenient to you.

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | No | <aside class="warning">Required if `emailAddress` is passed.</aside>
emailAddress | | No | The email address of a recipient in this campaign.
recipientID | | No | The ID of the recipient that this lead refers  to.
leadID | | No | The ID of the lead.

## Reopen

```javascript
mailshake.leads.reopen({
  leadID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/leads/reopen" \
  -u "my-api-key:" \
  -d leadID=1
```

> This endpoint returns a [LeadStatus](#LeadStatus) model.

Takes a closed or ignored lead and makes it open again and available for review.

### Parameters

Other than `campaignID`, only one identifier is required -- just use what's most convenient to you.

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | No | <aside class="warning">Required if `emailAddress` is passed.</aside>
emailAddress | | No | The email address of a recipient in this campaign.
recipientID | | No | The ID of the recipient that this lead refers  to.
leadID | | No | The ID of the lead.
