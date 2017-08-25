# Recipients

## Add

```javascript
mailshake.recipients.add({
  campaignID: 1,
  addAsNewList: true,
  listOfEmails: '"John Doe" <john@doe.com>, "Jane Doe" <jane@doe.com>'
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
  -d campaignID=1 \
  -d addAsNewList=true \
  -d listOfEmails="\"John Doe\" <john@doe.com>, \"Jane Doe\" <jane@doe.com>"
```

Adds new recipients to a campaign. Each campaign can hold up to 5,000 recipients.

If you pass along a full name for your recipients, Mailshake will automatically prepare `first`, `last`, and `name` (full name) as text replacements. If you only have a first name, use that value as their full name.

Any other fields you provide (like `favorite_color`) can be used as text replacements within your campaign. If a text replacement isn't found, that recipient's emails will not be scheduled until you make corrections.

Here's an example message:

<span class="quoted-content">Hi {{first}},<br><br>Thanks for adding your name to my email list on {{topic}}. I think you're really going to like it!</span>

<aside class="warning">Unless your campaign is paused, these recipients will immediately be scheduled to receive campaign emails. In rare cases it may take up to 5 minutes for your sending calendar to show scheduled times for these recipients.</aside>

<aside class="notice">In addition to rate limits, this operation limits you to adding X recipients per month. [Learn more](#Limits)</aside>

### Parameters
Parameter | Default | Required | Description
--------- | ------- | -----------
campaignID | | Yes | The campaign to add these recipients to.
addAsNewList | false | No | Pass true to keep these recipients grouped together. Otherwise they'll be added to the last list you uploaded to your campaign.
listOfEmails | | Maybe | A comma or newline separated list of email addresses to add. You can include recipient names by using the format: `"John Doe <john@doe.com>"`
addresses | | Maybe | A structured list of recipient data that can include custom fields.
csvData | | Maybe | A structured object representing a spreadsheet of comma-separated recipient data that can include custom columns as fields.

<aside class="notice">One is required: `listOfEmails`, `addresses`, `csvData`. See below.</aside>

### Using `addresses`

```javascript
mailshake.recipients.add({
  campaignID: 1,
  addAsNewList: true,
  addresses: [
    {
      emailAddress: 'john@doe.com',
      fullName: 'John Doe',
      fields: {
        favorite_color: 'Red'
      }
    }
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
curl "https://api.mailshake.com/2017-04-01/recipients/add" \
    -u "my-api-key:" \
    -H "Content-Type: application/json" \
    -X POST -d '{"campaignID":1,"addAsNewList":true,"addresses":[{"emailAddress":"john@doe.com","fullName":"John Doe","fields":{"favorite_color":"Red"}}]}'
```

This option lets you pass in an array of structured data. Each array item should be listed in this format;

Key | Required | Description
--------- | ------- | -----------
emailAddress | Yes | The recipient's email address.
fullName | No | The recipients full name, or first name if that's all you have.
fields | No | A simple JSON hash (not an array) of keys to values. Each field can be used as a text replacement.

### Using `csvData`

```javascript
mailshake.recipients.add({
  campaignID: 1,
  addAsNewList: true,
  csvData: {
    csvRawData: 'email,name,favorite_color\njohn@doe.com,John Doe,Red',
    emailColumnName: 'email',
    fullNameColumnName: 'name'
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
curl "https://api.mailshake.com/2017-04-01/recipients/add" \
  -u "my-api-key:" \
  -H "Content-Type: application/json" \
  -X POST -d '{"campaignID":1,"addAsNewList":true,"csvData":{"csvRawData":"email,name,favorite_color\njohn@doe.com,John Doe,Red","emailColumnName":"email","fullNameColumnName":"name"}}'
```

Pass in spreadsheet data in comma-separated-values format. You must have a column (of any name) that represents an email address, and optionally a column to represent a full name. All other columns will be translated into fields that can be used for text replacements.

<aside class="notice">Be sure you're not using semi-colon-values and that you're properly escaping content that may have commas in it.</aside>

Here is the format of the JSON object to be passed as the `csvData` parameter:

Key | Required | Description
--------- | ------- | -----------
csvRawData | Maybe | Raw csv-formatted data.
link | Maybe | A publicly accessible link that hosts csv-formatted data.
emailColumnName | Yes | The name of the column that represents recipients' email addresses.
fullNameColumnName | No | The name of the column that should represent recipients' full names (or first names if that's all you have).

<aside class="notice">Either `csvRawData` or `link` is required</aside>

### Response

> This endpoint returns a [AddedRecipients](#Added-Recipients) model.

Adding recipients is an asynchronous process and may take a few minutes to fully process, but you'll receive an immediate response to indicate how things are going. Email addresses that are on your unsubscribe list or ones that are already in your campaign will be ignored.
