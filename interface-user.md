# Web service: User
```
	post /user/authenticate
	post /user/register    
	post /user/verify      
	get  /user/            
	get  /user/current     
	get  /user/:id         
```

# Specs

## Log in

User login

	post /user/authenticate

Request body:

	{"emailAsId":"amy@rolia.com","password":"ffffff"}

Response:

	{
		"id": 1,
		"firstName": "Amy",
		"lastName": "Abram",
		"emailAsId": "amy@rolia.com",
		"walletAddress": "0x7ec65C341a57AB871AeB8D2d083883e2A0CA58d9",
		"safeKey": null,
		"publicKey": null,
		"status": "VERIFIED",
		"createdAt": "2022-10-12T05:02:41.000Z",
		"updatedAt": "2022-10-12T05:03:04.000Z",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2NTgwOTA2OCwiZXhwIjoxNjY2NDEzODY4fQ.VzDQ2OlSSxrFyDPKZ-5iWbMIBmBiQP1lv2qZLNbz0Jw"
	}

## Registration

	post /user/register

Request body:

	{"firstName":"Amy","lastName":"Abram","emailAsId":"amy@rolia.com","password":"ffffff"}

Response :

	{
		"status": "NEW",
		"id": 6,
		"firstName": "Amy",
		"lastName": "Abram",
		"emailAsId": "amy2@rolia.com",
		"updatedAt": "2022-10-15T04:42:30.946Z",
		"createdAt": "2022-10-15T04:42:30.946Z",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY2NTgwODk1MSwiZXhwIjoxNjY2NDEzNzUxfQ.9Tk6zymwic3c7ueMnFHPonOIaBJdbmn7HjOElBibS_0"
	}

## Verify

	post /user/verify      

Request:

	{"veriCode":"123456"}

Response:

	{
		"id": 1,
		"firstName": "Amy",
		"lastName": "Abram",
		"emailAsId": "amy@rolia.com",
		"walletAddress": "0x9f494776aFd40D192e65731e525C1533B9CD162b",
		"safeKey": null,
		"publicKey": null,
		"status": "VERIFIED",
		"createdAt": "2022-10-12T05:02:41.000Z",
		"updatedAt": "2022-10-15T04:50:26.060Z",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2NTgwOTQyNiwiZXhwIjoxNjY2NDE0MjI2fQ.zU_vNfm7wl6U2_x3lYDTuchsuRDNOXvZpDlchugt6ek"
	}

## List all users

	get  /user/   

Response

	[
		{
			"id": 1,
			"firstName": "Amy",
			"lastName": "Abram",
			"emailAsId": "amy@rolia.com",
			"createdAt": "2022-10-12T05:02:41.000Z",
			"updatedAt": "2022-10-15T04:50:26.000Z"
		},
		{
			"id": 2,
			"firstName": "Bob",
			"lastName": "Brown",
			"emailAsId": "bob@rolia.com",
			"createdAt": "2022-10-12T05:03:21.000Z",
			"updatedAt": "2022-10-12T05:03:38.000Z"
		},
		...
	]

## Get current user info

	get  /user/current     

Response:

	{
		"id": 3,
		"firstName": "Cindy",
		"lastName": "Cook",
		"emailAsId": "cindy@rolia.com",
		"createdAt": "2022-10-12T05:03:47.000Z",
		"updatedAt": "2022-10-12T05:03:53.000Z"
	}


## Get user info by numeric ID

	get  /user/:id

e.g.         

	get  /user/3         

Response:

	{
		"id": 3,
		"firstName": "Cindy",
		"lastName": "Cook",
		"emailAsId": "cindy@rolia.com",
		"createdAt": "2022-10-12T05:03:47.000Z",
		"updatedAt": "2022-10-12T05:03:53.000Z"
	}
