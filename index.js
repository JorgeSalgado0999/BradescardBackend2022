import app from "./app.js";
import {sequelize} from "./database/database.js";

const PORT = 8080;

app.get("", (req, res) => {
	res.send("Hello World");
});

async function main() {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT} with nodemon`);
	});

	try {
		// await sequelize.sync({force: true});

		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

main();
