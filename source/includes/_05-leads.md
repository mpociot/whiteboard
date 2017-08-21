# Leads

A lead in Mailshake is a recipient who may be interested in whatever you're pitching in your campaigns. [Lead Catcher](https://mailshake.com/lead-catcher/) will automatically find leads based on criteria you set up, but you can also create and manage leads via the API.

## Create

```Node
Mailshake.leads.create({
  recipientIDs: [1, 2, 3]
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });

// Or

Mailshake.leads.create({
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

```curl
curl "https://api.mailshake.com/2017-04-01/leads/create" \
  -u "my-api-key:" \
  -d recipientIDs=[1, 2, 3]

# Or

curl "https://api.mailshake.com/2017-04-01/leads/create" \
  -u "my-api-key:" \
  -d campaignID=1
  -d emailAddresses=['a@johndoe.com', 'b@johndoe.com', 'c@johndoe.com']
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

```Node
Mailshake.leads.close({
  leadID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```curl
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

```Node
reMailshake.leads.ignore({
  leadID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```curl
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

```Node
request('leads/reopen', {
  leadID: 1
});
```

```curl
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
