const express = require('express');
const webserver = express();

webserver.use( express.static(__dirname + '/' + 'html' ));

const mysql = require('mysql');
const mysql_creds = require('./mysql_credentials.js');

const db = mysql.createConnection(mysql_creds);


webserver.get( '/todoitems', function(request, response){
	//this gets run when request comes in
	const output = {
		success: false,
		tasks: [],
		errors: []
	}
	db.connect(function(){
		//this gets run when connection to db is finalized
		db.query('SELECT * FROM tasks', function(err, data, fields){
			//this gets run when query comes back with data
			if(!err){
				output.success=true;
				output.tasks = data;
				//this gets run when no error occured in the db request
				const json_data = JSON.stringify(output);
				response.send( json_data );
			} else{
				//mysql had an error
			}
		});

	})
	

})


webserver.listen(3000, function(){
	console.log('server is listening on port 3000');
})