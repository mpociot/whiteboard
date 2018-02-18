# Campaigns

## List

```javascript
mailshake.campaigns.list({
  search: 'Venkman'
})
  .then(result => {
    result.results.forEach(campaign => {
      console.log(JSON.stringify(campaign, null, 2));
    });
  })
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/list" \
  -u "my-api-key:" \
  -d search=Venkman
```

> This endpoint returns [paginated](#Pagination) [Campaign](#Campaign) models.

List all of a team's campaigns.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
search |  | No | Filters what campaigns are returned.
nextToken |  | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.

## Get

```javascript
mailshake.campaigns.get({
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
curl "https://api.mailshake.com/2017-04-01/campaigns/get" \
  -u "my-api-key:" \
  -d campaignID=1
```

> This endpoint returns a [Campaign](#Campaign) model.

Retrieves a single campaign and its message sequence. A `not_found` error will be returned if the campaign could not be found.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The ID of the campaign.

## Pause

```javascript
mailshake.campaigns.pause({
  campaignID: 1
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/pause" \
  -u "my-api-key:" \
  -d campaignID=1
```

> This endpoint returns an empty response.

Immediately pauses all sending for a campaign. If a batch of emails for this campaign is currently being sent they will not be stopped.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign to pause.

## Unpause

```javascript
mailshake.campaigns.unpause({
  campaignID: 1
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/unpause" \
  -u "my-api-key:" \
  -d campaignID=1
```

> This endpoint returns an empty response.

Resumes sending for a campaign. This team's sending calendar will reschedule itself to account for this campaign's pending emails. In rare cases it may take up to 5 minutes for the calendar to show scheduled times for this campaign.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID |  | Yes | The campaign to unpause.

## Export

```javascript
mailshake.campaigns.export({
  campaignIDs: [1, 2, 3],
  exportType: 'simple',
  timezone: 'America/Indianapolis'
})
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/campaigns/export" \
  -u "my-api-key:" \
  -H "Content-Type: application/json" \
  -X POST -d '{"campaignIDs":[1, 2, 3], "exportType": "simple", "timezone": "America/Indianapolis"}'
```

> This endpoint returns a [CampaignExportRequest](#CampaignExportRequest) model.

Asynchronously starts an export of one or more campaigns to CSV format. All campaign data will be included in a single csv file you can download.

<aside class="notice">At most 20 campaigns can be exported in a single request.</aside>

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
campaignIDs |  | Yes | An array of campaign IDs to export.
exportType |  | Yes | The type of export to perform. `simple` creates a recipient-based export listing each recipient (per campaign) in a single row. `show-each-message` creates an export based on sent messages where every sent email is listed in a single row.
timezone | UTC | No | The timezone that dates in the export should be based in.

## ExportStatus

```javascript
mailshake.recipients.exportStatus({
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
curl "https://api.mailshake.com/2017-04-01/recipients/export-status" \
  -u "my-api-key:" \
  -d statusID=1
```

> This endpoint returns a [CampaignExport](#CampaignExport) model.

Exporting campaigns is an asynchronous process, so this endpoint lets you check on how things are going. If `isFinished` is true, then the export has completed. The `csvDownloadUrl` field provides the csv file you can download.
