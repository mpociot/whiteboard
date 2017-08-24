# Activity

These endpoints let you see what's been going on with your campaigns.

## Sent

```javascript
mailshake.activity.sent({
  campaignMessageType: 'initial'
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/sent" \
  -u "my-api-key:" \
  -d campaignMessageType=initial
```

> This endpoint returns [paginated](#Pagination) [SentMessage](#SentMessage) models.

Obtains the most recent emails you have sent. In most cases you'll want to look at campaign-based emails, but this endpoint also lets you get one-off replies you've sent within Mailshake via Lead Catcher.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
messageType | any | No | If specified, you can filter to only `one-off` or `campaign` messages. `one-off` messages are replies you send manually within Mailshake, so in most cases you'll want to omit this parameter or use `campaign`.
campaignMessageType | any | No | Filter to a specific type of message within a campaign (see [CampaignMessageTypes](#CampaignMessageTypes)).
campaignID | | No | Restrict to a single campaign.
campaignMessageID | | No | Restrict to a single message within a campaign.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Opens

```javascript
mailshake.activity.opens()
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/opens" \
  -u "my-api-key:"
```

> This endpoint returns [paginated](#Pagination) [Open](#Open) models.

Obtains the most recent emails opened.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | No | Restrict to a single campaign.
campaignMessageID | | No | Restrict to a single message within a campaign.
excludeDuplicates | false | No | If true this will only not return data when recipients open the same email more than once.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Clicks

```javascript
mailshake.activity.clicks()
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/clicks" \
  -u "my-api-key:"
```

> This endpoint returns [paginated](#Pagination) [Click](#Click) models.

Obtains the most recent links clicked.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | No | Restrict to a single campaign.
excludeDuplicates | false | No | If true this will only not return data when recipients click the same link more than once.
matchUrl | | No | An exact matching of a specific link you're tracking.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Replies

```javascript
mailshake.activity.replies({
  replyType: 'reply'
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/replies" \
  -u "my-api-key:" \
  -d replyType=reply
```

> This endpoint returns [paginated](#Pagination) [Reply](#Reply) models.

Obtains the most recent replies to your sent emails. Pay special attention to `replyType` because you can use this endpoint to look at bounces, out-of-office replies, etc.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
replyType | any | No | The type of replies to filter to. <aside class="notice">To just get actual replies pass in `reply`</aside>
campaignID | | No | Restrict to a single campaign.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Created Leads

```javascript
mailshake.activity.createdLeads({
  campaignID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/created-leads" \
  -u "my-api-key:" \
  -d campaignID=1
```

> This endpoint returns [paginated](#Pagination) [Lead](#Lead) models.

Obtains the most recently created leads. Usually leads are automatically created from the rules you've set up in Lead Catcher, but Mailshake users can also manually turn recipients into leads.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | No | Restrict to a single campaign.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
assignedToEmailAddress | | No | Only get leads that are assigned to this person on your team.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Lead Status Changes

```javascript
mailshake.activity.leadStatusChanges({
  campaignID: 1
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/activity/lead-status-changes" \
  -u "my-api-key:" \
  -d campaignID=1
```

> This endpoint returns [paginated](#Pagination) [Lead](#Lead) models.

Obtains the most recently updated leads. A lead can be closed, ignored, opened, or reopened. A reopened lead has `open` as its status, it's just that at one point that lead had been ignored or closed.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | No | Restrict to a single campaign.
recipientEmailAddress | | No | Limit to specific recipients. If the value passed is not in the format of an email address, a fuzzy search will be done. Ergo, sending in `firmxyz.com` will match anyone on that domain.
assignedToEmailAddress | | No | Only get leads that are assigned to this person on your team.
nextToken | | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.
