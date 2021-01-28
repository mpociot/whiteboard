# DSA API Documentation
## Get trip requests
### Introduction
This document guides you on how to work with resources at the backend of DSA service via API endpoints. Those resources include Trip Requests, etc.

### Authentication

### HTTP Request
`GET dsa-svc/api/v1/trip-requests`

### Query Paramaeters

### HTTP Response
> The above HTTP request, if successful, will return Json structured like this:

```json
[
    {
        "departure_from": "Phnom Penh",
        "departure_date_time": "2021-01-10 08:02:30",
        "destinations": [
            {
                "Battambong": ["Disctrict 1", "District 2"]
            },
            {
                "Siem Reap": ["District 1", "District 2", "District 3"]
            }
        ],
        "return_date_time": "2021-01-15 08:00:00",
        "status": "APPROVED",
        "requested_by": "Sopheak"
    },
    {
        "departure_from": "Phnom Penh",
        "departure_date_time": "2021-01-10 08:02:30",
        "destinations": [
            {
                "Battambong": ["Disctrict 1", "District 2"]
            },
            {
                "Siem Reap": ["District 1", "District 2", "District 3"]
            }
        ],
        "return_date_time": "2021-01-15 08:00:00",
        "status": "APPROVED",
        "requested_by": "Sopheak"
    }
]
```