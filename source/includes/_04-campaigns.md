# Campaigns

## List

```javascript
request('campaigns/list', {
  search: 'Venkman'
});
```

```bash
curl "https://api.mailshake.com/2017-04-01/campaigns/list?search=Venkman" \
  -H "Authorization: my-api-key"
```

> This endpoint returns [paginated](#Pagination) [Campaign](#Campaign) models.

List all of a team's campaigns.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
search |  | No | Filters what campaigns are returned.
nextToken |  | No | Fetches the next page from a previous request.
perPage | 100 | No | How many campaigns to get at once, up to 100.

## Pause

```javascript
request('campaigns/pause', {
  campaignID: 1
});
```

```bash
curl "https://api.mailshake.com/2017-04-01/campaigns/pause?campaignID=1" \
  -H "Authorization: my-api-key"
```

> This endpoint returns an empty response.

Immediately pauses all sending for a campaign. If a batch of emails for this campaign is currently being sent they will not be stopped.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign to pause.

## Unpause

```javascript
request('campaigns/unpause', {
  campaignID: 1
});
```

```bash
curl "https://api.mailshake.com/2017-04-01/campaigns/unpause?campaignID=1" \
  -H "Authorization: my-api-key"
```

> This endpoint returns an empty response.

Immediately resumes sending for a campaign. This user's sending calendar will reschedule itself to account for this campaign's pending emails. In rare cases it may take up to 5 minutes for the calendar to show scheduled times for this campaign.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign to unpause.
