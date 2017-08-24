# Models

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
    {
      "recipientID": 1,
      "leadID": 1  
    }
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

The result of a status change of a lead. See [Lead Statuses](#Lead-Statuses).

## SentMessage

```json
{
  "object": "sent-message",
  "id": 1,
  "actionDate": "2017-04-06T17:45:07.188Z",
  "recipient": {
    "object": "recipient",
    "id": 399,
    "emailAddress": "john@doe.com",
    "fullName": "John Doe",
    "first": "John",
    "last": "Doe",
    "fields": {
      "favorite_color": "Red"
    }
  },
  "campaign": {
    "object": "campaign",
    "id": 248,
    "title": "My Campaign",
    "created": "2017-04-06T17:45:07.188Z"
  },
  "type": "campaign-message",
  "message": {
    "object": "message",
    "id": 423,
    "type": "initial"
  },
  "from": {
    "object": "email-address",
    "address": "sally@doe.com",
    "fullName": "Sally Doe",
    "first": "Sally",
    "last": "Doe"
  },
  "to": [
    {
      "object": "email-address",
      "address": "john@doe.com",
      "fullName": "John Doe",
      "first": "John",
      "last": "Doe"
    }
  ],
  "subject": "This is my subject",
  "externalID": "...",
  "externalRawMessageID": "...",
  "externalConversationID": "...",
  "rawBody": "...",
  "body": "...",
  "plainTextBody": "..."
}
```

An email that was sent via Mailshake. Most messages have a `messageType` of `campaign` which means they were sent as part of a campaign sequence. Messages with `one-off` were manual replies sent via Lead Catcher.

**Notable fields:**

Field | Description
--- | ---
message | For `campaign` sent messages, this is the message inside your campaign's sequence. `one-off` sent messages will omit this field.
externalID | The ID of the email on the mail account's platform.
externalRawMessageID | The actual ID of the email message from the emails' headers.
externalConversationID | The ID of the email thread on the mail account's platform.
rawBody | The raw HTML. <aside class="warning">Usually this is not the field you want to use because it may have open tracking, link tracking, etc in it.</aside>
body | This is is the HTML with tracking and replies stripped out.
plainTextBody | A display-friendly version of the email body.

### Message Types

Type | Description
--------- | ---------
one-off | An email sent as a manual reply via Lead Catcher.
campaign | An email sent as part of a campaign sequence.


## Open

```json
{
  "object": "open",
  "id": 1,
  "actionDate": "2017-04-06T17:40:23.194Z",
  "isDuplicate": false,
  "recipient": {
    "object": "recipient",
    "id": 1,
    "emailAddress": "john@doe.com",
    "fullName": "John Doe",
    "first": "John",
    "last": "Doe",
    "fields": {
      "favorite_color": "Red"
    }
  },
  "campaign": {
    "object": "campaign",
    "id": 1,
    "title": "My Campaign",
    "created": "2017-04-06T17:40:23.194Z"
  },
  "parent": {
    "object": "sent-message",
    "id": 1,
    "type": "campaign-message",
    "message": {
      "object": "message",
      "id": 1,
      "type": "initial"
    }
  }
}
```

The result of a recipient opening one of your sent emails.

**Notable fields:**

Field | Description
--- | ---
parent | An abbreviated version of the sent message that was opened. In most cases this is an email in your campaign sequence, but it could be a one-off email sent via Lead Catcher.
isDuplicate | `true` if this recipient is opening the email for the second or nth time.

## Click

```json
{
  "object": "click",
  "id": 1,
  "link": "http://google.com",
  "actionDate": "2017-04-06T17:38:53.369Z",
  "isDuplicate": false,
  "recipient": {
    "object": "recipient",
    "id": 1,
    "emailAddress": "john@doe.com",
    "fullName": "John Doe",
    "first": "John",
    "last": "Doe",
    "fields": {
      "favorite_color": "Red"
    }
  },
  "campaign": {
    "object": "campaign",
    "id": 1,
    "title": "My Campaign",
    "created": "2017-04-06T17:40:23.194Z"
  },
  "parent": {
    "object": "sent-message",
    "id": 1,
    "type": "campaign-message",
    "message": {
      "object": "message",
      "id": 1,
      "type": "initial"
    }
  }
}
```

The result of a recipient clicking a link in one of your sent emails.

**Notable fields:**

Field | Description
--- | ---
link | The full url that was clicked.
parent | An abbreviated version of the sent message that was opened. In most cases this is an email in your campaign sequence, but it could be a one-off email sent via Lead Catcher.
isDuplicate | `true` if this recipient is clicking the link for the second or nth time.

## Reply

```json
{
  "object": "reply",
  "id": 1,
  "actionDate": "2017-04-06T17:42:54.475Z",
  "recipient": {
    "object": "recipient",
    "id": 1,
    "emailAddress": "john@doe.com",
    "fullName": "John Doe",
    "first": "John",
    "last": "Doe",
    "fields": {
      "favorite_color": "Red"
    }
  },
  "campaign": {
    "object": "campaign",
    "id": 1,
    "title": "My Campaign",
    "created": "2017-04-06T17:40:23.194Z"
  },
  "type": "out-of-office",
  "parent": {
    "object": "sent-message",
    "id": 1,
    "type": "campaign-message",
    "message": {
      "object": "message",
      "id": 1,
      "type": "initial"
    }
  },
  "subject": "Re: This is my subject",
  "externalID": "...",
  "externalRawMessageID": "...",
  "externalConversationID": "...",
  "rawBody": "...",
  "body": "...",
  "plainTextBody": "..."
}
```

Represents any kind of reply received from a recipient to one of your sent emails.

**Notable fields:**

Field | Description
--- | ---
type | The [type of reply](#ReplyType).
parent | An abbreviated version of the sent message that was opened. In most cases this is an email in your campaign sequence, but it could be a one-off email sent via Lead Catcher.
externalID | The ID of the email on the mail account's platform.
externalRawMessageID | The actual ID of the email message from the emails' headers.
externalConversationID | The ID of the email thread on the mail account's platform.
rawBody | The raw HTML. <aside class="warning">Usually this is not the field you want to use because it may have open tracking, link tracking, etc in it.</aside>
body | This is is the HTML with tracking and replies stripped out.
plainTextBody | A display-friendly version of the email body.

### ReplyType

Type | Description
--- | ---
reply | A normal reply.
bounce | Information about why your email bounced.
out-of-office | An "I'm out of the office" reply. Follow-ups will still be sent to these folks unless you pause them.
unsubscribe | The user was unsubscribed because their reply requested us to do so.
delay-notification | Your mail account indicated that your original message is still trying to be sent.

## Lead

```json
{
  "object": "lead",
  "id": 1,
  "created": "2017-04-11T16:13:51.956Z",
  "openedDate": "2017-04-11T16:13:51.955Z",
  "lastStatusChangeDate": null,
  "recipient": {
    "object": "recipient",
    "id": 1,
    "emailAddress": "john@doe.com",
    "fullName": "John Doe",
    "first": "John",
    "last": "Doe",
    "fields": {
      "favorite_color": "Red"
    }
  },
  "campaign": {
    "object": "campaign",
    "id": 1,
    "title": "My Campaign",
    "created": "2017-04-11T16:13:51.956Z",
  },
  "status": "open",
  "assignedTo": {
    "object": "user",
    "id": 1,
    "emailAddress": "lucy@yourteam.com",
    "fullName": "Lucy Doe",
    "first": "Lucy",
    "last": "Doe"
  }
}
```

A recipient that was (at least at one time) a prospect. Leads are created in the `open` status and can be set `closed` or `ignored`.

**Notable fields:**

Field | Description
--- | ---
status | The [current status of this lead](#Lead-Statuses).

### Lead Statuses

Status | Description
--------- | ---------
opened | The lead is available for review.
ignored | The lead was classified as not going anywhere.
closed | The lead was considered a successful interaction.

## Added Recipients

```json
{
  "invalidEmails": ["one@example.com", "two@example.com"],
  "isEmpty": false,
  "checkStatusID": 1
}
```

**Notable fields:**

Key | Description
--- | ---
invalidEmails | A list of email addresses that were not imported because they did not pass validation.
isEmpty | `true` if no email addresses were actually imported.
checkStatusID | An ID you can use to monitor the import.

## Add Status Response

```json
{
  "isFinished": true,
  "problems": {
    "unsubscribedEmails": ["one@example.com"],
    "alreadyInCampaignEmails": ["two@example.com"],
    "passedAccountLimitEmails": ["three@example.com"],
    "hasProblems": true
  }
}
```

Describes the progress in adding a batch of recipients.

**Notable fields for `problems`:**

Key | Description
--- | ---
unsubscribedEmails | A list of email addresses that are on your unsubscribe list.
alreadyInCampaignEmails | A list of email addresses that were already part of this campaign.
passedAccountLimitEmails | A list of email addresses that could not be imported because your campaign exceeded the number of allowed recipients it can hold.

## Recipient

```json
{
  "object": "recipient",
  "id": 1,
  "emailAddress": "john@doe.com",
  "fullName": "John Doe",
  "first": "John",
  "last": "Doe",
  "fields": {
    "favorite_color": "Red"
  }
}
```

**Notable fields:**

Key | Description
--- | ---
fields | A simple JSON hash (not an array) of keys to values. Each field can be used as a text replacement.
