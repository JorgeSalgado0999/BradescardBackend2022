const express = require("express");
const app = express();
const mysql = require("mysql");

/*
mysql connection 
*/

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Password",
	database: "bradescard",
});

connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
	} else {
		console.log("Database Connected!");
	}

	/* */

	const PORT = 8080;

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});

	app.get("", (req, res) => {
		res.send("Hello World");
	});

	app.get("/test", (req, res) => {
		console.log("entro a test");

		let query = "SELECT * from partners";
		connection.query(query, function (err, results) {
			if (err) {
				res.send(err);
			} else {
				res.send(results);
			}
		});
	});
});
