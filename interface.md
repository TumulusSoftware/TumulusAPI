# Web service modules
```
/asset/
/agreement/
/state/
/view/
/user/    

```

# Web service interface list
```
	post   /agreement/request
	delete /agreement/:id
	put    /agreement/agree
	put    /agreement/reject
	put    /agreement/announce
	get    /agreement/byOwner
	get    /agreement/byAnnouncer

	post /asset/upload
	get  /asset/list
	get  /asset/:id

	get    /state/list     
	put    /state/threshold
	delete /state/:bit     

	post /user/authenticate
	post /user/register    
	post /user/verify      
	get  /user/            
	get  /user/current     
	get  /user/:id         

	post   /view/assign
	get    /view/authorized
	get    /view/list
	delete /view/:authId
	get    /view/:authId


```

# General Information

## Authorization token

Excepts these two calls, 

	post /user/authenticate
	post /user/register    

all other user calls require that the HTTP request is with a authorization header.

	Authorization header: bearer token

The token is from the response of the `authenticate` or `register` call.

## Post body

Excepts the asset file uploading, all other post calls use JSON format in their bodies.

## Response of transactional call

If a call is to make change on the blockchain, the response is always as below:

	{
		"status": "PENDING"
	}

The reason is that blockchain operaions are not immediate.  The wait time is not predictable.

## Error

Typical error response shall be like:

	{
		"message": "email or password is incorrect"
	}
