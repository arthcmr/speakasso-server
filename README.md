SPEAKASSO server
=================

Simple node server with json data for SPEAKASSO

###How to get started
You need to have Node.js installed. If you don't, install it through the official website: http://nodejs.org/

Clone the project and, in the project folder, run the following in the terminal
```
npm install
```

**That's it**. Now, you can run the server with the following command:
```
node app.js
```

By default, it will run in port 3000. If you want to run in a different port, use the ```port``` option:
```
node app.js -p 3001 
```

You also need to have MongoDB running.
```
mongod
```

###Testing
Run tests using the following commands in the terminal:
```
mocha app.test.js
```

###How to query it
By default, it runs in ```http://localhost:3000```. The server is really simplistic and accepts only a few requests:

####Examples of supported requests:
#####GET http://localhost:3000/getPainters

This will return a list with all painters and their attributes

#####POST http://localhost:3000/insert
Stores a specific result in the DB. You must send the following data:
```json
{
	"email": "test@example.com",
	"name": "John",
	"painter": "leonardo",
	"settings": {}
}
```

#####GET http://localhost:3000/results
Get all the results from all users

The ```q``` parameter follows the partial response format. View the format [https://github.com/nemtsov/json-mask](here)

#####GET http://localhost:3000/results?email=test@test.com
Get only the results of a specific user

