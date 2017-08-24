# Limits

Based on your plan with us, you app will have a few limitations on your usage. Just [reach out to us](mailto:support@mailshake.com) if you're interested in increasing your limits.

## New recipients / month

Each Mailshake campaign can hold up to 5,000 recipients. However, adding recipients through the Mailshake API is limited to a certain number per month. This isn't a per-campaign limit, it's accumulative across all campaigns. If your app attempts to exceed this limit, you'll get the `exceeds_monthly_recipients` error back.

The monthly window is aligned with your Mailshake subscription. So if you first purchased your Subscription on August 21st, then your monthly recipient limit will reset on the 21st of each month.

## Rate limits

> As an example of quota units work, check this out:

```
// Quota units: 300
mailshake.campaigns.pause(1)
// Quota units: 275
mailshake.campaigns.pause(2)
mailshake.campaigns.pause(3)
// Quota units: 225
mailshake.recipients.add([ /* 32 recipients */ ])
// This ^^ costs 10 + 32, or 42
// Quota units: 183
// ...an hour passes by ...
// Quota units: 300
```

Each call to our API costs a varying number of "quota units," and you're allowed X quota units per hour to limit how frequently you can make requests. If you hit a limit, you'll get the error code `limit_reached`. The error message will indicate when you can try again (see [our error codes](#General-errors)).

We're still experimenting with these numbers, so they may change from time to time:

Units | Operation
---| ---
5 | Campaigns > Pause
15 | Campaigns > Unpause
5 | Leads > Create
5 | Leads > Close
5 | Leads > Ignore
5 | Leads > Reopen
<div>10 + N</div> | Recipients > Add <aside class="notice">10 units for this call plus one for each recipient being added</aside>
5 | Recipients > Pause
5 | Recipients > Unpause
2 | Recipients > Unsubscribe

<aside class="notice">Any operation not listed above costs 1 unit</aside>
