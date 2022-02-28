module.exports = (bot) => {

	bot.status({
		text: "$userTag[$clientID] is back",
		type: "LISTENING", 
		status: "dnd", 
		time: 6
	}) 
}