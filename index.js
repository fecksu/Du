//Setup



const mongoose = require('mongoose')
const mongo = require('dbdjs.mongo').default
mongoose.connect(process.env.CLUSTER, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 keepAlive: true
})

mongo.createModel('main') 

//This is keep your bot alive 24/7 after connected to an uptimer service. Explained a little bit on server.js.
const keepAlive = require('./server.js');

const aoijs = require('aoi.js'); //We're authorized "aoijs" as our bot in here, you can type anything you want. 
const config = require('./config.js'); //This will be our configuration file. I didn't want your main file be messy. 
const bot = new aoijs.Bot(config.Bot);
const fs = require('fs');

const voice = new aoijs.Voice(bot, {
  soundcloud: {
    clientId: "",
  },//I recommend you to use your own sc token
  cache: {
    cacheType: "Memory",//Disk
    enabled: true,
  }, 
});
//Configs
require('./handlers/status')(bot) //This is for bot status file. 
require('./handlers/variables')(bot) //This is for bot variables file. 
require('./handlers/callbacks')(bot) //This is for bot callbacks file. 


//Loader would be better to used, since I don't recommend you code all your slash commands on your main file. If one command gives error, it will just kill your client. Your commands should be added on "commands" folder. 
const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd, "./commands/")


//This is for making your console look colorful :)
loader.setColors({
  walking: ["blink", "dim", "fgWhite"],
  failedWalking: {
    name: ["bright", "fgYellow", "underline"],
 
    text: ["gray", "fgRed"]
  },
  typeError: {
    command: ["bright", "fgYellow"],
    type: ["fgYellow"],
    text: ["bright", "fgRed"]
  },
  failLoad: {
    command: ["bright", "fgMagenta"],
    type: ["fgRed"],
    text: ["bright", "fgRed"],
  },
  loaded: {
    command: ["bright", "fgRed"],
    type: ["bright", "fgWhite"],
    text: ["bright", "fgBlue"]
  },
 
})


//Events, are most important stuffs for us. it's used as "type" on most of codes, but I think separating it would be better so here you go. 
const files = fs.readdirSync('./events').filter(file => file.endsWith('js'))
files.forEach( x => {
	require(`./events/${x}`)(bot)
});

//Don't ever delete this.
keepAlive()
