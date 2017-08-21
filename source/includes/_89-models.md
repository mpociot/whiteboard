# Models

### Common fields

Most models will have these common fields:

Field | Type | Description
--------- | ------- | -----------
object | string | The type of model this data represents.
id | integer | The unique ID of this data.

## User

```json
{
  "object": "user",
  "id": 1,
  "teamID": 1,
  "teamName": "My Team",
  "isTeamAdmin": true,
  "isDisabled": false,
  "emailAddress": "me@example.com",
  "fullName": "Jane Doe",
  "first": "Jane",
  "last": "Doe",
  "teamBlockedDate": null
}
```

A Mailshake user and the team that they are on.

## Campaign

```json
{
  "object": "campaign",
  "id": 1,
  "title": "My campaign",
  "created": "2017-08-19T02:31:22.218Z"
}
```

A Mailshake campaign is the container for a sequence of messages and the recipients to whom they'll be sent.

## CreatedLeads

```json
{
  "leads": [
    "recipientID": 1,
    "leadID": 1
  ],
  "emailsNotFound": [
    "me@example.com"
  ],
  "recipientIDsNotFound": [2, 3]
}
```

The results of an attempt to create leads.

## LeadStatus

```json
{
  "status": "ignored",
  "leadID": 1
}
```

The result of a status change of a lead.

### Statuses

Status | Description
--------- | ---------
opened | The lead is available for review.
ignored | The lead was classified as not going anywhere.
closed | The lead was considered a successful interaction.
