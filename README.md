# Tumulus API

The Tumulus API is the core of a data storage and marshalling system using IPFS and Blockchain.

The API provides endpoints for the following operations:
* Create New Accounts
* Verify New Accounts
* Login
* Upload Asset File
* Download Asset File
* List Asset Files
* List Agreements
* Request New Agreement
* Agree on Agreement
* Reject Agreement
* Delete Agreement
* List Authorizations
* Assign Authorization to Asset
* Delete Authorization
* List Owner States
* Modify the threshold of Owner State change
* Delete (Reset) Owner State

__Note:__ _This is purely for demonstration purposes and should not be used as-is in production._

## Prerequisites

* Node.js v16.0
* Deployment of the Solidity smart contract Datasitter in an Ethereum-compatible blockchain network

## Environment files

The project requires an environment file to be set up. 

First, copy `.env.example` to `.env`

Edit `.env` and configure the necessary values

## I just want to run it quickly

1. Clone the repo

```https://github.com/TumulusSoftware/TumulusAPI.git```

2. Create the API database

Setup a database using `setup/api_schema.sql`

3. Rename the file .env.example to .env

4. Upload the API files to the server

5. Install the required packages on the server

```npm update```

6. Run the server

```npm start```

The API is now available: http://yourhost/

## Using the API

### Authorization token

In order to perform calls to the API you must have an authorization token. To obtain a token you must call the /user/authenticate or /user/register endpoints. Once you have obtained the token, all subsequent API requests can use that token to authenticate requests to the API.

Include the authorization token as an authorization header as follows:

```Authorization: Bearer TOKEN```

### Requests

All POST requests accept JSON format in the body of the request.

__Note:__ There is one exception to this. When uploading asset files, the POST request must contain form data as opposed to a JSON body. See definitions below for more.


### Responses

When calling an operation that interacts with the blockchain network, the response will always be returned as:

	{
		"status": "PENDING"
	}

__Note:__ _Blockchain operations are not immediate and can take several seconds to minutes to complete depending on the current demand of the blockchain network._

### Errors

A typical error response is returned as:

	{
		"message": "email or password is incorrect"
	}

## Interfaces

### User

#### Registration

	post /user/register

Request data:

	{
		"firstName":"John",
		"lastName":"Doe",
		"emailAsId":"johndoe@example.com",
		"password":"SOME_PASSWORD"
	}

Response data:

	{
		"status": "NEW",
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"emailAsId": "johndoe@example.com",
		"createdAt": "2023-01-31T00:00:00.000Z",
		"updatedAt": "2023-01-31T00:00:00.000Z",
		"token": "NEW_AUTHORIZATION_TOKEN"
	}

#### Verification

	post /user/verify

Request:

	{
		"veriCode":"NUMERIC_CODE"
	}

Response:

	{
		"id": 1,
		"firstName": "Amy",
		"lastName": "Abram",
		"emailAsId": "amy@rolia.com",
		"walletAddress": "NEW_BLOCKCHAIN_WALLET_ADDRESS",
		"safeKey": null,
		"publicKey": null,
		"status": "VERIFIED",
		"createdAt": "2022-10-12T05:02:41.000Z",
		"updatedAt": "2022-10-15T04:50:26.060Z",
		"token": "NEW_AUTHORIZATION_TOKEN"
	}

#### Login

	post /user/authenticate

Request body:

	{
		"emailAsId":"johndoe@example.com",
		"password":"SOME_PASSWORD"
	}

Response:

	{
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"emailAsId": "johndoe@example.com",
		"walletAddress": "NEW_BLOCKCHAIN_WALLET_ADDRESS",
		"safeKey": null,
		"publicKey": null,
		"status": "VERIFIED",
		"createdAt": "2023-01-31T00:00:00.000Z",
		"updatedAt": "2023-01-31T00:00:00.000Z",
		"token": "NEW_AUTHORIZATION_TOKEN"
	}

#### List Users

	get  /user/   

Response

	[
		{
			"id": 1,
			"firstName": "John",
			"lastName": "Doe",
			"emailAsId": "johndoe@example.com",
			"createdAt": "2023-01-31T00:00:00.000Z",
			"updatedAt": "2023-01-31T00:00:00.000Z"
		},
		{
			"id": 2,
			"firstName": "Jane",
			"lastName": "Doe",
			"emailAsId": "johndoe@example.com",
			"createdAt": "2023-01-31T00:00:00.000Z",
			"updatedAt": "2023-01-31T00:00:00.000Z"
		},
		...
	]

#### Get Current User

	get  /user/current     

Response:

	{
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"emailAsId": "johndoe@example.com",
		"createdAt": "2023-01-31T00:00:00.000Z",
		"updatedAt": "2023-01-31T00:00:00.000Z"
	}


#### Get User by ID

	get  /user/:id

e.g.         

	get  /user/1         

Response:

	{
		"id": 1,
		"firstName": "John",
		"lastName": "Doe",
		"emailAsId": "johndoe@example.com",
		"createdAt": "2023-01-31T00:00:00.000Z",
		"updatedAt": "2023-01-31T00:00:00.000Z"
	}

