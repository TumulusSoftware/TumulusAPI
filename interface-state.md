# Web service: State
```
	get    /state/list     
	put    /state/threshold
	delete /state/:bit     
```


# Specs

## Get current user's states

	get    /state/list     

Response:

	[
		{
			"bit": "0",
			"threshold": "1",
			"announcementCount": "0",
			"active": false,
			"state": "Terminative State"
		},
		{
			"bit": "1",
			"threshold": "1",
			"announcementCount": "1",
			"active": true,
			"state": "Alpha"
		},
		...
	]


## Set the threshold of a state

	put    /state/threshold

Request:

	{"bit":7,"value":9}

## Remove a state	

	delete /state/:bit     

The `bit` represents the bit number of the state. e.g.

	delete /state/3
