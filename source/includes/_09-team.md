# Team

## List Members

```javascript
mailshake.team.listMembers()
  .catch(err => {
    console.error(`${err.code}: ${err.message}`);
  });
```

```shell
curl "https://api.mailshake.com/2017-04-01/team/list-members" \
  -u "my-api-key:"
```

> This endpoint returns [paginated](#Pagination) [User](#User) models.

Lists the users belonging to this team.

### Parameters

Parameter | Default | Required | Description
--------- | ------- | -----------
search |  | No | Filters the returned users.
nextToken |  | No | Fetches the next page from a previous request.
perPage | 100 | No | How many results to get at once, up to 100.
