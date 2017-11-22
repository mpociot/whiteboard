# Limits

Based on your plan with us, you app will have a few limitations on your usage. If you're interested in increasing your limits, use the "Contact Us" button on the <a href="https://mailshake.com/app/#/redirect/extensions/api" target="_blank">Extensions &gt; API page</a> inside Mailshake.

## New recipients / month

Each Mailshake campaign can hold up to 5,000 recipients. However, adding recipients through the Mailshake API is limited to a certain number per month. This isn't a per-campaign limit, it's accumulative across all campaigns. If your app attempts to exceed this limit, you'll get the `exceeds_monthly_recipients` error back.

The monthly window is aligned with the calendar year. Ergo on the 1st of each month your recipient limit will reset.

## Rate limits

> As an example of quota units work, check this out:

```
// Quota units: 400
mailshake.campaigns.pause(1)
// Quota units: 395
mailshake.campaigns.pause(2)
mailshake.campaigns.pause(3)
// Quota units: 385
mailshake.recipients.add([ /* 32 recipients */ ])
// This ^^ costs 20 + 32, or 52
// Quota units: 343
// ...an hour passes by ...
// Quota units: 400
```

Each call to our API costs a varying number of "quota units," and you're allowed X quota units per hour to limit how frequently you can make requests. If you hit a limit, you'll get the error code `limit_reached`. The error message will indicate when you can try again (see [our error codes](#General-errors)).

<aside class="notice">We're still experimenting with these numbers, so they may change from time to time:</aside>

Units | Operation
---| ---
10 | Campaigns > List
5 | Campaigns > Pause
25 | Campaigns > Unpause
25 | Leads > Create
5 | Leads > Close
5 | Leads > Ignore
5 | Leads > Reopen
<div>20 + N</div> | Recipients > Add <aside class="notice">20 units for this call plus one for each recipient being added</aside>
10 | Recipients > List
5 | Recipients > Pause
10 | Recipients > Unpause
2 | Recipients > Unsubscribe
100 | Push > Create
3 | Activity > Clicks
2 | Activity > Opens
1 | Activity > Sent
10 | Activity > Replies
5 | Activity > CreatedLeads
5 | Activity > LeadStatusChanges

<aside class="notice">Any operation not listed above costs 1 unit</aside>
