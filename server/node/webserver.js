const express = require('express');
const webserver = express();

webserver.use( express.static(__dirname + '/' + 'html' ));


webserver.get( '/todoitems', function(request, response){

	response.send(`{
	"tasks": [{
		"title": "buy eggs",
		"description": "Buy a dozen eggs from the store",
		"dueDate": "5-1-2018 5:00pm",
		"completed": false
	}, {
		"title": "rotate tires",
		"description": "move the tires around your car, yo",
		"dueDate": "6-1-2018 5:00pm",
		"completed": false
	}, {
		"title": "change oil",
		"description": "change the oil on the pinto",
		"dueDate": "6-3-2018 5:00pm",
		"completed": false
	}],
	"user": {
		"id": 4,
		"firstname": "Dan",
		"lastname": "Paschal",
		"avatar": "images/bunny.png"
	}
}`);

})


webserver.listen(3000, function(){
	console.log('server is listening on port 3000');
})