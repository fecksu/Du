module.exports = {
	Bot: {
		token: process.env.TOKEN,
		prefix: "$",
		intents: "all" /* , 
		Well, if you are going to use custom database, there you go :)
		database: {
        type: "dbdjs.mongo",
        db: require('dbdjs.mongo'),
        path: "./database/",
        tables: ["main"]  
		} */
	}
}