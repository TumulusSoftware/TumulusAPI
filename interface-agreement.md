# Web service: Agreement
```
	post   /agreement/request
	delete /agreement/:id
	put    /agreement/agree
	put    /agreement/reject
	put    /agreement/announce
	get    /agreement/byOwner
	get    /agreement/byAnnouncer
```

# Specs

## Make an agreement request to an announcer

	post   /agreement/request

Request body:

	{"id": 2, "bit": 3}

id is the announcer's user ID.

## Remove an agreement

	delete /agreement/:id

id is the agreement ID.

## Agree to be an announcer

	put    /agreement/agree

Request body:

	{"id": 12}

id is the agreement ID.

## Reject to be an announcer

	put    /agreement/reject

Request body:

	{"id": 12}

id is the agreement ID.

## Announce the owner is in a state

	put    /agreement/announce

Request body:

	{"id": 12}

id is the agreement ID.

## As the owner, get a list of all agreements
	get    /agreement/byOwner

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "Amy",
        "owner-lastName": "Abram",
        "owner-emailAsId": "amy@rolia.com",
        "announcer-id": 2,
        "announcer-firstName": "Bob",
        "announcer-lastName": "Brown",
        "announcer-emailAsId": "bob@rolia.com",
        "agrmId": "2",
        "bit": "1",
        "state": "Alpha",
        "status": "EXISTING; EFFECTIVE; ANNOUNCED; "
    },
	 ...
]
```

## As the announcer, get a list of all agreements

	get    /agreement/byAnnouncer

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "Amy",
        "owner-lastName": "Abram",
        "owner-emailAsId": "amy@rolia.com",
        "announcer-id": 2,
        "announcer-firstName": "Bob",
        "announcer-lastName": "Brown",
        "announcer-emailAsId": "bob@rolia.com",
        "agrmId": "2",
        "bit": "1",
        "state": "Alpha",
        "status": "EXISTING; EFFECTIVE; ANNOUNCED; "
    },
	 ...
]
```
