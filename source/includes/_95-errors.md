# Errors

> A raw error response looks like this:

```json
{
  "code": "invalid_api_key",
  "error": "Invalid api key",
  "time": "2017-08-21T13:23:11.814Z"
}
```

Mailshake uses the following error codes:

## General errors

Code | Description
---------- | -------
invalid_api_key | The key you provided us was either missing or invalid.
missing_team_admin | Your team doesn't have an active team administrator (check that your billing is up to date)
missing_dependent_data | The object on which you're acting wasn't found or you don't have permission. An example would be trying to pause a campaign with an ID that doesn't reference a campaign.
missing_parameter | Your request is missing a required parameter.
invalid_parameter | One of your request's parameter is in an unsupported format.
not_authorized | Your credentials don't allow you to execute this request.
not_found | A more semantically permissive version of `missing_dependent_data`. We're splitting hairs a bit here, but generally speaking when this code is returned your application might just want to note the problem and carry on. Whereas if you encounter the `missing_dependent_data` error it's more of a show-stopper.
exceeds_monthly_recipients | You can't add this many recipients because you will pass your monthly quota allowance. You can contact us to request an increase.
user_not_admin | The user on file for your application must be an administrator of your team.
user_is_disabled | The user on file for your application must have an active account (check your billing)
missing_subscription | Your team must have an active and paid subscription to Mailshake.
team_blocked | Your team has been blocked while our compliance team runs a review of your usage of our platform.
limit_reached | Your application has exceeded it's quota and must wait to make more requests, or you can contact us to request an increased quota. The message will indicate the next time you can try a request: `Please wait and try again after: 2017-08-21T15:16:15.207Z`
internal_error | Something general went wrong with Mailshake. This may be a temporary issue or we may have a bug (if so [notify us](mailto:support@mailshake.com)).
unspecified_error | Your request was probably rejected by some kind of validation.

## Specific to OAuth2

Code | Description
--- | ---
unauthorized_request | Your request is missing authentication.
invalid_client | Your `client_id` or `client_secret` parameter is wrong.
invalid_grant | Your request for authorization is malformed.
app_not_approved | Your application is not allowed to be used by other teams.
invalid_token | Your token has expired. Try using your refresh token to get another access token.
missing_scope | Your authentication request did not specify any scopes.
