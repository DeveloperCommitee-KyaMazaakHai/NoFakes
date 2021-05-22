const next = require('next')
var express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
var ip = require('ip')
const shell = require('shelljs')
const { isEmail } = require('validator')
var bodyParser = require('body-parser')
require('dotenv').config({path: `./.env.${process.env.ENV}`})
const { exec } = require('child_process');

const routes = {
    messages: require('./routes/messages'),
	hits: require('./routes/hits')
}

process.on('uncaughtException', function (err){
    console.error('Uncaught Exception: ', err)
})

process.on('unhandledRejection', function(reason, p){
    console.error('Unhandled Rejection: Promise:', p, 'Reason: ', reason)
})

process.on('SIGINT', function() {
	// some other closing procedures go here
	console.log("\nKilling Flask Server")
	exec('kill $(lsof -t -i:5000)', (err, stdout, stderr) => {
		if(err){
			console.error("ERR: ", err)
			return
		}
		console.log(stdout)
		console.error(stderr)
	})
	console.log("Gracefully Shutting Down Node Server");
	process.exit(1);
  });

process.env.ENV = process.env.ENV || 'prod'
process.env.PORT = process.env.PORT || 8080

const databaseURI = process.env.DATABASE_URI || 'mongodb://localhost:27017/nofakes'

mongoose.connect(
	databaseURI, 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true, 
		useFindAndModify: false, 
		useCreateIndex: true 
	}, 
	function(err) {
		if (err) {
			console.log('Connection to Mongo DB failed')
		}
	}
)

const db = mongoose.connection
db.on('error', console.error.bind(console, "Mongo connection error: "))
db.once('open', () => {
	console.log("ENV: " + process.env.ENV)
	console.log("URL: "+ databaseURI)
	console.log("Connection to MongoDB successful")
})

const nextApp = next({
	dir: '.',
	dev: process.env.ENV === 'dev',
	prod: process.env.ENV === 'prod'
})

nextApp.prepare().then(() => {
	const app = express()

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    
	// parse application/json
    app.use(bodyParser.json({ limit: '50mb', extended: true }))
	
	routes.messages(app)
	routes.hits(app)

	// Default catch-all handler to allow Next.js to handle all other routes
    app.all('*', (req, res) => {
        let nextRequestHandler = nextApp.getRequestHandler()
        return nextRequestHandler(req, res)
    })

    app.listen(process.env.PORT, err => {
        if (err) {
            throw err
        }
        console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.ENV + ']')
    })

}).catch(err => {
	console.log('An error occured, unable to start the server')
	console.log(err)
})


//Register routes here
//routes.items(app, Item)

app.listen(3005, () => console.log('server started!'))