### Asset

#### List
As the owner, list all uploaded asset files.

	get  /asset/list

#### Upload
 As the owner, upload a file as an asset.

	post /asset/upload

Request: form-data

	assetFile: the file
	tags: string

#### Download
As the owner, download an asset by the asset ID

	get  /asset/:id

### Agreement

#### Request Agreement
Sends an agreement request to an announcer.

	post   /agreement/request

Request body:

	{
		"id": 2,
		"bit": 3
	}

__Note:__ _"id" is the announcer's user ID._

#### Delete Agreement

	delete /agreement/:id

__Note:__ _"id" is the agreement ID._

#### Accept Agreement
An announcer accepts an agreement request from an owner.

	put    /agreement/agree

Request body:

	{
		"id": 12
	}

__Note:__ _"id" is the agreement ID._

#### Reject Agreement
An announcer rejects an agreement request from an owner.

	put    /agreement/reject

Request body:

	{
		"id": 12
	}

__Note:__ _"id" is the agreement ID._

#### Announce Agreement
An announcer is announcing the owner is in a state.

	put    /agreement/announce

Request body:

	{
		"id": 12
	}

__Note:__ _"id" is the agreement ID._

#### List Owner Agreements
As the owner, get a list of all agreements

	get    /agreement/byOwner

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "John",
        "owner-lastName": "Doe",
        "owner-emailAsId": "johndoe@example.com",
        "announcer-id": 2,
        "announcer-firstName": "Jane",
        "announcer-lastName": "Doe",
        "announcer-emailAsId": "janedoe@example.com",
        "agrmId": "2",
        "bit": "1",
        "state": "Alpha",
        "status": "CURRENT_STATUS"
    },
	 ...
]
```

__Note:__ _Status can be one of the following values: EXISTING, EFFECTIVE, ANNOUNCED_

#### List Announcer Agreements
As the announcer, get a list of all agreements

	get    /agreement/byAnnouncer

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "John",
        "owner-lastName": "Doe",
        "owner-emailAsId": "johndoe@example.com",
        "announcer-id": 2,
        "announcer-firstName": "Jane",
        "announcer-lastName": "Doe",
        "announcer-emailAsId": "janedoe@example.com",
        "agrmId": "2",
        "bit": "1",
        "state": "Alpha",
        "status": "CURRENT_STATUS"
    },
	 ...
]
```

__Note:__ _Status can be one of the following values: EXISTING, EFFECTIVE, ANNOUNCED_

### View

#### Assign View
Grant permissions to an asset based on a state of the owner of the asset.

	post   /view/assign

Request body:

	{
		"id":3,
		"assetId":3,
		"bit":1
	}

__Note:__ _"id" is the user ID of the viewer._

#### List Authorized Views
As a viewer, get a list of all authorized assets.

	get    /view/authorized

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "John",
        "owner-lastName": "Doe",
        "owner-emailAsId": "johndoe@example.com",
        "viewer-id": 2,
        "viewer-firstName": "Jane",
        "viewer-lastName": "Doe",
        "viewer-emailAsId": "janedoe@exmaple.com",
        "assetId": 3,
        "fileName": "sample_file.pdf",
        "tags": "Sample, Tag",
        "authId": "5",
        "bit": "1",
        "state": "Alpha",
        "status": "CURRENT_STATUS"
    },
	 ...
]
```

__Note:__ _Status can be one of the following values: EXISTING, EFFECTIVE_

#### List Authorizations
As the owner, get a list of all asset authorizations.

	get    /view/list

Response:
```
[
    {
        "owner-id": 1,
        "owner-firstName": "John",
        "owner-lastName": "Doe",
        "owner-emailAsId": "johndoe@example.com",
        "viewer-id": 2,
        "viewer-firstName": "Jane",
        "viewer-lastName": "Doe",
        "viewer-emailAsId": "janedoe@exmaple.com",
        "assetId": 3,
        "fileName": "sample_file.pdf",
        "tags": "Sample, Tag",
        "authId": "5",
        "bit": "1",
        "state": "Alpha",
        "status": "CURRENT_STATUS"
    },
	 ...
]
```

__Note:__ _Status can be one of the following values: EXISTING, EFFECTIVE_

#### Delete Authorization

	delete /view/:authId

#### Download Authorized Asset
As an authorized viewer, download the asset.

	get    /view/:authId

### State

#### List States
Get the current user's states.

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


#### Set State Threshold
Sets the number of announcers that must announce a state change of the owner to confirm its validity.

	put    /state/threshold

Request:

	{
		"bit":7,
		"value":9
	}

## Delete State

	delete /state/:bit     

__Note:__ _The `bit` represents the bit number of the state._

e.g.

	delete /state/3

## Contributing

Contributions are welcome. Please see the [contributing](CONTRIBUTING.md) guide to see how you can get involved.

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are
expected to uphold this code of conduct. Please report unacceptable behavior to [abuse@tumulus.io](mailto:abuse@tumulus.io)

## License

[Apache License 2.0](LICENSE)
