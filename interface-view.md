# Web service: View
```
	post   /view/assign
	get    /view/authorized
	get    /view/list
	delete /view/:authId
	get    /view/:authId
```

 
# Specs

## Assign a viewer to view an asset on a state

	post   /view/assign

Request body:

	{"id":3,"assetId":3,"bit":1}

id: user ID of the viewer

## As a viewer, get a list of all authorized assets

	get    /view/authorized

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "Amy",
        "owner-lastName": "Abram",
        "owner-emailAsId": "amy@rolia.com",
        "viewer-id": 2,
        "viewer-firstName": "Bob",
        "viewer-lastName": "Brown",
        "viewer-emailAsId": "bob@rolia.com",
        "assetId": 3,
        "fileName": "Oct10A.md",
        "tags": "Oct 12A, first",
        "authId": "5",
        "bit": "1",
        "state": "Alpha",
        "status": "EXISTING; EFFECTIVE; "
    },
	 ...
]
```

## As the owner, get a list of all asset authorizations

	get    /view/list

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "Amy",
        "owner-lastName": "Abram",
        "owner-emailAsId": "amy@rolia.com",
        "viewer-id": 2,
        "viewer-firstName": "Bob",
        "viewer-lastName": "Brown",
        "viewer-emailAsId": "bob@rolia.com",
        "assetId": 3,
        "fileName": "Oct10A.md",
        "tags": "Oct 12A, first",
        "authId": "5",
        "bit": "1",
        "state": "Alpha",
        "status": "EXISTING; EFFECTIVE; "
    },
	 ...
]
```
## Delete an authorization

	delete /view/:authId

## As an authorized viewer, download the asset

	get    /view/:authId
